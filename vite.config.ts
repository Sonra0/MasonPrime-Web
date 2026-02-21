import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/MasonPrime-Web/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
});
