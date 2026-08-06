import { defineConfig } from 'astro/config';

const isPagesPreview = process.env.GITHUB_PAGES_PREVIEW === 'true';

export default defineConfig({
  site: isPagesPreview ? 'https://haebich.github.io' : 'https://digital-forces.de',
  base: isPagesPreview ? '/digitalforces-website' : '/',
  output: 'static',
});
