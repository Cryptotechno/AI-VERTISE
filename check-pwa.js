#!/usr/bin/env node

/**
 * Simple script to check PWA compliance
 * Run with: node check-pwa.js
 */

console.log('PWA Compliance Checklist:');
console.log('------------------------');

import { promises as fs } from 'fs';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check favicon files
const faviconPath = join(__dirname, 'public/favicon.ico');
const svgIconPath = join(__dirname, 'public/favicon.svg');
const manifestPath = join(__dirname, 'public/site.webmanifest');
const faviconDirPath = join(__dirname, 'public/favicon');

console.log(`1. Favicon (ICO): ${existsSync(faviconPath) ? '✅ Present' : '❌ Missing'}`);
console.log(`2. SVG Icon: ${existsSync(svgIconPath) ? '✅ Present' : '❌ Missing'}`);
console.log(`3. Web Manifest: ${existsSync(manifestPath) ? '✅ Present' : '❌ Missing'}`);

// Check favicon directory
if (existsSync(faviconDirPath)) {
  const files = readdirSync(faviconDirPath);
  console.log('4. Favicon directory contents:');
  files.forEach(file => {
    console.log(`   - ${file}`);
  });
} else {
  console.log('4. Favicon directory: ❌ Missing');
}

// Check manifest content
if (existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    console.log('\nManifest Analysis:');
    console.log(`- Name: ${manifest.name || '❌ Missing'}`);
    console.log(`- Short Name: ${manifest.short_name || '❌ Missing'}`);
    console.log(`- Description: ${manifest.description || '❌ Missing'}`);
    console.log(`- Icons: ${manifest.icons?.length ? `✅ ${manifest.icons.length} icons` : '❌ Missing'}`);
    console.log(`- Theme Color: ${manifest.theme_color || '❌ Missing'}`);
    console.log(`- Background Color: ${manifest.background_color || '❌ Missing'}`);
    console.log(`- Display: ${manifest.display || '❌ Missing'}`);
    console.log(`- Start URL: ${manifest.start_url || '❌ Missing'}`);
  } catch (e) {
    console.log('\nManifest Analysis: ❌ Invalid JSON');
  }
}

// Check for service worker in the built project
const swPath = join(__dirname, 'dist/sw.js');
console.log(`\n5. Service Worker: ${existsSync(swPath) ? '✅ Present in build' : '❌ Missing in build'}`);

console.log('\nNOTE: For full PWA compliance, use Lighthouse in Chrome DevTools to test the deployed site.'); 