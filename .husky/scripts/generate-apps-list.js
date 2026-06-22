import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 获取 __dirname 的 ES 模块等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _rootDir = path.join(__dirname, '../../');

function readPackageJson(directory) {
  const packageJsonPath = path.join(_rootDir, directory, 'package.json');
  if (!fs.existsSync(packageJsonPath)) return null;

  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
}

function createEntry(directory, dirName, packageJson) {
  return {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description || '',
    path: dirName ? `${directory}/${dirName}` : directory,
  };
}

const templateConfig = {
  name: readPackageJson('.')?.name || '',
  version: readPackageJson('.')?.version || '',
  description: readPackageJson('.')?.description || '',
  apps: {},
  packages: {},
  examples: {},
  skills: {},
};

const agentPackageDir = '.agents/_core';
const agentInstallDir = '.agents';
const agentPackageJson = readPackageJson(agentPackageDir);
if (agentPackageJson) {
  templateConfig.skills[agentPackageJson.name] = {
    name: agentPackageJson.name,
    version: agentPackageJson.version,
    description: agentPackageJson.description || '',
    path: agentInstallDir,
  };
}

function collectWorkspaceEntries(directory, group) {
  const absoluteDir = path.join(_rootDir, directory);
  if (!fs.existsSync(absoluteDir)) return;

  fs.readdirSync(absoluteDir, { withFileTypes: true }).forEach((dirent) => {
    if (!dirent.isDirectory()) return;

    const entryPath = path.join(absoluteDir, dirent.name);
    const packageJson = readPackageJson(path.relative(_rootDir, entryPath));
    if (!packageJson) return;

    templateConfig[group][packageJson.name] = createEntry(directory, dirent.name, packageJson);
  });
}

collectWorkspaceEntries('apps', 'apps');
collectWorkspaceEntries('packages', 'packages');
collectWorkspaceEntries('examples', 'examples');

// 写入文件
fs.writeFileSync(
  path.join(_rootDir, './.template.config.json'),
  JSON.stringify(templateConfig, null, 2)
);

const resourceNames = ['apps', 'packages', 'examples', 'skills']
  .flatMap((group) => Object.values(templateConfig[group]))
  .map((entry) => `${entry.name}@${entry.version}`);

console.log('✅ 模板资源清单已生成:', resourceNames.join(', '));
