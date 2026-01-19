import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 获取 __dirname 的 ES 模块等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _rootDir = path.join(__dirname, '../../');

// 读取 apps 目录
const appsDir = path.join(_rootDir, './apps');
const apps = [];

// 遍历 apps 目录
fs.readdirSync(appsDir, { withFileTypes: true }).forEach((dirent) => {
  if (dirent.isDirectory()) {
    const appPath = path.join(appsDir, dirent.name);
    const packageJsonPath = path.join(appPath, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      apps.push({
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        path: `apps/${dirent.name}`,
        type: 'app',
      });
    }
  }
});

// 读取 pakcages 目录
const packagesDir = path.join(_rootDir, './packages');

// 遍历 pakcages 目录
fs.readdirSync(packagesDir, { withFileTypes: true }).forEach((dirent) => {
  if (dirent.isDirectory()) {
    const packagePath = path.join(packagesDir, dirent.name);
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      apps.push({
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        path: `packages/${dirent.name}`,
        type: 'package',
      });
    }
  }
});

// 写入文件
fs.writeFileSync(path.join(_rootDir, './.template.config.json'), JSON.stringify(apps, null, 2));
console.log('✅ Apps 列表已生成:', apps.map((app) => `${app.name}@${app.version}`).join(', '));
