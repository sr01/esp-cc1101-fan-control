import * as fs from 'fs';
import * as path from 'path';

const name = process.argv[2];
const codesFile = process.argv[3];
const codesFilePath = path.join(__dirname, '../', codesFile);
const codes = JSON.parse(fs.readFileSync(codesFilePath, 'utf-8'));
const files = ['buttons.yaml', 'fan.yaml', 'globals.yaml', 'light.yaml', 'outputs.yaml', 'package.yaml', 'scripts.yaml', 'sensors.yaml'];
const codeMap: Record<string, string> = {
  '{{codes_fan_off}}': 'fan_off',
  '{{codes_light_off}}': 'light_off',
  '{{codes_fan_1}}': 'fan_1',
  '{{codes_fan_2}}': 'fan_2',
  '{{codes_fan_3}}': 'fan_3',
  '{{codes_fan_4}}': 'fan_4',
  '{{codes_fan_5}}': 'fan_5',
  '{{codes_light_neutral}}': 'light_neutral',
  '{{codes_light_warm}}': 'light_warm',
  '{{codes_light_cold}}': 'light_cold',
  '{{codes_wind}}': 'wind',
  '{{codes_direction}}': 'direction',
  '{{codes_timer_1h}}': 'timer_1h',
  '{{codes_timer_4h}}': 'timer_4h',
  '{{codes_timer_8h}}': 'timer_8h',
  '{{codes_led_decrease}}': 'led_decrease',
  '{{codes_led_increase}}': 'led_increase',
};

type Codes = Record<string, Array<number>>;

function generateFanTemplate(name: string, codes: Codes) {
  const fanPrefix = name.replace('-', '_').replace(' ', '_').toLowerCase();
  const folderName = name.replace(' ', '-').toLowerCase();
  const folderPath = path.join(__dirname, '../', folderName);

  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }

  fs.mkdirSync(folderPath);
  console.log('folder created:', folderPath);

  files.forEach((file) => {
    const sourceFilePath = path.join(__dirname, '../templates/fan', file);
    const destinationFilePath = path.join(folderPath, file);
    let fileContent = fs.readFileSync(sourceFilePath, 'utf8');

    for (const [key, value] of Object.entries(codeMap)) {
      const code = codes[value];
      fileContent = fileContent.replace(key, JSON.stringify(code));
    }

    fileContent = fileContent.replace(/{{fan_prefix}}/g, fanPrefix).replace(/{{fan_name}}/g, name);

    fs.writeFileSync(destinationFilePath, fileContent);
  });

  console.log(`Add this to your device yaml:
  packages:
    ${folderName}: !include ${folderName}/package.yaml`);
}

generateFanTemplate(name, codes);
