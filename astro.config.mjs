// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeCallouts from 'rehype-callouts';
import remarkObsidian from './src/plugins/remark-obsidian.mjs';
import rehypeSidenotes from './src/plugins/rehype-sidenotes.mjs';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import contentAssets from './src/integrations/content-assets.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kleinbutsignificant.com',
  trailingSlash: 'ignore',
  // Responsive srcset for all images, including Markdown ones (photos are camera-sized originals).
  image: { layout: 'constrained', responsiveStyles: true },
  integrations: [mdx(), sitemap(), contentAssets({ sections: ['writing'] })],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkObsidian],
      rehypePlugins: [
        [rehypeCallouts, { theme: 'obsidian' }],
        rehypeSidenotes,
        rehypeExternalLinks,
      ],
    }),
    shikiConfig: {
      // Near-monochrome highlighting to match the black & white look.
      themes: { light: 'min-light', dark: 'min-dark' },
      wrap: false,
    },
  },
  redirects: {
    // v1 (Hugo) URLs. Slugs that changed are mapped explicitly.
    '/post/2024-01-17-using-github-codespaces-for-quarto-development':
      '/writing/codespaces-quarto/',
    '/post/[slug]': '/writing/[slug]',
    '/post': '/writing/',
    '/vitae': '/cv/',
    '/pubs': '/research/',
    '/publications': '/research/',
    '/archives': '/writing/',
  },
});
