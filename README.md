# homebridge-paradox-security-system

This project is a [Homebridge](https://github.com/nfarina/homebridge) plugin that allows you to control your Paradox alarm system with the iOS 10 Home app as well as through Siri. This project uses the [Paradox IP150-MQTTv2 monitor](https://github.com/Tertiush/ParadoxIP150v2) made by [@TertiusH](https://github.com/Tertiush). To use this, you must have a working Homebridge server running in your network. The [Raspberry Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi) is ideal for this.


## Notes
- Usage of this plugin requires a Paradox Alarm Panel, the [Paradox IP150 Module] (http://www.paradox.com/Products/default.asp?PID=404), an MQTT Broker [Mosquitto] (http://mosquitto.org) as well as the [Paradox IP150-MQTTv2 Monitor] (https://github.com/Tertiush/ParadoxIP150v2).

## Installation

    npm install -g homebridge-paradox-security-system

##  To Do
- Add delay during setting of TargetState to allow for Paradox alarm processing
- On receiving mqtt message, perform immediate CurrentState check. Currently CurrentState is only checked when opening the Home App.
- Investigate HomeKit SecuritySystem [Triggered State] (https://developer.apple.com/reference/homekit/hmcharacteristicvaluecurrentsecuritysystemstate)
- Add HomeKit/Paradox Alarm State mapping to config.json (eg HomeKit:Away == Paradox:Arm)
- HELP NEEDED: Create new branch for: monitoring opening & closing of doors/zones (HomeKit ContactSensor Accessory)
- HELP NEEDED: Create new branch for: monitoring of motion detectors & beams (HomeKit MotionDetected Accessory)

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
                "mqttserver": "mqtt://localhost",
                "mqttusername": "",
                "mqttpassword": "",
                "topicname": "Paradox/C/P1"
            }
        ]
    }

##Bitcoin donation

If you like it please consider sending me some bitcoin this encourages me to build and share more. I'm also open to collaboration, so you can email me on [mrgregmay@gmail.com] (mailto:mrgregmay@gmail.com)

![alt tag](https://github.com/MnrGreg/homebridge-paradox-security-system/edit/bitcoindonation.png)<br>
<strong>1JdLnWV9sY51A8soyLy8Edj4Te9q7PzCzc</strong>
