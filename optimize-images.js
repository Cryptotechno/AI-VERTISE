import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function optimizeImages() {
  try {
    // Optimize logo.png
    await sharp('src/assets/images/logo.png')
      .resize(400) // Adjust size as needed
      .png({ quality: 85, compressionLevel: 9 })
      .toFile('src/assets/images/logo_optimized.png');

    // Optimize logosmall.png
    await sharp('src/assets/images/logosmall.png')
      .resize(200) // Adjust size as needed
      .png({ quality: 85, compressionLevel: 9 })
      .toFile('src/assets/images/logosmall_optimized.png');

    // Optimize favicon
    await sharp('src/assets/images/fav.png')
      .resize(32) // Standard favicon size
      .png({ quality: 85, compressionLevel: 9 })
      .toFile('src/assets/images/fav_optimized.png');

    console.log('Images optimized successfully!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 