import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SIZES = [16, 32, 48, 64, 128, 256];
const PUBLIC_DIR = 'public';
const FAVICON_SVG = path.join(PUBLIC_DIR, 'favicon.svg');
const FAVICON_DIR = path.join(PUBLIC_DIR, 'favicon');

// Create favicon directory if it doesn't exist
if (!fs.existsSync(FAVICON_DIR)) {
  fs.mkdirSync(FAVICON_DIR, { recursive: true });
}

async function createFavicons() {
  try {
    console.log('Creating favicons from SVG...');
    
    // Create PNG versions of different sizes
    for (const size of SIZES) {
      const outputPath = path.join(FAVICON_DIR, `favicon-${size}x${size}.png`);
      await sharp(FAVICON_SVG)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`Created ${outputPath}`);
    }
    
    // Create favicon.ico (16x16, 32x32, 48x48)
    // Since we can't directly create ICO with sharp, we'll just create several PNGs
    // Real ICO creation would require another library like 'png-to-ico'
    await sharp(FAVICON_SVG)
      .resize(32, 32)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
    console.log(`Created ${path.join(PUBLIC_DIR, 'favicon.ico')}`);
    
    // Create apple-touch-icon for iOS
    await sharp(FAVICON_SVG)
      .resize(180, 180)
      .png()
      .toFile(path.join(FAVICON_DIR, 'apple-touch-icon.png'));
    console.log(`Created ${path.join(FAVICON_DIR, 'apple-touch-icon.png')}`);
    
    // Create manifest icons
    await sharp(FAVICON_SVG)
      .resize(192, 192)
      .png()
      .toFile(path.join(FAVICON_DIR, 'android-chrome-192x192.png'));
    console.log(`Created ${path.join(FAVICON_DIR, 'android-chrome-192x192.png')}`);
    
    await sharp(FAVICON_SVG)
      .resize(512, 512)
      .png()
      .toFile(path.join(FAVICON_DIR, 'android-chrome-512x512.png'));
    console.log(`Created ${path.join(FAVICON_DIR, 'android-chrome-512x512.png')}`);

    console.log('All favicons created successfully!');
  } catch (error) {
    console.error('Error creating favicons:', error);
    process.exit(1);
  }
}

createFavicons(); 