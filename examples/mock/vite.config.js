import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@_shared': path.resolve(__dirname, '../../_shared'),
    },
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
    outDir: '.output',
  },
  server: {
    host: '0.0.0.0',
    port: 9391,
    open: false,
  },
});
