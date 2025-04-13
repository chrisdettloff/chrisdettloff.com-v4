# chrisdettloff.com

My personal portfolio website built with AstroJS. This site showcases my professional experience, blog posts, and projects.

## Features

- 🎨 Modern, responsive design with dark/light theme support
- 📝 Blog system with Markdown support
- 🔍 SEO optimized with sitemap and meta tags
- 🚀 Fast performance with Astro's static site generation
- 📱 Mobile-friendly design

## Tech Stack

### Framework
- **[AstroJS](https://astro.build/)** - Modern static site builder
- **TypeScript** - Type safety and better developer experience

### Deployment & CI/CD
- **[Vercel](https://vercel.com)** - Hosting and continuous deployment

### Styling
- **CSS Variables** - For theme support and consistent styling
- **Responsive Design** - Mobile-first approach

## Project Structure

```
src/
├── components/     # Reusable UI components
├── content/       # Blog posts and other content
├── layouts/       # Page layouts
├── pages/         # Route components
├── styles/        # Global styles and CSS variables
└── scripts/       # Build and utility scripts
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/chrisdettloff/chrisdettloff.com-v4.git
   cd chrisdettloff.com-v4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Development

- Run `npm run dev` to start the development server
- Run `npm run build` to build for production
- Run `npm run generate-sitemap` to generate the sitemap.xml
- Run `npm run build:with-sitemap` to build and generate sitemap

## Content Management

- Blog posts are written in Markdown and stored in `src/content/blog/`
- Images should be placed in the `public/` directory
- Update meta tags in `src/consts.ts` for site-wide changes

## Deployment

The site is automatically deployed to Vercel when changes are pushed to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Place images linked in markdown in ```public``` folder.
