import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Favicon sizes to generate
const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

async function generateFavicons() {
  try {
    console.log('Generating favicons from fav.png...');
    
    // Make sure the favicon directory exists
    const faviconDir = path.join('public', 'favicon');
    if (!fs.existsSync(faviconDir)) {
      fs.mkdirSync(faviconDir, { recursive: true });
    }
    
    // Generate PNG favicons in various sizes
    for (const size of sizes) {
      await sharp('public/fav.png')
        .resize(size, size)
        .png()
        .toFile(path.join(faviconDir, `favicon-${size}x${size}.png`));
      
      console.log(`Created favicon-${size}x${size}.png`);
    }
    
    // Create special filenames for specific use cases
    await sharp('public/fav.png')
      .resize(192, 192)
      .png()
      .toFile(path.join(faviconDir, 'android-chrome-192x192.png'));
    
    await sharp('public/fav.png')
      .resize(512, 512)
      .png()
      .toFile(path.join(faviconDir, 'android-chrome-512x512.png'));
    
    await sharp('public/fav.png')
      .resize(180, 180)
      .png()
      .toFile(path.join(faviconDir, 'apple-touch-icon.png'));
    
    // Copy the favicon as favicon.svg
    await sharp('public/fav.png')
      .resize(32, 32)
      .png()
      .toFile('public/favicon.svg');
    
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

// Run the function
generateFavicons(); 