---
name: capacitor-app
description: >-
  Use when implementing features in capacitor-template projects (Capacitor +
  Vue3 + Ionic Vue). Covers capacitor-specific concerns: native plugins, Ionic
  Router, platform detection, iOS/Android build, PrivacyInfo.xcprivacy. For
  cross-platform concerns, load the corresponding capability skills.
---

# capacitor-app

基于 `capacitor-template` 的移动端应用开发。**只管 Capacitor 平台特有的事**。

## 适用场景

- iOS / Android 原生打包应用
- PWA fallback
- 对应目录：`apps/<capacitor-app>/`

## 何时被加载

- new-project Phase 7 选定 capacitor 栈
- new-feature 在 capacitor 项目中加功能
- maintenance 修移动端 bug

## 引用的 capability skills

| 能力         | 加载哪个 skill                                          | Capacitor 特殊说明     |
| ------------ | ------------------------------------------------------- | ---------------------- |
| HTTP 请求    | `http-client`（@vup/http）                              |                        |
| Token 存储   | `token-storage`（capacitor.ts: @capacitor/preferences） | **必须用 Preferences** |
| 登录 / 登出  | `auth-login`                                            |                        |
| 路由守卫     | `auth-guard`（vue-router beforeEach）                   |                        |
| API 文件组织 | `api-layer`                                             |                        |
| UI 组件      | `vup-ui`（@vup/ui-mobile，VM\* 前缀）                   |                        |

## Capacitor 平台特有约定

### 1. 路由：Ionic Router

必须使用 `@ionic/vue-router`，不能用普通 `vue-router`：

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import routes from './routes';

export default createRouter({
  history: createWebHistory(),
  routes,
});
```

页面容器用 `<VMRouterOutlet>` 而非 `<RouterView>`。

### 2. 原生插件

基座已集成：

- `@capacitor/core` — 核心
- `@capacitor/preferences` — 持久化存储（**token 必须用这个**）
- `@capacitor/camera` — 相机
- `@capacitor/splash-screen` — 启动画面

使用方式：

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const photo = await Camera.getPhoto({
  resultType: CameraResultType.Uri,
  quality: 90,
});
```

新增插件流程：

1. `pnpm --filter <app> add @capacitor/<plugin>`
2. `npx cap sync`
3. 在代码中 import 使用

### 3. 平台判断

```typescript
import { Capacitor } from '@capacitor/core';

// 当前平台
const platform = Capacitor.getPlatform(); // 'ios' | 'android' | 'web'

// 是否原生环境
const isNative = Capacitor.isNativePlatform();

// 某插件是否可用
const hasCamera = Capacitor.isPluginAvailable('Camera');
```

### 4. iOS 隐私合规（PrivacyInfo.xcprivacy）

使用 `@capacitor/preferences` 时，必须在 `ios/App/PrivacyInfo.xcprivacy` 声明：

- key: `NSPrivacyAccessedAPICategoryUserDefaults`
- reason: `CA92.1`

**2024 年 5 月起 App Store 强制要求。**

### 5. Token 存储（重要）

⚠️ **移动端禁止用 localStorage 存 token**

原因：iOS /
Android 系统会在内存压力下主动清理 localStorage，导致用户登录态丢失。

必须使用 `@capacitor/preferences`（详见 `token-storage`
skill 的 capacitor.ts）。基座已完成接入（`src/api/request.ts` +
`src/main.ts`）。

### 6. 构建 & 调试

```bash
# 开发（浏览器预览）
pnpm --filter <app> dev

# 同步到原生项目
npx cap sync

# 在 Xcode / Android Studio 打开
npx cap open ios
npx cap open android

# 实机调试
npx cap run ios --target=<device-id>
npx cap run android --target=<device-id>
```

### 7. 环境变量

```bash
VITE_API_BASE=https://api.example.com
```

通过 `import.meta.env.VITE_*` 读取（与 vue-app 一致）。

## 实现新功能的步骤

1. 确认功能是否需要原生能力（相机 / 定位 / 推送 ...）
2. 需要原生能力 → 安装对应 Capacitor 插件 + `cap sync`
3. UI 使用 `VM*` 组件（Ionic Vue）
4. 路由用 `@ionic/vue-router`
5. 业务代码结构同 vue-app（modules / stores / api）
6. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **目标平台**：iOS / Android / 两者都要？
2. **需要哪些原生能力**：相机 / 定位 / 推送 / 文件系统 / 生物识别？
3. **是否需要 PWA fallback**：网页端也能访问？
4. **推送方案**：Firebase (Android) / APNs (iOS) / 第三方（极光 / 个推）？

## 产出位置

- 业务代码：`apps/<capacitor>/src/modules/<name>/`
- 原生配置：`ios/` 和 `android/`（`cap sync` 自动同步）
- 插件桥接：直接 import Capacitor 插件，无需额外桥接层

## 资源

```
capacitor-app/
└── SKILL.md            本文件
```

Capacitor 官方文档：https://capacitorjs.com/docs Ionic
Vue 官方文档：https://ionicframework.com/docs/vue/overview
