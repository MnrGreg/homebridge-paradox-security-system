# homebridge-paradox-security-system

This project is a [Homebridge](https://github.com/nfarina/homebridge) plugin that allows you to control your Paradox alarm system with the iOS 10 Home app as well as through Siri. This project uses the [Paradox IP150-MQTTv2 monitor](https://github.com/Tertiush/ParadoxIP150v2) made by [@TertiusH](https://github.com/Tertiush). To use this, you must have a working Homebridge server running in your network. The [Raspberry Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi) is ideal for this.

[update] Check out the work @e-mcgee has done to consolidate the code from IP150-MQTTv2 directly into a node.js homebridge plugin [Paradox_Platform] (https://github.com/e-mcgee/paradox_platform). This is the right approach in my view and is working well.

## Notes
- Usage of this plugin requires a Paradox Alarm Panel, the [Paradox IP150 Module] (http://www.paradox.com/Products/default.asp?PID=404), an MQTT Broker [Mosquitto] (http://mosquitto.org) as well as the [Paradox IP150-MQTTv2 Monitor] (https://github.com/Tertiush/ParadoxIP150v2).

## Installation

    npm install -g homebridge-paradox-security-system

## Configuration
Remember to configure the plugin in config.json in your home directory inside the .homebridge directory. Configuration parameters:

    {
        "bridge": {
            "name": "Homebridge",
            "username": "CC:22:3D:E3:CE:30",
            "port": 51826,
            "pin": "031-45-154"
        },

        "accessories": [
            {
            "accessory": "Homebridge-Paradox",
            "name": "Alarm System",
            "mqttusername": "",
            "mqttpassword": "",
            "mqttserver": "mqtt://localhost",
            "controltopic": "Paradox/C/P1",
            "statetopic": "Paradox/Events",
            "stayevent": "Event:Non-reportable event;SubEvent:Arm in stay mode",
            "armevent": "Event:Partition status;SubEvent:Arm partition",
            "disarmevent": "Event:Partition status;SubEvent:Disarm partition",
            "triggeredevent": ""
            }
        ]
    }

##Bitcoin donation

If you like it please consider sending me some bitcoin this encourages me to build and share more. I'm also open to collaboration, so you can email me on [mrgregmay@gmail.com] (mailto:mrgregmay@gmail.com)

![alt tag](https://github.com/MnrGreg/homebridge-paradox-security-system/raw/master/bitcoindonation.png)<br>
<strong>1JdLnWV9sY51A8soyLy8Edj4Te9q7PzCzc</strong>
