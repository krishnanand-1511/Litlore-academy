const fs = require('fs');
const path = require('path');

const src = 'C:/Users/91944/.gemini/antigravity/brain/dcacb994-2cf7-41b3-b89c-444493c55010/media__1786947618199.jpg';
const destDir = path.join(__dirname, 'assets', 'images');
const dest = path.join(destDir, 'logo.png');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log('Successfully copied logo to:', dest);
