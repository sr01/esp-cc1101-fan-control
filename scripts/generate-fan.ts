import * as fs from 'fs';
import * as path from 'path';

let generated = '';
const name = 'test-fan';

const folderPath = path.join(__dirname, '../', name);

// Function to delete and recreate the folder
function recreateFolder() {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }

  // Create the folder again
  fs.mkdirSync(folderPath);
  console.log('Folder created:', folderPath);
}

recreateFolder();
