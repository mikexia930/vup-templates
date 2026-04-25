---
name: electron-app
description: >-
  Use when implementing features in electron-template projects (Electron + Vue3
  renderer). Covers electron-specific concerns: main/renderer process split,
  preload scripts, IPC communication, native APIs, packaging. Renderer-side Vue
  code follows vue-app conventions. For cross-platform concerns, load the
  corresponding capability skills.
---

# electron-app

基于 `electron-template` 的桌面应用开发。**只管 Electron 平台特有的事**。

## 适用场景

- 桌面应用（Windows / macOS / Linux）
- 对应目录：`apps/<electron-app>/`

## 何时被加载

- new-project Phase 7 选定 electron 栈
- new-feature 在 electron 项目中加功能
- maintenance 修 electron 项目 bug

## 引用的 capability skills

| 能力         | 加载哪个 skill                                           | Electron 特殊说明 |
| ------------ | -------------------------------------------------------- | ----------------- |
| HTTP 请求    | `http-client`（渲染进程用 @vup/http）                    |                   |
| Token 存储   | `token-storage`（localStorage，可选升级 electron-store） |                   |
| 登录 / 登出  | `auth-login`                                             |                   |
| 路由守卫     | `auth-guard`（vue-router beforeEach）                    |                   |
| API 文件组织 | `api-layer`                                              |                   |
| UI 组件      | `vup-ui`（@vup/ui，V\* 前缀）                            |                   |

渲染进程的 Vue 代码遵循 `vue-app` skill 的约定。

## Electron 平台特有约定

### 1. 进程架构

```
apps/<electron-app>/
├── src/
│   ├── main.ts                    Electron 主进程入口
│   ├── preload.ts                 preload 脚本
│   └── renderer/                  渲染进程（Vue 应用）
│       ├── main.ts                Vue 入口
│       ├── App.vue
│       ├── router/
│       ├── modules/
│       ├── locales/               common + modules 自动聚合
│       ├── api/
│       │   └── request.ts         @vup/http 适配
│       └── ...
├── forge.config.ts                Electron Forge 配置
└── package.json
```

**关键**：主进程和渲染进程是独立环境：

- 主进程：Node.js 环境，可用所有 Node API
- 渲染进程：浏览器环境（沙箱），通过 preload 暴露有限 API
- 两者通过 **IPC** 通信

### 2. IPC 通信

```typescript
// preload.ts — 暴露安全 API 给渲染进程
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // 渲染 → 主（invoke / handle 模式，推荐）
  readFile: (path: string) => ipcRenderer.invoke('file:read', path),
  // 主 → 渲染（on / send 模式）
  onUpdateAvailable: (callback: () => void) =>
    ipcRenderer.on('update:available', callback),
});

// 渲染进程使用
const content = await window.electronAPI.readFile('/path/to/file');
```

- **推荐**：`invoke / handle`（请求-响应模式，有返回值）
- **仅限**：`on / send`（事件通知模式，无返回值）
- **禁止**：在渲染进程直接 `require('electron')`

### 3. 路径别名

- `@/` → `src/renderer/`（渲染进程）
- 主进程文件不用 `@` 别名，用相对路径

### 4. 渲染进程 i18n

渲染进程语言目录遵循 `vue-app` 口径，使用 BCP 47 中划线格式：

```
src/renderer/locales/
├── common/
│   ├── zh-CN.ts
│   └── en-US.ts
├── zh-CN.ts              common + 自动扫描 modules/*
└── en-US.ts

src/renderer/modules/<name>/locales/
├── zh-CN.ts
└── en-US.ts
```

不要使用 `zh_CN` / `en_US` 文件名。新增模块文案后由根聚合器自动注册。

### 5. 原生能力

常用 Electron 原生 API（通过 IPC 暴露）：

- 文件系统：`dialog.showOpenDialog` + `fs`
- 系统托盘：`Tray` + `Menu`
- 通知：`Notification`
- 自动更新：`autoUpdater`
- 快捷键：`globalShortcut`

### 6. 打包

```bash
pnpm --filter <electron-app> make    # 生成安装包
```

配置在 `forge.config.ts`，通过 Electron Forge maker 生成 Windows / macOS /
Linux 产物。

### 7. 环境变量

```bash
# .env.development
VITE_API_BASE=http://localhost:3000
```

渲染进程用 `import.meta.env.VITE_*`，主进程用 `process.env.*`。

## 实现新功能的步骤

1. 确认功能在哪个进程（主 / 渲染 / 两者）
2. 如需原生能力：主进程实现 → preload 暴露 → 渲染进程调用
3. 渲染进程的 UI / 业务代码按 vue-app 标准实现
4. API 请求 / 响应类型跟 `api` 走；模块 `types/` 只放模块级共享类型
5. 语言文件使用 `zh-CN` / `en-US`，由根聚合器自动注册
6. 渲染进程样式优先使用 Tailwind CSS 与 `_shared/assets/styles/theme`
   语义 token，覆盖不了的场景才补局部原生 CSS；不要为 demo 重新定义一套私有颜色变量
7. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **是否需要原生能力**：文件读写 / 系统托盘 / 通知 / 快捷键？
2. **token 安全级别**：localStorage 够用？还是需要 electron-store /
   safeStorage？
3. **自动更新**：是否需要 autoUpdater？分发渠道？
4. **目标平台**：Windows / macOS / Linux 全部还是部分？

## 产出位置

- 主进程：`apps/<electron>/src/main.ts`
- preload：`apps/<electron>/src/preload.ts`
- 渲染进程：`apps/<electron>/src/renderer/`（同 vue-app 结构）

## 资源

```
electron-app/
└── SKILL.md            本文件
```

Electron 官方文档：https://www.electronjs.org/docs
