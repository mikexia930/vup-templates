---
name: capacitor-app
description: >-
  Guide for developing mobile applications using capacitor-template (Capacitor 7
  + Vue3). Use when creating iOS/Android apps, or working in
  apps/capacitor-template, or when user mentions mobile app, Capacitor, iOS, or
  Android.
---

# Capacitor App 开发指南

基于 `apps/capacitor-template`，适用于 iOS /
Android 移动应用开发。使用 Capacitor 7 + Vue3 +
Vite，Web 代码编译后通过 Capacitor 打包为原生应用。

## 快速开始

```bash
vup add my-mobile-app

# 选择 capacitor 模板，完成后
pnpm install

# 开发（浏览器调试）
pnpm --filter my-mobile-app dev

# 添加原生平台（首次）
pnpm --filter my-mobile-app ios:add
pnpm --filter my-mobile-app android:add
```

## 目录结构

与 vue-template 一致采用模块化结构（参考 `module-structure` rule）：

```
apps/my-mobile-app/
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/
│   ├── layouts/
│   ├── modules/                   # 业务模块（按功能聚合）
│   │   └── <name>/
│   │       ├── views/
│   │       ├── components/
│   │       ├── stores/
│   │       ├── api/
│   │       └── types/
│   ├── shared/                    # 跨模块共享
│   │   ├── components/
│   │   ├── composables/
│   │   └── utils/
│   │       └── tokenStorage.ts    # @capacitor/preferences
│   ├── stores/                    # 全局 store（auth、permission、app）
│   ├── api/
│   │   ├── request.ts             # axios 实例
│   │   └── types.ts
│   ├── locales/
│   └── assets/
├── ios/                           # iOS 原生工程（cap add 后生成）
├── android/                       # Android 原生工程（cap add 后生成）
├── capacitor.config.json          # Capacitor 配置
├── vite.config.js
└── package.json
```

## 与 Vue SPA 的关键差异

| 方面       | vue-template        | capacitor-template                     |
| ---------- | ------------------- | -------------------------------------- |
| Token 存储 | localStorage        | **@capacitor/preferences**             |
| 路由模式   | WebHistory          | **WebHistory**（Capacitor 7 支持）     |
| 构建产物   | `.output/` 直接部署 | `.output/` → `cap sync` → 原生工程     |
| 原生能力   | 无                  | Camera、SplashScreen 等 Capacitor 插件 |

## 平台特定实现

### HTTP 客户端：axios

与 vue-template 一致，参考
`patterns/api-layer`。注意移动端需要配置实际 API 地址（不能依赖 Vite 代理）：

```typescript
// src/api/request.ts
import axios from 'axios';
import { tokenStorage } from '@/shared/utils/tokenStorage';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 15000,
});

request.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### Token 存储：@capacitor/preferences

移动端使用原生安全存储，API 为异步：

```typescript
// src/shared/utils/tokenStorage.ts
import { Preferences } from '@capacitor/preferences';

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const tokenStorage = {
  getToken: async () => (await Preferences.get({ key: TOKEN_KEY })).value,
  setToken: async (token: string) =>
    Preferences.set({ key: TOKEN_KEY, value: token }),
  removeToken: async () => Preferences.remove({ key: TOKEN_KEY }),
  getRefreshToken: async () =>
    (await Preferences.get({ key: REFRESH_KEY })).value,
  setRefreshToken: async (token: string) =>
    Preferences.set({ key: REFRESH_KEY, value: token }),
  removeRefreshToken: async () => Preferences.remove({ key: REFRESH_KEY }),
};
```

注意：Preferences API 是异步的，auth store 和拦截器中需用 `await`。

### 环境变量

```bash
# .env.development（浏览器调试用代理）
VITE_API_BASE=http://localhost:3000

# .env.production（移动端真机需完整地址）
VITE_API_BASE=https://api.example.com
```

## Capacitor 配置

`capacitor.config.json` 关键字段：

```json
{
  "appId": "com.example.app", // 改为实际 Bundle ID
  "appName": "my-mobile-app", // 应用显示名
  "webDir": ".output", // 构建产物目录
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": false
    }
  }
}
```

## 常用命令

| 命令                 | 说明                              |
| -------------------- | --------------------------------- |
| `pnpm dev`           | 浏览器中调试                      |
| `pnpm ios:build`     | 构建 + 同步到 iOS                 |
| `pnpm ios:open`      | 打开 Xcode                        |
| `pnpm ios`           | 构建 + 同步 + 打开 Xcode          |
| `pnpm android:build` | 构建 + 同步到 Android             |
| `pnpm android:open`  | 打开 Android Studio               |
| `pnpm android`       | 构建 + 同步 + 打开 Android Studio |

## 使用原生插件

模板已预装 `@capacitor/camera` 和 `@capacitor/splash-screen`。添加其他插件：

```bash
pnpm --filter my-mobile-app add @capacitor/geolocation
npx cap sync
```

## 注意事项

- 移动端不能使用 Vite 代理，生产环境 `VITE_API_BASE` 必须是完整的 HTTPS 地址
- `capacitor.config.json` 的 `webDir` 必须与 Vite 的 `outDir`（`.output`）一致
- iOS 发布需要 Apple Developer 账号 + Xcode 签名配置
- Android 发布需要签名 keystore 配置
