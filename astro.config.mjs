import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ewohub.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    build: {
      // Without this, small hoisted component <script> chunks (most of ours
      // are well under Vite's default 4kb inline threshold) get treated as
      // inlinable assets during the production build but never actually get
      // inlined into the referencing HTML either — they just silently vanish
      // from dist/_astro entirely, breaking every interactive widget on the
      // site. See https://github.com/withastro/astro/issues/7146.
      assetsInlineLimit: 0,
    },
  },
});
