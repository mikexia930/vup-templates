# CLI 命令行工具开发模板

基于 Node.js +
TypeScript 的现代化命令行工具开发模板，支持多语言、交互式命令和完整的开发工具链。

## 🚀 技术栈

### 核心框架

- **Node.js** - JavaScript 运行时环境
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Commander.js** - 完整的命令行界面解决方案

### 开发工具

- **ESBuild** - 极速的 JavaScript 打包器
- **tsx** - TypeScript 执行器，支持热重载
- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具

### 功能库

- **Chalk** - 终端字符串样式化
- **Prompts** - 交互式命令行提示
- **fs-extra** - 增强的文件系统操作
- **simple-git** - Git 操作封装
- **i18next** - 国际化框架

## 📚 文档地址

### 核心技术

- [Node.js 官方文档](https://nodejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Commander.js 官方文档](https://github.com/tj/commander.js)

### 开发工具

- [ESBuild 官方文档](https://esbuild.github.io/)
- [tsx 官方文档](https://github.com/esbuild-kit/tsx)
- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)

### 功能库

- [Chalk 官方文档](https://github.com/chalk/chalk)
- [Prompts 官方文档](https://github.com/terkelg/prompts)
- [fs-extra 官方文档](https://github.com/jprichardson/node-fs-extra)
- [simple-git 官方文档](https://github.com/steveukx/git-js)
- [i18next 官方文档](https://www.i18next.com/)

## 🛠️ 使用方式

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 直接运行 TypeScript 代码
pnpm dev

# 构建并监听文件变化
pnpm build:watch
```

### 构建项目

```bash
# 生产构建
pnpm build

# 开发构建
pnpm build:dev
```

### 运行构建后的代码

```bash
# 运行构建后的 CLI 工具
pnpm start

# 或者直接运行
node .output/index.js
```

### 代码检查

```bash
# 检查代码质量
pnpm lint

# 自动修复问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化代码
pnpm format

# 检查格式
pnpm format:check
```

## 📦 发布到 NPM

### 构建并发布

```bash
# 构建项目
pnpm build

# 发布到 NPM
pnpm publish:npm

# 发布 Beta 版本
pnpm publish:beta
```

### 全局安装使用

```bash
# 全局安装
npm install -g your-cli-tool

# 使用命令
your-cli-tool --version
your-cli-tool language --current
```

## 📁 项目结构

```
cli-template/
├── src/
│   ├── commands/           # 命令模块
│   │   └── language/       # 语言命令
│   │       └── index.ts
│   ├── locales/            # 国际化文件
│   │   ├── en_US/          # 英文
│   │   │   └── common.json
│   │   └── zh_CN/          # 中文
│   │       └── common.json
│   ├── utils/              # 工具函数
│   │   ├── file.ts         # 文件操作
│   │   ├── git.ts          # Git 操作
│   │   └── logger.ts       # 日志工具
│   ├── i18n.ts             # 国际化配置
│   └── index.ts            # 入口文件
├── .output/                # 构建输出目录
├── esbuild.config.js       # ESBuild 配置
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明
```

## ✨ 特性

### 核心特性

- 🎯 **TypeScript 支持** - 完整的类型安全
- 🚀 **ESBuild 构建** - 极速的构建体验
- 🌍 **多语言支持** - 内置中英文国际化
- 🎨 **彩色输出** - 美观的终端显示
- 💬 **交互式命令** - 用户友好的交互体验

### 开发特性

- 🔧 **热重载** - 开发时自动重新构建
- 📦 **模块化** - 清晰的命令模块结构
- 🛠️ **工具链** - 完整的开发工具支持
- 📝 **代码规范** - ESLint + Prettier
- 🏗️ **构建优化** - 生产环境优化

### 功能特性

- 📁 **文件操作** - 增强的文件系统操作
- 🔀 **Git 集成** - 完整的 Git 操作支持
- 📊 **日志系统** - 统一的日志输出
- 🌐 **国际化** - 多语言命令支持

## 🎨 命令系统

### 内置命令

#### 版本信息

```bash
# 查看版本
cli --version
cli -v
```

#### 语言设置

```bash
# 查看当前语言
cli language --current

# 重设语言
cli language --reset

# 查看帮助
cli language --help
```

### 自定义命令

在 `src/commands/` 目录下创建新的命令模块：

```typescript
// src/commands/my-command/index.ts
import { Command } from 'commander';
import Logger from '../../utils/logger';

export default function myCommand(options: any) {
  Logger.info('Hello from my command!');
  // 命令逻辑
}
```

然后在 `src/index.ts` 中注册：

```typescript
program
  .command('my-command')
  .description('My custom command')
  .action(myCommand);
```

## 🌍 国际化

项目内置了完整的多语言支持：

### 添加新语言

1. 在 `src/locales/` 下创建新的语言目录
2. 添加对应的 JSON 翻译文件
3. 在 `src/i18n.ts` 中配置新语言

### 使用翻译

```typescript
import i18next from './i18n';

// 简单翻译
const message = i18next.t('common.hello');

// 带参数的翻译
const message = i18next.t('common.greeting', { name: 'World' });
```

## 🎨 样式输出

使用 Chalk 进行终端样式化：

```typescript
import chalk from 'chalk';

// 彩色输出
console.log(chalk.red('错误信息'));
console.log(chalk.green('成功信息'));
console.log(chalk.blue('信息提示'));

// 样式组合
console.log(chalk.bold.red('粗体红色'));
console.log(chalk.bgBlue.white('蓝色背景白色文字'));
```

## 💬 交互式命令

使用 Prompts 创建交互式命令：

```typescript
import prompts from 'prompts';

const response = await prompts({
  type: 'select',
  name: 'choice',
  message: '请选择操作',
  choices: [
    { title: '选项1', value: 'option1' },
    { title: '选项2', value: 'option2' },
  ],
});
```

## 🔧 开发工具

### 代码检查

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查

### 构建工具

- **ESBuild** - 极速打包
- **tsx** - TypeScript 执行
- **文件监听** - 自动重新构建

### 调试

```bash
# 开发模式运行
pnpm dev

# 构建并监听
pnpm build:watch

# 调试构建后的代码
node --inspect .output/index.js
```

## 📦 发布流程

1. **更新版本号**

   ```bash
   npm version patch  # 补丁版本
   npm version minor  # 次要版本
   npm version major  # 主要版本
   ```

2. **构建项目**

   ```bash
   pnpm build
   ```

3. **发布到 NPM**
   ```bash
   pnpm publish:npm
   ```

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd cli-template
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **开发模式**

   ```bash
   pnpm dev
   ```

4. **构建项目**

   ```bash
   pnpm build
   ```

5. **运行命令**
   ```bash
   node .output/index.js --help
   ```

## 📄 许可证

MIT License
