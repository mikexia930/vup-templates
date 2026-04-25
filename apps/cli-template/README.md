# CLI 命令行工具模板

基于 Node.js +
TypeScript 的命令行工具模板，适合开发可发布到 npm 的 CLI。模板内置 Commander 命令注册、i18next 多语言、终端日志、交互式 prompt、Git 与文件工具函数。

## 技术定位

- **主语是 CLI**：入口、命令注册、参数解析和终端输出是核心能力。
- **命令按模块拆分**：每个命令放在 `src/commands/<name>/`，入口只负责注册。
- **工具函数集中管理**：文件、Git、日志等通用能力放在 `src/utils/`。
- **i18n 走文件系统加载**：运行时从构建产物的 `locales/` 目录读取文案。
- **构建产物可发布**：ESBuild 输出到 `.output/`，`bin/cli.js` 作为命令入口。

## 快速开始

```bash
pnpm install
pnpm dev
```

查看命令帮助：

```bash
pnpm dev -- --help
```

构建后运行：

```bash
pnpm build
node .output/index.js --help
```

## 常用命令

```bash
# 开发
pnpm dev
pnpm build:watch

# 构建
pnpm build
pnpm build:dev

# 代码质量
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## 目录结构

```txt
cli-template/
├── bin/
│   └── cli.js                  # npm bin 入口
├── src/
│   ├── commands/
│   │   └── language/
│   │       └── index.ts        # language 命令实现
│   ├── locales/
│   │   ├── en-US/
│   │   │   └── common.json
│   │   └── zh-CN/
│   │       └── common.json
│   ├── utils/
│   │   ├── file.ts             # 文件操作
│   │   ├── git.ts              # Git 操作
│   │   └── logger.ts           # 终端日志
│   ├── i18n.ts                 # i18next 初始化
│   └── index.ts                # CLI 入口与命令注册
├── esbuild.config.js           # 构建配置，负责复制 locales
├── package.json
└── tsconfig.json
```

## 命令开发约定

新增命令时，在 `src/commands/<command-name>/index.ts` 创建命令实现：

```typescript
import type { Command } from 'commander';
import Logger from '../../utils/logger';

export default async function myCommand() {
  Logger.info('Hello from my command');
}
```

然后在 `src/index.ts` 注册：

```typescript
program
  .command('my-command')
  .description('My custom command')
  .action(myCommand);
```

约定：

- 命令入口只处理参数解析和流程编排。
- 可复用逻辑放到 `src/utils/` 或命令模块内部函数。
- 终端输出优先使用 `Logger`，不要在业务逻辑里散落 `console.log`。
- 需要用户选择时使用 `prompts`，并处理用户取消输入的情况。

## 国际化

当前 CLI 模板使用 i18next 文件系统后端，语言目录使用 BCP 47 中划线格式：

```txt
src/locales/
├── en-US/common.json
└── zh-CN/common.json
```

使用方式：

```typescript
import i18next from './i18n';

const message = i18next.t('language.current');
```

新增语言时：

1. 在 `src/locales/` 下添加语言目录。
2. 补齐 `common.json`。
3. 在 `src/i18n.ts` 的语言映射中加入新语言。
4. 如果需要出现在语言选择命令里，同步更新 `src/commands/language/index.ts`。

> 注意：运行时语言标识统一使用 `en-US` / `zh-CN`。`src/i18n.ts` 只保留对 `en_US`
> / `zh_CN` 等旧输入格式的兼容映射。

## 构建与发布

构建：

```bash
pnpm build
```

产物输出到 `.output/`，并复制 `src/locales/` 到 `.output/locales/`。

发布前确认：

- `package.json` 的 `name`、`version`、`bin`、`files` 正确。
- `pnpm build` 可以生成 `.output/index.js`。
- `bin/cli.js` 能正确加载构建产物。

发布：

```bash
pnpm publish:npm
pnpm publish:beta
```

## 技术栈

- Node.js >= 18
- TypeScript
- Commander.js
- ESBuild
- tsx
- i18next
- chalk
- prompts
- fs-extra
- simple-git

## 相关文档

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Commander.js](https://github.com/tj/commander.js)
- [ESBuild](https://esbuild.github.io/)
- [i18next](https://www.i18next.com/)
- [Chalk](https://github.com/chalk/chalk)
- [Prompts](https://github.com/terkelg/prompts)
