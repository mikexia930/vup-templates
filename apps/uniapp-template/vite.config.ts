import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    uvwt(),
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
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')({ config: './tailwind.config.js' }),
        require('autoprefixer'),
      ],
    },
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import'],
      },
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
