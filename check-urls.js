import https from 'https';
import { parseString } from 'xml2js';
import { promises as fs } from 'fs';
import { promisify } from 'util';

const parseXml = promisify(parseString);

async function checkUrls() {
  try {
    // Read the sitemap
    const sitemapXml = await fs.readFile('./public/sitemap.xml', 'utf-8');
    
    // Parse the XML
    const result = await parseXml(sitemapXml);
    
    // Get all URLs from the sitemap
    const urls = result.urlset.url.map(url => url.loc[0]);
    
    // Check each URL
    for (const url of urls) {
      try {
        const response = await new Promise((resolve, reject) => {
          https.get(url, (res) => {
            resolve(res);
          }).on('error', (e) => {
            reject(e);
          });
        });
        console.log(`${url} - Status Code: ${response.statusCode}`);
      } catch (error) {
        console.error(`Error checking ${url}: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUrls(); 