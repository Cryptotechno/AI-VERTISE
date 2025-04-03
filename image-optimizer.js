import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const config = {
  // Directories to scan for images
  directoriesToScan: [
    './public',
    './src/assets/images',
  ],
  // Supported image formats to convert
  supportedFormats: ['.jpg', '.jpeg', '.png'],
  // Quality settings
  quality: {
    webp: 80,
    avif: 65,
    png: 75,
  },
  // Responsive image sizes
  responsiveSizes: [1200, 800, 400],
  // OG image settings
  ogImage: {
    source: 'public/images/og/og-image.png',
    outputDir: 'public/images/og/',
    width: 1200,
    height: 630,
  }
};

// Process each image file
async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!config.supportedFormats.includes(ext)) return;
  
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const webpOutput = path.join(dir, `${baseName}.webp`);
  const avifOutput = path.join(dir, `${baseName}.avif`);
  
  console.log(`Converting ${filePath} to next-gen formats...`);
  
  // Skip if files already exist
  if (fs.existsSync(webpOutput) && fs.existsSync(avifOutput)) {
    console.log(`Skipping ${filePath} - WebP and AVIF versions already exist`);
    return;
  }
  
  try {
    const imageProcessor = sharp(filePath);
    const metadata = await imageProcessor.metadata();
    
    // Convert to WebP
    if (!fs.existsSync(webpOutput)) {
      await imageProcessor
        .webp({ quality: config.quality.webp })
        .toFile(webpOutput);
      console.log(`Created ${webpOutput}`);
    }
    
    // Convert to AVIF (more compression but slower)
    if (!fs.existsSync(avifOutput)) {
      await imageProcessor
        .avif({ quality: config.quality.avif })
        .toFile(avifOutput);
      console.log(`Created ${avifOutput}`);
    }
    
    // Create different sizes for responsive images if large enough
    if (metadata.width > 1200) {
      for (const size of config.responsiveSizes) {
        if (metadata.width > size) {
          const resizedWebp = path.join(dir, `${baseName}-${size}.webp`);
          if (!fs.existsSync(resizedWebp)) {
            await sharp(filePath)
              .resize(size)
              .webp({ quality: config.quality.webp })
              .toFile(resizedWebp);
            console.log(`Created responsive ${resizedWebp}`);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Scan directory recursively for images
async function scanDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${directory} does not exist, skipping`);
    return;
  }
  
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (config.supportedFormats.includes(ext)) {
        await processImage(fullPath);
      }
    }
  }
}

// Optimize OG Image specifically
async function optimizeOGImage() {
  const { source, outputDir, width, height } = config.ogImage;
  
  if (!fs.existsSync(source)) {
    console.log(`OG image source ${source} does not exist, skipping`);
    return;
  }

  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const baseName = path.basename(source, path.extname(source));
    
    // Generate optimized PNG
    await sharp(source)
      .resize(width, height)
      .png({ quality: config.quality.png, compressionLevel: 9 })
      .toFile(path.join(outputDir, `${baseName}-optimized.png`));
    console.log('Optimized PNG OG image created');
    
    // Generate WebP version
    await sharp(source)
      .resize(width, height)
      .webp({ quality: config.quality.webp })
      .toFile(path.join(outputDir, `${baseName}.webp`));
    console.log('WebP OG image created');
    
    // Generate AVIF version
    await sharp(source)
      .resize(width, height)
      .avif({ quality: config.quality.avif })
      .toFile(path.join(outputDir, `${baseName}.avif`));
    console.log('AVIF OG image created');
    
    // Generate responsive sizes
    for (const size of config.responsiveSizes) {
      await sharp(source)
        .resize(size)
        .webp({ quality: config.quality.webp })
        .toFile(path.join(outputDir, `${baseName}-${size}.webp`));
      console.log(`Responsive WebP OG image at ${size}px created`);
    }
  } catch (error) {
    console.error('Error optimizing OG images:', error);
  }
}

// Update HTML meta tags for optimized images
async function updateHTMLMetaTags() {
  try {
    const indexPath = 'index.html';
    if (!fs.existsSync(indexPath)) {
      console.log(`${indexPath} does not exist, skipping meta tag updates`);
      return;
    }
    
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Update OG image tags to use optimized versions in correct location
    indexContent = indexContent.replace(
      /<meta property="og:image" content="https:\/\/ai-vertise.com\/(?:images\/og\/)?og-image(?:-new)?\.png" \/>/g,
      `<meta property="og:image" content="https://ai-vertise.com/images/og/og-image-new.png" />`
    );
    
    // Update Twitter image tags
    indexContent = indexContent.replace(
      /<meta name="twitter:image" content="https:\/\/ai-vertise.com\/(?:images\/og\/)?og-image(?:-new)?\.png" \/>/g,
      `<meta name="twitter:image" content="https://ai-vertise.com/images/og/og-image-new.png" />`
    );
    
    // Add canonical URL if not present
    if (!indexContent.includes('<link rel="canonical"')) {
      indexContent = indexContent.replace(
        /<meta name="twitter:image" content=".*?" \/>/,
        `$&\n    <link rel="canonical" href="https://ai-vertise.com/" />`
      );
    }
    
    // Add trailing slash to URLs if missing
    indexContent = indexContent.replace(
      /<meta property="og:url" content="https:\/\/ai-vertise.com">/,
      `<meta property="og:url" content="https://ai-vertise.com/">`
    );
    
    indexContent = indexContent.replace(
      /<meta name="twitter:url" content="https:\/\/ai-vertise.com">/,
      `<meta name="twitter:url" content="https://ai-vertise.com/">`
    );
    
    // Add preload for WebP version if not already present
    if (!indexContent.includes('preload') || !indexContent.includes('og-image.webp')) {
      indexContent = indexContent.replace(
        /<link rel="preload" href="\/assets\/.*\.css" as="style">/,
        `$&\n    <link rel="preload" as="image" href="/images/og/og-image.webp" type="image/webp">`
      );
    }
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('Updated HTML meta tags for optimized images');
  } catch (error) {
    console.error('Error updating HTML meta tags:', error);
  }
}

// Main function
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  // Optimize all images in specified directories
  for (const dir of config.directoriesToScan) {
    await scanDirectory(dir);
  }
  
  // Optimize OG images specifically
  await optimizeOGImage();
  
  // Update HTML meta tags
  await updateHTMLMetaTags();
  
  console.log('Image optimization completed!');
}

// Run the optimizer
optimizeImages().catch(console.error); 