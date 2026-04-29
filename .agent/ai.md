# AGENTS.md

本文件是所有 AI 模型（Claude / Cursor / Copilot / Gemini 等）在本仓库工作时的
**统一入口**。AI 启动任务前必须读取本文件，然后按指引加载 rules 和 skills。

## 指令来源

所有 AI 工作指令存放在 `.agent/` 目录中（Single Source of Truth）：

```
.agent/
├── README.md                    框架说明（给人看）
├── rules/                       始终生效的强约束（8 个）
└── skills/                      按需加载的能力胶囊（25 个）
```

## Rules（始终生效）

AI 执行任何任务时，必须遵守 `.agent/rules/` 下的所有规则：

| Rule                         | 说明                                                        |
| ---------------------------- | ----------------------------------------------------------- |
| `ai-workflow.md`             | AI 行为契约：不跳步、必停顿、Gate 协议、禁猜原则            |
| `project-global.md`          | 全局项目约束：禁止修改的文件、依赖管理、环境变量            |
| `commenting.md`              | 注释规范：中文注释、解释「为什么」                          |
| `typescript.md`              | TypeScript 规范：auto-import、路径别名、类型、API 函数命名  |
| `vue-component.md`           | Vue 组件规范：script setup、typed props、V\* 组件、Tailwind |
| `module-structure.md`        | 模块化目录规范：按业务聚合、API 文件命名、模块间隔离        |
| `http-request-governance.md` | 请求治理：并发策略、频次控制、缓存、loading 反馈            |
| `git-workflow.md`            | Git 规范：Conventional Commits、分支命名、原子提交          |

## Skills（按需加载）

AI 根据当前任务的上下文，从 `.agent/skills/` 加载相关 skill。每个 skill 目录下的
`SKILL.md` 包含 frontmatter（name +
description），AI 通过 description 判断是否与当前任务相关。

### 三层架构

```
┌─────────────────────────────────────────────────┐
│ Pattern（业务模式，编排多个能力成完整页面）       │
│   crud-page / login-page / admin-layout         │
│                  ↓ 引用                          │
├─────────────────────────────────────────────────┤
│ Stack（平台特有，只管本平台的事）                │
│   vue-app / nuxt-app / nest-api / electron-app  │
│   capacitor-app / uniapp-app / wxt-extension    │
│   qiankun-app / mcp-service / vitepress-app     │
│   cli-app / component-lib / package-lib         │
│                  ↓ 引用                          │
├─────────────────────────────────────────────────┤
│ Capability（跨平台能力，被多个 stack 复用）       │
│   http-client / token-storage / auth-login      │
│   auth-guard / api-layer / permission-rbac      │
│   vup-ui / deploy                               │
├─────────────────────────────────────────────────┤
│ Flow（端到端流程）                               │
│   new-project                                   │
└─────────────────────────────────────────────────┘
```

### Skill 完整清单

#### Flow（端到端流程）

| Skill         | 何时加载                       |
| ------------- | ------------------------------ |
| `new-project` | 从零启动新项目（9 Phase 流程） |

#### Capability（跨平台能力）

| Skill             | 何时加载                                                     |
| ----------------- | ------------------------------------------------------------ |
| `http-client`     | 实现 HTTP 请求层（vue/electron/capacitor/wxt 用 @vup/http）  |
| `token-storage`   | 实现 token 存储（5 平台各有实现）                            |
| `auth-login`      | 实现登录/登出/refresh token 流程                             |
| `auth-guard`      | 实现路由守卫/未登录跳转                                      |
| `api-layer`       | 组织模块 API 文件和命名                                      |
| `permission-rbac` | 实现 RBAC 权限（动态路由/菜单/按钮权限）                     |
| `vup-ui`          | 使用基座 UI 组件库（@vup/ui 桌面端 / @vup/ui-mobile 移动端） |
| `deploy`          | 部署应用（Vercel 默认 / Docker 可选）+ CI/CD 配置            |

#### Stack（平台特有）

| Skill           | 何时加载                  |
| --------------- | ------------------------- |
| `vue-app`       | 开发 Vue3 SPA 应用        |
| `nuxt-app`      | 开发 Nuxt SSR/SSG 应用    |
| `nest-api`      | 开发 NestJS 后端          |
| `electron-app`  | 开发 Electron 桌面应用    |
| `capacitor-app` | 开发 Capacitor 移动端应用 |
| `uniapp-app`    | 开发 uni-app 多端应用     |
| `wxt-extension` | 开发浏览器扩展            |
| `qiankun-app`   | 开发 qiankun 微前端主应用 |
| `mcp-service`   | 开发 MCP Server 服务      |
| `vitepress-app` | 开发 VitePress 文档站点   |
| `cli-app`       | 开发 CLI 命令行工具       |
| `component-lib` | 开发可复用组件库 / 工具库 |
| `package-lib`   | 开发纯 TypeScript 包      |

#### Pattern（业务模式）

| Skill          | 何时加载             |
| -------------- | -------------------- |
| `crud-page`    | 实现标准增删改查页面 |
| `login-page`   | 实现登录页           |
| `admin-layout` | 实现后台管理布局     |

## 文档约定

### 项目文档结构

```
docs/
├── project/                   项目级文档（new-project skill 产出）
│   ├── 10-requirements.md     需求文档
│   ├── 20-tech-stack.md       技术栈选型
│   ├── 30-architecture.md     架构设计
│   ├── 40-ui-spec.md          UI/交互稿
│   ├── 50-api-contract.md     接口契约
│   ├── 60-task-list.md        任务清单
│   ├── 90-decision-log.md     决策日志
├── designs/                   设计稿统一存放
│   ├── login.png              截图 / 导出图（按页面命名）
│   ├── user-list.png
│   └── ...                    Figma 链接记录在 project/40-ui-spec.md
└── modules/                   模块级文档（复杂模块按需创建）
    └── <name>/
        └── overview.md
```

### 文档规则

- `.agent/` = AI 工作的工具（模板、规则、流程），**不要修改**
- `docs/` = 项目实际产出的文档（用模板填出来的实例）
- 新项目开始时，AI 先创建 `docs/project/` 目录
- 设计稿截图统一放 `docs/designs/`，按页面名命名
- AI 实现页面前，先检查 `docs/designs/<page>.*` 是否存在
- 决策日志贯穿全过程，重要选择都记录到 `docs/project/90-decision-log.md`

## 设计稿约定

### AI 如何使用设计稿

1. **先检查**：实现 UI 前先看 `docs/designs/` 是否有对应页面的设计稿
2. **有设计稿**：严格按设计稿还原（布局、间距、色彩、交互）
3. **无设计稿**：必须停下问用户，不要自己"想象" UI
4. **文字描述**：如用户只给文字描述，AI 整理到 `40-ui-spec.md` 后再实现

### 用户如何提供设计稿

- Figma 链接：记录到 `docs/project/40-ui-spec.md`
- 截图/导出图：放到 `docs/designs/<page>.png`
- 参考产品：截图后按上述方式存放，并注明"参考 XXX"

## 共享包速查

AI 遇到以下场景时，**优先使用基座已有的共享包**，不要推荐第三方替代：

| 包                 | 用途                                | 详见                             |
| ------------------ | ----------------------------------- | -------------------------------- |
| `@vup/http`        | axios 封装（请求实例工厂 + 拦截器） | `http-client` skill              |
| `@vup/ui`          | Element Plus 封装（V\* 前缀组件）   | `vup-ui` skill                   |
| `@vup/ui-mobile`   | Ionic Vue 封装（VM\* 前缀组件）     | `vup-ui` skill                   |
| `@vup/pwa`         | PWA 接入层（配置预设 + 运行时）     | `packages/pwa/README.md`         |
| `@vup/mock`        | MSW mock 数据（开发环境拦截请求）   | `packages/mock/README.md`        |
| `@vup/iconfont`    | 图标管理（iconfont 集成）           | `packages/iconfont/README.md`    |
| `@vup/richeditor`  | 富文本编辑器                        | `packages/richeditor/README.md`  |
| `@vup/nest-upload` | Nest 文件上传模块                   | `packages/nest-upload/README.md` |

## 基座结构速览

本仓库是 monorepo，核心结构：

```
├── apps/                      正式应用模板层（vup add）/ 用户项目
│   ├── vue-template/          Vue3 SPA 模板
│   ├── nuxt-template/         Nuxt SSR/SSG 模板
│   ├── nest-template/         NestJS 后端模板
│   ├── electron-template/     Electron 桌面模板
│   ├── capacitor-template/    Capacitor 移动端模板
│   ├── uniapp-template/       uni-app 多端模板
│   ├── wxt-template/          浏览器扩展模板
│   ├── qiankun-template/      qiankun 微前端主应用
│   ├── vitepress-template/    VitePress 文档站点模板
│   ├── cli-template/          CLI 命令行工具模板
│   ├── component-template/    Vue 组件库模板
│   ├── package-template/      纯 TypeScript 包模板
│   └── mcp-template/          MCP 服务模板
├── examples/                  Examples 参考层（vup example，不作为正式模板）
│   ├── mock/                  @vup/mock 接入示例
│   ├── pwa/                   @vup/pwa 接入示例
│   ├── qiankun/               qiankun 子应用接入示例
│   └── ui/                    UI 使用示例
├── packages/                  共享功能包层（vup use）
│   ├── http/                  @vup/http（axios 封装）
│   ├── ui/                    @vup/ui（Element Plus 封装）
│   ├── ui-mobile/             @vup/ui-mobile（Ionic Vue 封装）
│   ├── pwa/                   @vup/pwa（PWA 接入层）
│   ├── mock/                  @vup/mock（MSW mock）
│   ├── iconfont/              @vup/iconfont（图标字体组件）
│   ├── richeditor/            @vup/richeditor（富文本编辑器）
│   └── nest-upload/           @vup/nest-upload（Nest 文件上传模块）
├── extends/                   非 JS 扩展项目
├── _shared/                   跨应用共享资源
├── .agent/                    AI 指令集（本体）
└── docs/                      项目文档（产出）
```

## AI 工作流程

1. **启动**：读取本文件 → 加载所有 rules
2. **理解任务**：判断需要哪些 skills → 按需加载
3. **执行**：按 skill 步骤执行，遵守 rules 约束
4. **Gate**：每个关键产出停下来让用户确认
5. **产出**：代码放对应目录，文档放 `docs/`

详细行为准则见 `.agent/rules/ai-workflow.md`。
