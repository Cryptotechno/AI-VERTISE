import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';

// SVG files to optimize
const svgFiles = [
  'public/ai-icon.svg',
  'public/a-icon.svg',
  'public/favicon.svg',
  'public/og-image-new.svg'
];

// SVGO configuration compatible with v3
const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox attribute
          removeViewBox: false,
          
          // Don't collapse groups - maintains structure
          collapseGroups: false,
          
          // Don't remove IDs
          cleanupIds: false
        }
      }
    },
    // Remove specific attributes
    {
      name: 'removeAttrs',
      params: {
        attrs: '(data-name)'
      }
    }
  ]
};

async function optimizeSvgs() {
  try {
    console.log('Optimizing SVG files...');
    
    for (const file of svgFiles) {
      // Skip if file doesn't exist
      if (!fs.existsSync(file)) {
        console.log(`File ${file} not found, skipping.`);
        continue;
      }
      
      // Read the SVG content
      const svgContent = fs.readFileSync(file, 'utf8');
      
      // Optimize the SVG
      const result = optimize(svgContent, {
        path: file,
        ...svgoConfig
      });
      
      // Write the optimized SVG back to the file
      fs.writeFileSync(file, result.data);
      
      console.log(`Optimized ${file}`);
    }
    
    console.log('All SVG files optimized successfully!');
  } catch (error) {
    console.error('Error optimizing SVGs:', error);
  }
}

// Run the function
optimizeSvgs(); 