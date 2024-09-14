# ESP CC1101 Fan Control for Home Assistant
This ESPHome device controls a fan, such as the "Pacific Monsoon," using a CC1101 RF transceiver.
It leverages code from the [CC1101 support for ESPHome](https://github.com/dbuezas/esphome-cc1101) project.

### Features
- Full control of all fan commands, including speed and power.
- Exposes a light component to Home Assistant, capable of adjusting both light color and intensity.
- Senses commands sent by a different remote control and updates the fan status in Home Assistant accordingly.

This device is capable of both sending and receiving codes, which are sent by a different transmitter, such as the actual remote control of the fan.

Unfortunately, ESPHome doesn't support arrays in substitutions ([pending feature request](https://github.com/esphome/feature-requests/issues/2346)),
which would eliminate the need to specify the long array code multiple times—once in a button or script (for sending) and once in a sensor (for receiving).

To address this, I created a TypeScript script that generates a fan device configuration by providing the necessary codes.

## How to use 

1. Use [CC1101 support for ESPHome](https://github.com/dbuezas/esphome-cc1101) to capture the RF codes for each button on your remote control.
2. Create a JSON file containing the captured codes. You can use my example as a reference: [left-fan](codes/MY_PACIFIC_MONSOON_LEFT_FAN.json). Be sure to maintain the same keys for the commands.
3. Run the following command to generate the fan device configuration:
```
npx ts-node scripts/generate-fan.ts {name} {codes}
```

Replace:
- {name} with the name you want for your fan device.  
- {codes} with the path to your codes file.

4. The script will generate a package folder for the fan, containing various YAML files, including a `package.yaml` file. This package follows [packages as templates](https://esphome.io/components/packages.html#packages-as-templates).
5. Import the package into your device's main YAML file. For example, I generated configurations for two fans:
``` 
packages:
   left: !include left-fan/package.yaml
   right: !include right-fan/package.yaml
```

6. Compile using ESPHome:
```
    esphome compile esp-cc1101.yaml
```

## Links:
- [CC1101 support for ESPHome](https://github.com/dbuezas/esphome-cc1101)
- Pacific Monsoon controller Model: [Remote Control-T5LP](https://gd-flight.en.made-in-china.com/product/TQeYFKWdZLVp/China-Universal-RF-Ceiling-Fan-Remote-Control-Switch-Kit-Fan-Receiver.html)
- [ESPHome: packages as templates](https://esphome.io/components/packages.html#packages-as-templates)

