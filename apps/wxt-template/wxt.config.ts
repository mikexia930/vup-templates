import path from 'node:path';
import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  dev: {
    server: {
      port: 9306,
      host: '0.0.0.0',
    },
  },
  vite: () => {
    return {
      plugins: [],
      resolve: {
        alias: {
          '@_shared': path.resolve(__dirname, '../../_shared'),
        },
      },
    };
  },
});
