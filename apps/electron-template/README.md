# Electron 桌面应用模板

基于 Electron Forge + Vue 3 + TypeScript +
Vite 的现代化桌面应用模板，开箱即用，支持跨平台分发。

## 🚀 技术栈

- **Electron** - 使用 Web 技术构建跨平台桌面应用
- **Electron Forge** - 打包、构建与分发工具链
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue 官方路由管理器（Hash 模式）
- **Pinia** - Vue 3 官方状态管理库
- **Vue i18n** - 国际化插件
- **Tailwind CSS** + **SCSS** - 样式系统
- **@vup/http** - 共享请求基础能力
- **@vup/ui** - 桌面端 UI 封装组件库（`V*`）

## 📚 文档地址

- [Electron 官方文档](https://www.electronjs.org/)
- [Electron Forge 官方文档](https://www.electronforge.io/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue Router 官方文档](https://router.vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue i18n 官方文档](https://vue-i18n.intlify.dev/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [根目录 README](../../README.md)
- [@vup/http 文档](../../packages/http/README.md)
- [@vup/ui 文档](../../packages/ui/README.md)

## 🛠️ 使用方式

### 安装依赖

```bash
pnpm install
```

### 开发运行

```bash
pnpm dev
```

启动 Electron 开发环境，支持热重载。

### 构建应用

```bash
pnpm build
```

构建 Electron 应用产物。

### 制作安装包

```bash
pnpm make
```

生成安装包（Windows/macOS/Linux）。

### 代码质量

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## ⚠️ Monorepo 项目注意事项（Electron 安装异常）

在 monorepo 场景中，偶发会出现 Electron 二进制未正确安装的问题，例如：

```txt
Error: Electron failed to install correctly, please delete node_modules/electron and try installing again
```

可按以下步骤排查：

### 1. 在当前应用目录重新安装

```bash
pnpm install
```

### 2. 手动执行 Electron 安装脚本（关键步骤）

```bash
cd node_modules/electron
node install.js
```

### 3. 验证安装

```bash
npx electron --version
```

### 4. 回到应用目录启动

```bash
cd ../..
pnpm dev
```

如果仍失败，再做一次完整清理后重复步骤 1-4：

```bash
rm -rf node_modules
pnpm store prune
pnpm install
cd node_modules/electron && node install.js
cd ../..
pnpm dev
```

## 📁 项目结构

```txt
src/
├── main.ts                           # Electron 主进程入口
├── preload.ts                        # 预加载脚本
└── renderer/
    ├── api/
    │   ├── request.ts                # 应用侧请求适配层（基于 @vup/http）
    │   └── types.ts
    ├── locales/                      # 根语言包（全局公共文案）
    ├── modules/
    │   └── demo/
    │       ├── views/                # DemoLayout / DemoGuidePage / DemoExamplePage
    │       ├── components/
    │       ├── stores/
    │       ├── api/
    │       ├── types/
    │       └── locales/
    ├── router/
    │   └── routes.ts                 # /demo/guide + /demo/example
    ├── views/empty/Empty.vue
    ├── App.vue
    └── main.ts                       # 渲染进程入口
```

## 🧭 模板约定（增量）

- 默认首页重定向到 `demo-guide`
- `demo` 模块采用 layout + 子路由：`demo-guide`、`demo-example`
- Electron 必须使用 Hash 路由（`createWebHashHistory`）
- 请求分层：
  - 共享能力：`@vup/http`
  - 应用适配：`src/renderer/api/request.ts`
  - 业务接口：`src/renderer/modules/<name>/api`

### Demo 数据来源（Electron）

- Electron 模板默认使用本地内存 demo 数据（`modules/demo/api/taskService.ts`）
- 首次运行无需依赖 mock 或外部后端服务
- 语义说明：`/demo/*` 是页面路由；`/api/template-demo/*`
  仅用于其他模板的演示接口前缀
