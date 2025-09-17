import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  alias: {
    '@_shared': path.resolve(__dirname, '../../_shared'),
  },
  dev: {
    server: {
      port: 9002,
      host: '0.0.0.0',
    },
  },
  vite: () => {
    return {
      plugins: [tailwindcss()],
      css: {
        postcss: path.resolve(__dirname, '../../postcss.config.js'),
        preprocessorOptions: {
          scss: {
            additionalData: `
              @use "tailwindcss/base";
              @use "tailwindcss/components";
              @use "tailwindcss/utilities";
            `,
          },
        },
      },
      resolve: {
        alias: {
          '@shared': path.resolve(__dirname, '../../_shared'),
        },
      },
    };
  },
});
