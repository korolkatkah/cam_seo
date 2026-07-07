import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ewo.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
