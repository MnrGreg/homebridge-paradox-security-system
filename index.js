var Service, Characteristic;
var mqtt = require("mqtt");

module.exports = function(homebridge){
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-paradox", "Homebridge-Paradox", ParadoxSecuritySystemAccessory);
}

function ParadoxSecuritySystemAccessory(log, config) {
    this.log = log;
    this.name = config["name"];
    this.mqttserver = config["mqttserver"];
    this.controltopic = config["controltopic"];
    this.statetopic = config["statetopic"];
    this.armevent = config["armevent"];
    this.stayevent = config["stayevent"];
    this.disarmevent = config["disarmevent"];
    this.triggeredevent = config["triggeredevent"];

	// connect to MQTT broker connection settings
	this.client_Id = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
	this.options = {
	    keepalive: 10,
    	clientId: this.client_Id,
	    protocolId: 'MQTT',
    	protocolVersion: 4,
    	clean: true,
    	reconnectPeriod: 1000,
    	connectTimeout: 30 * 1000,
		will: {
			topic: 'WillMsg',
			payload: 'Connection Closed abnormally..!',
			qos: 0,
			retain: false
		},
	    username: config["mqttusername"],
	    password: config["mqttpassword"],
    	rejectUnauthorized: false
	};

	// connect to MQTT broker
	this.client = mqtt.connect(this.mqttserver, this.options);
	var that = this;
	this.client.on('error', function () {
		that.log('Error event on MQTT');
	});


   self = this;
    this.client.on('message', function (topic, message) {
        var status = message.toString();
        console.log("mqtt Alarm State message received:", status);
        switch (status) {
            case self.armevent:
                status = Characteristic.SecuritySystemCurrentState.AWAY_ARM;
                break;
            case self.stayevent:
                status = Characteristic.SecuritySystemCurrentState.STAY_ARM;
                break;
            case self.disarmevent:
                status = Characteristic.SecuritySystemCurrentState.DISARMED;
                break;
            case self.triggeredevent:
                status = Characteristic.SecuritySystemCurrentState.ALARM_TRIGGERED;
                break;
            default:
                status = null;
                break;
        };
        if (status !== null){
            self.readstate = status;
            console.log("HomeKit received state=",self.readstate);
            self.securityService.getCharacteristic(Characteristic.SecuritySystemCurrentState, self.readstate);
        };
	});
    this.client.subscribe(this.statetopic);
}

ParadoxSecuritySystemAccessory.prototype = {

    setTargetState: function(state, callback) {
        this.log("Setting state to %s", state);
        var self = this;
        switch (state) {
            case Characteristic.SecuritySystemTargetState.STAY_ARM:
                // stayArm = 0
                mqttstate = "Stay";
                break;
            case Characteristic.SecuritySystemTargetState.NIGHT_ARM:
                // stayArm = 2
                mqttstate = "Sleep";
                break;
            case Characteristic.SecuritySystemTargetState.AWAY_ARM:
                // stayArm = 1
                mqttstate = "Arm";
                break;
            case Characteristic.SecuritySystemTargetState.DISARM:
                // stayArm = 3
                mqttstate = "Disarm";
                break;
        };
         // MQTT Publish state   
        this.client.publish(this.controltopic, mqttstate);
        self.securityService.setCharacteristic(Characteristic.SecuritySystemCurrentState, state);
        callback(null, state);
    },

    getState: function(callback) {
        var self = this;
        if (this.readstate == "0" || this.readstate == "1" || this.readstate == "2" || this.readstate == "3" || this.readstate == "4"){
		    self.log("Setting state to:", this.readstate);
            callback(null, this.readstate);
        }
        else{
            self.log("Not a valid HomeKit State:", this.readstate);
            callback("error");
        };
    },

    getCurrentState: function(callback) {
        this.log("Getting current state");
        this.getState(callback);
    },

    getTargetState: function(callback) {
        this.log("Getting target state");
        this.getState(callback);
    },

    identify: function(callback) {
        this.log("Identify requested!");
        callback(); // success
    },

    getServices: function() {
        this.securityService = new Service.SecuritySystem(this.name);

        this.securityService
            .getCharacteristic(Characteristic.SecuritySystemCurrentState)
            .on('get', this.getCurrentState.bind(this));

        this.securityService
            .getCharacteristic(Characteristic.SecuritySystemTargetState)
            .on('get', this.getTargetState.bind(this))
            .on('set', this.setTargetState.bind(this));

        return [this.securityService];
    }
};
