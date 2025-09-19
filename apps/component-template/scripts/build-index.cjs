#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 生成统一的入口文件
const generateUnifiedIndex = () => {
  const outputDir = '.output';

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 生成 ESM 格式的统一入口文件
  const esmContent = `// 统一导出入口 - ESM 格式
export * from './components/Input/index.es.js';
export * from './libs/http/index.js';
`;

  // 生成 CommonJS 格式的统一入口文件
  const cjsContent = `// 统一导出入口 - CommonJS 格式
module.exports = {
  ...require('./components/Input/index.es.js'),
  ...require('./libs/http/index.cjs')
};
`;

  // 生成 TypeScript 声明文件
  const dtsContent = `// 统一导出入口 - TypeScript 声明
export * from './components/Input/index.es.js';
export * from './libs/http/index.js';
`;

  // 写入文件
  fs.writeFileSync(path.join(outputDir, 'index.mjs'), esmContent);
  fs.writeFileSync(path.join(outputDir, 'index.js'), cjsContent);
  fs.writeFileSync(path.join(outputDir, 'index.d.ts'), dtsContent);

  console.log('✅ 统一入口文件生成完成');
};

// 检查依赖文件是否存在
const checkDependencies = () => {
  const requiredFiles = [
    '.output/components/Input/index.es.js',
    '.output/libs/http/index.js',
    '.output/libs/http/index.cjs',
    '.output/libs/http/index.d.ts',
  ];

  const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));

  if (missingFiles.length > 0) {
    console.error('❌ 缺少依赖文件:');
    missingFiles.forEach((file) => console.error(`  - ${file}`));
    console.error('请先运行: npm run build:tsup && npm run build:vite');
    process.exit(1);
  }
};

// 主函数
const main = () => {
  console.log('🔨 开始生成统一入口文件...');
  checkDependencies();
  generateUnifiedIndex();
};

main();
