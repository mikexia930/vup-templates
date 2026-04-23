import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 获取 __dirname 的 ES 模块等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _rootDir = path.join(__dirname, '../../');

const apps = [];

function collectWorkspaceEntries(directory, type) {
  const absoluteDir = path.join(_rootDir, directory);
  if (!fs.existsSync(absoluteDir)) return;

  fs.readdirSync(absoluteDir, { withFileTypes: true }).forEach((dirent) => {
    if (!dirent.isDirectory()) return;

    const entryPath = path.join(absoluteDir, dirent.name);
    const packageJsonPath = path.join(entryPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    apps.push({
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      path: `${directory}/${dirent.name}`,
      type,
    });
  });
}

collectWorkspaceEntries('apps', 'app');
collectWorkspaceEntries('packages', 'package');
collectWorkspaceEntries('examples', 'example');

// 写入文件
fs.writeFileSync(path.join(_rootDir, './.template.config.json'), JSON.stringify(apps, null, 2));
console.log('✅ Apps 列表已生成:', apps.map((app) => `${app.name}@${app.version}`).join(', '));
