import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { createDefaultPwaIcons, createVupPwaPlugin } from '../../packages/pwa/src/index.ts';

export default defineConfig({
  root: '.',
  plugins: [
    vue(),
    createVupPwaPlugin({
      appName: 'VUP PWA Example',
      shortName: 'PWA Example',
      description: 'A minimal PWA example based on @vup/pwa',
      overrides: {
        injectRegister: false,
        manifest: {
          name: 'VUP PWA Example',
          short_name: 'PWA Example',
          description: 'A minimal PWA example based on @vup/pwa',
          theme_color: '#0f172a',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          lang: 'en-US',
          icons: createDefaultPwaIcons(),
        },
      },
    }),
  ],
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
    port: 9392,
    open: false,
  },
});
