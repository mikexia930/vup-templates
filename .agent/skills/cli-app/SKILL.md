---
name: cli-app
description: >-
  Use when implementing CLI tools with cli-template (Commander + prompts +
  i18next + esbuild). Covers command definition, interactive prompts, i18n,
  error handling, and npm publishing.
---

# cli-app

基于 `cli-template`
的 CLI 工具开发。**用 Commander 定义命令，prompts 交互问答**。

## 适用场景

- 命令行工具（如 vup-cli 本身）
- 代码生成器 / 脚手架
- 自动化脚本
- 对应目录：`apps/<cli-app>/`

## 何时被加载

- new-project Phase 7 选定 cli 栈
- new-feature 给 CLI 加新命令
- maintenance 修 CLI bug

## CLI 平台特有约定

### 1. 目录结构

```
apps/<cli-app>/
├── src/
│   ├── index.ts                   入口（Commander 注册）
│   ├── i18n.ts                    i18n 初始化
│   ├── commands/                  命令目录（每个命令一个目录）
│   │   └── <command>/
│   │       └── index.ts
│   ├── utils/                     工具函数
│   │   ├── logger.ts              日志输出（chalk 着色）
│   │   ├── file.ts                文件操作
│   │   └── git.ts                 git 操作
│   └── locales/                   多语言
│       ├── zh_CN/
│       │   └── common.json
│       └── en_US/
│           └── common.json
├── bin/
│   └── cli.js                     bin 入口（指向构建产物）
├── esbuild.config.js              构建配置
└── package.json
```

### 2. 定义新命令

```typescript
// src/commands/init/index.ts
import prompts from 'prompts';
import i18next from '../../i18n';
import Logger from '../../utils/logger';

export default async function initCommand(options: { template?: string }) {
  // 交互式问答
  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: i18next.t('init.projectName'),
  });

  if (!name) {
    Logger.error(i18next.t('error.cancelled'));
    return;
  }

  Logger.success(i18next.t('init.success', { name }));
}
```

注册到主程序：

```typescript
// src/index.ts
import initCommand from './commands/init';

program
  .command('init')
  .description(i18next.t('init.description'))
  .option('-t, --template <template>', i18next.t('init.options.template'))
  .action(initCommand);
```

### 3. 技术栈

| 库           | 用途                |
| ------------ | ------------------- |
| `commander`  | 命令定义 + 参数解析 |
| `prompts`    | 交互式问答          |
| `chalk`      | 终端着色            |
| `i18next`    | 多语言              |
| `fs-extra`   | 文件操作            |
| `simple-git` | git 操作            |
| `esbuild`    | 构建打包            |

### 4. 构建 & 发布

```bash
pnpm --filter <cli> dev           # 开发运行
pnpm --filter <cli> build         # esbuild 构建
pnpm --filter <cli> publish:npm   # 发布到 npm
pnpm --filter <cli> publish:beta  # 发布 beta 版
```

产物输出到 `.output/`，`bin/cli.js` 指向构建产物。

### 5. 错误处理

基座已有 Commander 错误拦截（`exitOverride`），覆盖：

- 缺少必填参数
- 未知命令
- 未知选项

新命令应在 action 内用 try/catch + `Logger.error` 处理业务错误。

## 实现新命令的步骤

1. 与用户确认命令名 + 参数 + 功能
2. 在 `src/commands/<name>/index.ts` 实现
3. 在 `src/index.ts` 注册命令
4. 在 `locales/` 添加多语言文案
5. 每完成一步 Gate 一次

## 关键决策点（AI 必须问用户）

1. **命令名**：叫什么？有没有子命令？
2. **参数**：必填 / 可选参数有哪些？
3. **交互**：需要交互式问答还是纯参数模式？
4. **是否发布 npm**：公开包还是内部工具？

## 产出位置

- 命令实现：`apps/<cli>/src/commands/<name>/index.ts`
- 命令注册：`apps/<cli>/src/index.ts`
- 多语言：`apps/<cli>/src/locales/`

## 资源

```
cli-app/
└── SKILL.md            本文件
```

Commander 官方文档：https://github.com/tj/commander.js
