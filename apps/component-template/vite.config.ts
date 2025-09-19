import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

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
  ],
  build: {
    outDir: '.output',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      name: 'ComponentLib',
      fileName: (format: string, entryName: string) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-router', 'pinia'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
