import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-i18n'],
      dts: path.resolve(__dirname, 'auto-imports.d.ts'),
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: path.resolve(__dirname, './.eslintrc-auto-import.json'),
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@_shared': path.resolve(__dirname, '../../_shared'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9308,
    open: false,
    cors: true,
    hmr: {
      overlay: false,
    },
  },
});
