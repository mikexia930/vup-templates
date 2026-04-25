# Electron 桌面应用模板

基于 Electron Forge + Vue 3 + TypeScript +
Vite 的桌面应用模板，面向跨平台桌面应用开发、打包与分发。

## 技术定位

- **主语是 Electron**：模板重点展示主进程、preload、安全桥接、渲染进程和打包工作流。
- **渲染进程按 Vue 模板分层**：业务代码放在 `src/renderer/modules/<name>/`。
- **Hash 路由**：桌面文件协议和打包环境下使用 `createWebHashHistory`。
- **i18n 自动聚合**：根语言包使用 `zh-CN` / `en-US`，自动扫描
  `modules/*/locales`。
- **接口类型跟 API 走**：请求 / 响应类型放到模块 `api/types.ts`；模块 `types/`
  只放多处共享的运行时类型。
- **样式优先走模板基座**：渲染进程 demo 使用 Tailwind CSS 和
  `_shared/assets/styles/theme`
  语义色，只有 Tailwind 覆盖不了的场景才补少量原生 CSS。

## 快速开始

```bash
pnpm install
pnpm dev
```

构建与分发：

```bash
pnpm build
pnpm make
pnpm publish
```

代码质量：

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## 目录结构

```txt
src/
├── main.ts                       # Electron 主进程入口
├── preload.ts                    # 安全桥接
└── renderer/
    ├── api/
    │   ├── request.ts            # 应用侧请求适配层
    │   └── types.ts
    ├── locales/
    │   ├── common/
    │   │   ├── zh-CN.ts
    │   │   └── en-US.ts
    │   ├── zh-CN.ts              # common + 自动聚合 modules/*
    │   └── en-US.ts
    ├── modules/
    │   └── demo/
    │       ├── api/              # 接口函数与响应类型
    │       ├── components/
    │       ├── locales/
    │       ├── stores/
    │       ├── types/            # 模块级共享类型
    │       └── views/
    ├── router/
    ├── views/
    ├── App.vue
    └── main.ts
```

## Electron 约定

- 主进程只处理窗口、生命周期、原生能力和 IPC handler。
- preload 只通过 `contextBridge` 暴露有限 API。
- 渲染进程不要直接 `require('electron')` 或访问 Node 能力。
- 需要原生能力时，先在主进程注册 IPC，再从 preload 暴露语义化方法。
- 开发 demo 可以使用本地数据或 preload bridge，不默认依赖外部后端。

## Demo 说明

当前 demo 展示：

- Electron Forge 开发、打包、安装包制作流程
- 主进程 / preload / renderer 边界
- `contextBridge` 读取运行时信息
- Pinia 状态演示
- 模块化 i18n 自动聚合
- Electron 渲染进程目录结构
- Tailwind CSS + 共享 theme token 的渲染进程样式组织

## Monorepo 安装异常排查

如果出现 Electron 二进制未正确安装：

```txt
Error: Electron failed to install correctly, please delete node_modules/electron and try installing again
```

可在当前应用目录重新安装并手动执行 Electron 安装脚本：

```bash
pnpm install
cd node_modules/electron
node install.js
cd ../..
pnpm dev
```

## 相关文档

- [Electron](https://www.electronjs.org/)
- [Electron Forge](https://www.electronforge.io/)
- [Vue 3](https://vuejs.org/)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue i18n](https://vue-i18n.intlify.dev/)
- [@vup/http](../../packages/http/README.md)
- [@vup/ui](../../packages/ui/README.md)
