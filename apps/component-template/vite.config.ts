import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

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
      external: ['vue', 'vue-router', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
