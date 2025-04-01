import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../content/blog');
const SITEMAP_PATH = path.join(__dirname, '../../public/sitemap.xml');

// Get all blog posts
const blogPosts = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
        // Convert filename to URL-friendly slug
        slug: file
            .replace('.md', '')
            .toLowerCase()
            .replace(/\s+/g, '-'), // Replace spaces with hyphens
        lastmod: fs.statSync(path.join(BLOG_DIR, file)).mtime.toISOString().split('T')[0]
    }));

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://chrisdettloff.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://chrisdettloff.com/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${blogPosts.map(post => `
  <url>
    <loc>https://chrisdettloff.com/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

// Write sitemap to file
fs.writeFileSync(SITEMAP_PATH, sitemap);
console.log('Sitemap generated successfully!'); 