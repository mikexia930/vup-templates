import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@_shared': path.resolve(__dirname, '../../_shared'),
    },
  },
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
  server: {
    host: '0.0.0.0',
    port: 9008,
    open: false,
    cors: true,
    hmr: {
      overlay: false,
    },
  },
});
