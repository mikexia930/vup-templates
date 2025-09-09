import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, mergeConfig } from 'vite';

export default mergeConfig(
  defineConfig({
    root: '.',
    plugins: [
      vue(),
      vueJsx(),
      tailwindcss(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
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
    css: {
      postcss: path.resolve(__dirname, '../../postcss.config.js'),
      preprocessorOptions: {
        scss: {
          additionalData: `
            @reference "tailwindcss";
            @tailwind base;
            @tailwind components;
            @tailwind utilities;
          `,
        },
      },
    },
    build: {
      target: 'es2015',
      minify: 'esbuild',
      sourcemap: false,
      outDir: '.output',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            utils: ['lodash-es', 'dayjs'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia'],
    },
    server: {
      host: '0.0.0.0',
      port: 9001,
      open: false,
      cors: true,
      hmr: {
        overlay: false,
      },
    },
  })
);
