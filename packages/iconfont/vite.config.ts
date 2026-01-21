import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path, { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: '.output',
      include: ['src/**/*'],
      exclude: ['**/*.test.*', '**/*.spec.*'],
      insertTypesEntry: true,
      copyDtsFiles: false,
      rollupTypes: true,
    }),
    AutoImport({
      imports: ['vue'],
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
  build: {
    outDir: '.output',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      name: 'VupUI',
      fileName: (format: string, entryName: string) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
        },
        // 处理资源文件
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'iconfont.css';
          }
          if (assetInfo.name?.match(/\.(woff2?|ttf)$/)) {
            return '[name][extname]';
          }
          return '[name][extname]';
        },
      },
    },
  },
});
