import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  requiredMetaTags: [
    { property: 'og:title', tag: 'meta', attribute: 'property' },
    { property: 'og:description', tag: 'meta', attribute: 'property' },
    { property: 'og:image', tag: 'meta', attribute: 'property' },
    { property: 'og:url', tag: 'meta', attribute: 'property' },
    { property: 'og:type', tag: 'meta', attribute: 'property' },
    { property: 'twitter:card', tag: 'meta', attribute: 'name' },
    { property: 'twitter:title', tag: 'meta', attribute: 'name' },
    { property: 'twitter:description', tag: 'meta', attribute: 'name' },
    { property: 'twitter:image', tag: 'meta', attribute: 'name' },
    { property: 'twitter:url', tag: 'meta', attribute: 'name' },
    { property: 'canonical', tag: 'link', attribute: 'rel' }
  ],
  validateImagePaths: [
    { meta: 'og:image', basePath: 'public' },
    { meta: 'twitter:image', basePath: 'public' }
  ],
  htmlFilePath: 'index.html'
};

// Simple HTML parser for meta tags
function extractMetaTags(html) {
  const metaTags = [];
  const linkTags = [];
  
  // Extract meta tags
  const metaRegex = /<meta\s+(?:[^>]*?\s+)?(?:(property|name)=["']([^"']*)["']\s+content=["']([^"']*)["']|content=["']([^"']*)["']\s+(?:property|name)=["']([^"']*)["'])/g;
  let match;
  
  while ((match = metaRegex.exec(html)) !== null) {
    const attribute = match[1] || 'name';
    const property = match[2] || match[5];
    const content = match[3] || match[4];
    
    metaTags.push({
      tag: 'meta',
      attribute,
      property,
      content
    });
  }
  
  // Extract link tags
  const linkRegex = /<link\s+(?:[^>]*?\s+)?rel=["']([^"']*)["']\s+href=["']([^"']*)["']/g;
  
  while ((match = linkRegex.exec(html)) !== null) {
    linkTags.push({
      tag: 'link',
      attribute: 'rel',
      property: match[1],
      href: match[2]
    });
  }
  
  return { metaTags, linkTags };
}

// Check if tags exist and report problems
function validateMetaTags(metaTags, linkTags) {
  const issues = [];
  const warnings = [];
  
  for (const required of config.requiredMetaTags) {
    let found = false;
    
    if (required.tag === 'meta') {
      for (const tag of metaTags) {
        if (tag.attribute === required.attribute && tag.property === required.property) {
          found = true;
          
          // Check content is not empty
          if (!tag.content || tag.content.trim() === '') {
            issues.push(`Empty content for ${required.property}`);
          }
          
          // Image URL checks for OG tags
          if (required.property.includes('image')) {
            // Check absolute URL
            if (!tag.content.startsWith('http')) {
              warnings.push(`${required.property} should use absolute URL, found: ${tag.content}`);
            }
            
            // Check image extension
            const fileExt = path.extname(tag.content.split('?')[0]).toLowerCase();
            if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(fileExt)) {
              warnings.push(`${required.property} should use an image format, found: ${fileExt}`);
            }
          }
          
          // URL checks
          if (required.property.includes('url')) {
            // Check trailing slash
            if (!tag.content.endsWith('/')) {
              warnings.push(`${required.property} should have trailing slash, found: ${tag.content}`);
            }
          }
        }
      }
    } else if (required.tag === 'link') {
      for (const tag of linkTags) {
        if (tag.attribute === required.attribute && tag.property === required.property) {
          found = true;
        }
      }
    }
    
    if (!found) {
      issues.push(`Missing ${required.tag} tag: ${required.property}`);
    }
  }
  
  return { issues, warnings };
}

// Validate image files exist
function validateImageFiles(metaTags) {
  const issues = [];
  
  for (const imageConfig of config.validateImagePaths) {
    const metaTag = metaTags.find(
      tag => (tag.attribute === 'property' || tag.attribute === 'name') && 
             tag.property === imageConfig.meta
    );
    
    if (metaTag) {
      let imagePath = metaTag.content;
      
      // Convert absolute URL to local path for verification
      try {
        const url = new URL(imagePath);
        // Extract path after domain
        imagePath = url.pathname;
      } catch (e) {
        // Already a relative path
      }
      
      // Remove leading slash
      imagePath = imagePath.replace(/^\//, '');
      
      // Convert to local filesystem path
      const fullPath = path.join(imageConfig.basePath, imagePath);
      
      if (!fs.existsSync(fullPath)) {
        issues.push(`Image file not found: ${fullPath} (from ${imageConfig.meta})`);
      }
    }
  }
  
  return issues;
}

// Main function
function checkMetaTags() {
  console.log('Checking meta tags...');
  
  try {
    // Read HTML file
    const html = fs.readFileSync(config.htmlFilePath, 'utf8');
    
    // Extract meta tags
    const { metaTags, linkTags } = extractMetaTags(html);
    
    // Validate meta tags
    const { issues, warnings } = validateMetaTags(metaTags, linkTags);
    
    // Validate image files
    const imageIssues = validateImageFiles(metaTags);
    
    // Print results
    console.log(`\nFound ${metaTags.length} meta tags and ${linkTags.length} link tags`);
    
    if (issues.length === 0 && warnings.length === 0 && imageIssues.length === 0) {
      console.log('\n✅ All meta tags look good!');
    } else {
      if (issues.length > 0) {
        console.log('\n❌ Issues:');
        issues.forEach(issue => console.log(`  - ${issue}`));
      }
      
      if (warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        warnings.forEach(warning => console.log(`  - ${warning}`));
      }
      
      if (imageIssues.length > 0) {
        console.log('\n❌ Image issues:');
        imageIssues.forEach(issue => console.log(`  - ${issue}`));
      }
    }
  } catch (error) {
    console.error('Error checking meta tags:', error);
  }
}

// Run the check
checkMetaTags(); 