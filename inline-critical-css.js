import fs from 'fs';
import path from 'path';

// This script inlines critical CSS into the HTML file
// Run this after the build process

const CRITICAL_CSS_PATH = './critical.css';
const HTML_PATH = './dist/index.html';

function inlineCriticalCSS() {
  try {
    // Read the critical CSS file
    const criticalCSS = fs.readFileSync(CRITICAL_CSS_PATH, 'utf8');
    
    // Read the HTML file
    let htmlContent = fs.readFileSync(HTML_PATH, 'utf8');
    
    // Create a style tag with the critical CSS
    const styleTag = `<style id="critical-css">${criticalCSS}</style>`;
    
    // Insert the style tag right after the opening head tag
    htmlContent = htmlContent.replace('<head>', '<head>\n  ' + styleTag);
    
    // Write the modified HTML back to the file
    fs.writeFileSync(HTML_PATH, htmlContent);
    
    console.log('Successfully inlined critical CSS into index.html');
  } catch (error) {
    console.error('Error inlining critical CSS:', error);
  }
}

// Run the function
inlineCriticalCSS(); 