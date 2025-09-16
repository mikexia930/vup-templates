import { build } from 'esbuild';
import { existsSync, mkdirSync } from 'fs';

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: './.output/index.js',
  minify: true,
  format: 'cjs',
  external: [
    'fs-extra',
    'prompts',
    'chalk',
    'commander',
    'simple-git',
    'i18next',
    'i18next-fs-backend',
  ],
  // 添加一些优化选项
  treeShaking: true,
  sourcemap: false,
  metafile: false,
};

// 开发模式配置
const devConfig = {
  ...config,
  minify: false,
  sourcemap: true,
  watch: process.argv.includes('--watch'),
};

async function buildCLI() {
  const isDev = process.argv.includes('--dev');
  process.env.NODE_ENV = isDev ? 'development' : 'production';

  const currentConfig = isDev ? devConfig : config;

  try {
    // 清理并创建 .output 目录
    if (existsSync('./.output')) {
      const { rmSync } = await import('fs');
      rmSync('./.output', { recursive: true });
    }
    mkdirSync('./.output', { recursive: true });

    // 构建主文件
    if (currentConfig.watch) {
      console.log('👀 Watching for changes...');
      const context = await build({
        ...currentConfig,
        write: false,
      });
      await context.watch();
    } else {
      await build(currentConfig);
      console.log('✅ Main bundle built successfully');
    }

    // 复制本地化文件
    const localesSource = 'src/locales';
    const localesDest = './.output/locales';

    if (existsSync(localesSource)) {
      const { cpSync } = await import('fs');
      cpSync(localesSource, localesDest, { recursive: true });
      console.log('✅ Locales copied successfully');
    }

    if (!currentConfig.watch) {
      console.log('🎉 Build completed successfully!');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildCLI();
