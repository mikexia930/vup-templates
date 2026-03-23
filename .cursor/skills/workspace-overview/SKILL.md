---
name: workspace-overview
description: >-
  Overview of the vup-templates monorepo structure, conventions, and vup-cli
  usage. Use when starting any task in this project, creating new apps or
  packages, or needing to understand the project layout, build commands, or
  shared dependencies.
---

# Workspace Overview

## 仓库定位

vup-templates 是一个 pnpm monorepo，作为多平台应用开发基座。通过 vup-cli（命令
`vup`）管理项目初始化和模板添加。

## 目录结构

```
├── apps/                          # 应用目录
│   ├── vue-template/              # Vue3 SPA（支持 qiankun 子应用）
│   ├── nuxt-template/             # Nuxt 4 SSR
│   ├── electron-template/         # Electron 桌面应用
│   ├── capacitor-template/        # Capacitor 移动端
│   ├── uniapp-template/           # uni-app 多端（独立于 workspace）
│   ├── qiankun-template/          # 微前端主应用
│   ├── wxt-template/              # 浏览器扩展
│   ├── nest-template/             # NestJS 后端
│   ├── mcp-template/              # MCP 服务（Fastify + JWT）
│   ├── vitepress-template/        # 文档站
│   ├── component-template/        # 可发布组件库
│   └── cli-template/              # Node CLI
├── packages/                      # 共享包
│   ├── ui/                        # @vup/ui — Element Plus 封装
│   ├── iconfont/                   # @vup/iconfont
│   ├── richeditor/                 # @vup/richeditor — WangEditor 封装
│   ├── nest-upload/                # @vup/nest-upload — Nest 上传模块
│   └── demo/                       # 包演示应用
├── _shared/assets/styles/         # 共享样式
│   ├── tailwind.scss              # Tailwind 入口
│   ├── theme.scss                 # 主题变量
│   ├── base-colors.scss           # 颜色变量
│   └── base-size.scss             # 尺寸变量
├── deploy/                        # Docker / Nginx 部署配置
├── .template.config.json          # vup-cli 模板清单
├── pnpm-workspace.yaml            # workspace 声明
├── vercel.json                    # Vercel 部署配置
└── eslint.config.js               # @antfu/eslint-config
```

## vup-cli 使用

CLI 安装后通过 `vup` 命令操作：

| 命令              | 作用                                         |
| ----------------- | -------------------------------------------- |
| `vup init <name>` | 创建新 monorepo（克隆模板 + 生成骨架）       |
| `vup add <name>`  | 添加应用到 `apps/<name>`（交互选模板）       |
| `vup use <name>`  | 添加共享包到 `packages/<name>`（交互选模板） |
| `vup template -l` | 列出可用模板                                 |
| `vup template -u` | 更新本地模板缓存                             |

添加后执行 `pnpm install` 安装依赖。

## 关键约定

### 路径别名

- `@/` → 当前包/应用的 `src/` 目录
- `@_shared` → 仓库根 `_shared/` 目录

### 命名

- 应用名：小写 + 连字符，≤50 字符（如 `admin-panel`）
- 组件：`V` 前缀（`VFileModal`、`VFileList`），与 @vup/ui 保持一致
- 共享包作用域：`@vup/*`
- Pinia Store：`use*Store` 命名 + 组合式写法（如
  `useAuthStore`、`useUserStore`）

### i18n 语言文件

- Vue / Capacitor / Electron 模板：`locales/en_US.ts`、`zh_CN.ts`（下划线 + TS）
- Nuxt 模板：`locales/en-US.json`、`zh-CN.json`（连字符 + JSON，`@nuxtjs/i18n`
  要求）
- uni-app 模板：`locales/en-US.ts`、`zh-CN.ts`（连字符 + TS）

### 样式

- Tailwind 4 + PostCSS，入口统一引用 `@_shared/assets/styles/tailwind.scss`
- 主题定制通过 `theme.scss`、`base-colors.scss`、`base-size.scss`

### 自动导入

- `unplugin-auto-import` 已配置，无需手动 import vue / vue-router / pinia /
  vue-i18n 的常用 API

### ESLint

- 使用 @antfu/eslint-config（TypeScript + Vue），stylistic 规则关闭
- commit 时通过 lint-staged 自动 fix + format

### 构建产物

- 统一输出到 `.output/` 目录

## 环境要求

- Node ≥ 22（volta 锁定 v22.21.1）
- pnpm ≥ 10（volta 锁定 10.9.4）

## 常用命令

| 命令                       | 说明            |
| -------------------------- | --------------- |
| `pnpm dev:all`             | 全部包并行 dev  |
| `pnpm --filter <name> dev` | 单个包 dev      |
| `pnpm build:all`           | 全部构建        |
| `pnpm lint:all`            | 全部 lint       |
| `pnpm type-check:all`      | 全部类型检查    |
| `pnpm deploy:prod`         | Vercel 生产部署 |
| `pnpm deploy:preview`      | Vercel 预览部署 |

## 注意事项

- `uniapp-template`
  被 pnpm-workspace.yaml 排除（`!apps/uniapp-*`），需独立管理依赖
- `vercel.json` 中 `{project_name}` 为占位符，部署前需替换为实际应用目录名
- 根 `package.json` 提升了 vue / pinia /
  vue-router 等公共依赖，子应用一般不重复声明
