---
name: vue-app
description: >-
  Guide for developing web applications using vue-template (Vue3 + Vite SPA).
  Use when creating admin panels, dashboards, web apps, or working in
  apps/vue-template, or when user mentions Vue SPA, Vue web application, or
  qiankun micro-frontend child app.
---

# Vue App 开发指南

基于 `apps/vue-template`，适用于管理后台、官网、Dashboard 等 Web
SPA 应用。支持作为 qiankun 微前端子应用。

## 快速开始

```bash
# 通过 vup-cli 添加
vup add my-admin

# 选择 vue 模板，完成后
pnpm install
pnpm --filter my-admin dev         # 默认端口 9301
```

## 目录结构

```
apps/my-admin/
├── src/
│   ├── main.ts                    # 入口（含 qiankun 兼容）
│   ├── App.vue
│   ├── router/
│   │   ├── index.ts               # createRouter 工厂函数
│   │   └── routes.ts              # 静态路由表
│   ├── views/
│   │   ├── login/index.vue        # 登录页（需自建）
│   │   └── <module>/
│   │       ├── Index.vue          # 页面组件
│   │       └── stores/<name>.ts   # 页面级 store
│   ├── stores/                    # 全局 store（auth、permission 等）
│   ├── api/
│   │   ├── request.ts             # axios 实例 + 拦截器
│   │   ├── types.ts               # ApiResponse 等类型
│   │   └── modules/               # 按业务模块拆分
│   ├── utils/
│   │   └── tokenStorage.ts        # Token 存储（localStorage）
│   ├── directives/                # 自定义指令（v-permission 等）
│   ├── locales/                   # i18n 语言包
│   └── assets/
├── vite.config.js
├── package.json
└── auto-imports.d.ts              # unplugin-auto-import 生成
```

## 平台特定实现

### HTTP 客户端：axios

参考 `patterns/api-layer`，本 app 使用 axios：

```typescript
// src/api/request.ts
import axios from 'axios';
import { tokenStorage } from '@/utils/tokenStorage';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
  timeout: 15000,
});

request.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request;
```

### Token 存储：localStorage

```typescript
// src/utils/tokenStorage.ts
const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const tokenStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  setRefreshToken: (token: string) => localStorage.setItem(REFRESH_KEY, token),
  removeRefreshToken: () => localStorage.removeItem(REFRESH_KEY),
};
```

### 开发代理

在 `vite.config.js` 中添加：

```javascript
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_BASE || 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

### 环境变量

```bash
# .env.development
VITE_API_BASE=http://localhost:3000

# .env.production
VITE_API_BASE=https://api.example.com
```

## 路由约定

- 路由工厂 `router(baseRoute)` 接受 base 参数，支持 qiankun 传入子路径
- 静态路由（登录页、404 等）写在 `routes.ts`
- 动态路由通过 `router.addRoute()` 注入（参考 `patterns/permission-rbac`）

## Store 约定

- 全局 store 放 `src/stores/`：`auth.ts`、`permission.ts`、`app.ts`
- 页面级 store 放 `src/views/<module>/stores/`
- 使用 Pinia 组合式写法（`defineStore('name', () => { ... })`）
- 由于配置了 `unplugin-auto-import`，`defineStore`、`ref`、`computed`
  等无需手动 import

## qiankun 微前端

模板默认包含 qiankun 子应用代码。若不需要微前端：

- 删除 `main.ts` 中 `vite-plugin-qiankun` 相关代码
- 删除 `vite.config.js` 中 `qiankun()` 插件
- `router/index.ts` 中 `baseRoute` 参数可简化为固定值

## 构建

```bash
pnpm --filter my-admin build       # 产物输出到 .output/
```

产物已配置 `manualChunks`：`vendor`（vue/router/pinia）和
`utils`（lodash-es/dayjs）自动拆包。
