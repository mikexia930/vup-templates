---
name: electron-app
description: >-
  Guide for developing desktop applications using electron-template (Electron
  Forge + Vue3). Use when creating desktop apps, or working in
  apps/electron-template, or when user mentions Electron, desktop application,
  or native desktop.
---

# Electron App 开发指南

基于 `apps/electron-template`，适用于跨平台桌面应用。使用 Electron Forge +
Vite + Vue3，主进程/渲染进程/预加载脚本分离。

## 快速开始

```bash
vup add my-desktop

# 选择 electron 模板，完成后
pnpm install
pnpm --filter my-desktop dev       # electron-forge start
```

## 目录结构

渲染进程内采用模块化结构（参考 `module-structure` rule），`@/` 指向
`src/renderer/`：

```
apps/my-desktop/
├── src/
│   ├── main.ts                    # Electron 主进程
│   ├── preload.ts                 # 预加载脚本（主进程 ↔ 渲染进程桥梁）
│   └── renderer/                  # 渲染进程（Vue 应用）
│       ├── main.ts                # Vue 入口
│       ├── App.vue
│       ├── router/
│       │   ├── index.ts           # Hash 路由
│       │   └── routes.ts
│       ├── layouts/
│       ├── modules/               # 业务模块（按功能聚合）
│       │   └── <name>/
│       │       ├── views/
│       │       ├── components/
│       │       ├── stores/
│       │       ├── api/
│       │       └── types/
│       ├── shared/                # 跨模块共享
│       │   ├── components/
│       │   ├── composables/
│       │   └── utils/
│       │       └── tokenStorage.ts # electron-store
│       ├── stores/                # 全局 store（auth、permission、app）
│       ├── api/
│       │   ├── request.ts         # axios 实例
│       │   └── types.ts
│       ├── locales/
│       └── assets/
├── forge.config.ts                # Electron Forge 打包配置
├── vite.main.config.ts            # 主进程 Vite 配置
├── vite.preload.config.ts         # 预加载脚本 Vite 配置
├── vite.renderer.config.ts        # 渲染进程 Vite 配置
└── package.json
```

## 与 Vue SPA 的关键差异

| 方面       | vue-template | electron-template                              |
| ---------- | ------------ | ---------------------------------------------- |
| 路由模式   | WebHistory   | **Hash History**（文件协议不支持 History API） |
| Token 存储 | localStorage | **electron-store**（加密落盘）                 |
| 进程模型   | 单进程       | 主进程 + 渲染进程 + preload                    |
| 构建工具   | Vite         | **Electron Forge** + Vite（3 份 Vite 配置）    |
| 分发       | Web 部署     | 安装包（.dmg / .exe / .deb）                   |

## 进程架构

```
主进程 (src/main.ts)
  ├── 创建 BrowserWindow
  ├── 系统级 API（文件、菜单、托盘等）
  └── 通过 preload 暴露安全 API
        ↓ contextBridge
预加载 (src/preload.ts)
  └── 定义渲染进程可调用的 API
        ↓ window.electronAPI
渲染进程 (src/renderer/)
  └── Vue 应用，通过 window.electronAPI 调用主进程能力
```

## 平台特定实现

### HTTP 客户端：axios

与 vue-template 一致，参考
`patterns/api-layer`。Electron 无跨域限制，可直接请求 API：

```typescript
// src/renderer/api/request.ts
import axios from 'axios';
import { tokenStorage } from '@/shared/utils/tokenStorage';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 15000,
});

request.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### Token 存储：electron-store

```typescript
// src/renderer/shared/utils/tokenStorage.ts
const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const tokenStorage = {
  getToken: () =>
    window.electronAPI?.getStore(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => {
    window.electronAPI?.setStore(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: () => {
    window.electronAPI?.deleteStore(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
  getRefreshToken: () =>
    window.electronAPI?.getStore(REFRESH_KEY) ??
    localStorage.getItem(REFRESH_KEY),
  setRefreshToken: (token: string) => {
    window.electronAPI?.setStore(REFRESH_KEY, token);
    localStorage.setItem(REFRESH_KEY, token);
  },
  removeRefreshToken: () => {
    window.electronAPI?.deleteStore(REFRESH_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
```

## 常用命令

| 命令         | 说明                                 |
| ------------ | ------------------------------------ |
| `pnpm dev`   | 启动开发环境（electron-forge start） |
| `pnpm build` | 打包应用（electron-forge package）   |
| `pnpm make`  | 生成安装包（.dmg / .exe / .deb 等）  |

## 打包配置

`forge.config.ts` 已配置：

- **MakerSquirrel**：Windows .exe 安装包
- **MakerZIP**：macOS .zip
- **MakerDeb / MakerRpm**：Linux 包

修改 `packagerConfig` 配置应用图标、名称等。

## 注意事项

- 渲染进程代码在 `src/renderer/` 下，不是 `src/` 根目录
- **`@/` 别名指向 `src/renderer/`**（非 `src/`），与其他模板不同；import 时
  `@/views/...` 实际解析到 `src/renderer/views/...`
- 路由必须用 **Hash 模式**，Electron 加载本地文件时不支持 History API
- 主进程与渲染进程通信必须通过 preload 的 `contextBridge`，不要开启
  `nodeIntegration`
- 3 份 Vite 配置各管各的：`vite.main.config.ts`（主进程）、`vite.preload.config.ts`（预加载）、`vite.renderer.config.ts`（渲染进程/Vue）
