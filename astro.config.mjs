// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// Thin pages kept live (ads, internal links) but out of the index: noindex via Layout prop + excluded here.
const NOINDEX_PATHS = [
  '/solutions/ai-business-solutions/',
  '/solutions/landscaping/',
  '/marketing-for-landscaping/',
];

// https://astro.build/config
export default defineConfig({
  site: 'https://systempros.ai',
  integrations: [react(), sitemap({ filter: (page) => !NOINDEX_PATHS.some((p) => page.endsWith(p)) })],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@remotion/cli']
    },
    ssr: {
      noExternal: ['remotion', '@remotion/player', '@remotion/transitions']
    }
  }
});
