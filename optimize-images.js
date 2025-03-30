import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeImage() {
  try {
    // Convert OG image to WebP with reduced quality
    await sharp('public/og-image.png')
      .resize(1200, 630)
      .webp({ quality: 75 })
      .toFile('public/og-image.webp');

    console.log('OG image converted to WebP and saved');

    // Also create a smaller optimized PNG
    await sharp('public/og-image.png')
      .resize(1200, 630)
      .png({ quality: 75, compressionLevel: 9 })
      .toFile('public/og-image-optimized.png');

    console.log('Optimized PNG created');

    // Update the index.html to use WebP with PNG fallback
    const indexPath = 'index.html';
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Add picture element for better browser support
    indexContent = indexContent.replace(
      /<meta property="og:image" content="https:\/\/ai-vertise.com\/og-image.png" \/>/g,
      `<meta property="og:image" content="https://ai-vertise.com/og-image-optimized.png" />`
    );

    // Add preload for the webp version
    indexContent = indexContent.replace(
      /<link rel="preload" href="\/assets\/index-CaWdW3U1.css" as="style">/,
      `<link rel="preload" href="/assets/index-CaWdW3U1.css" as="style">
    <link rel="preload" as="image" href="/og-image.webp" type="image/webp">`
    );

    // Update Twitter image too
    indexContent = indexContent.replace(
      /<meta name="twitter:image" content="https:\/\/ai-vertise.com\/og-image.png" \/>/g,
      `<meta name="twitter:image" content="https://ai-vertise.com/og-image-optimized.png" />`
    );

    fs.writeFileSync(indexPath, indexContent);
    console.log('index.html updated with optimized image references');

  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImage(); 