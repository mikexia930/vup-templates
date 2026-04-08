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

按业务模块聚合，每个模块可独立剥离（参考 `module-structure` rule）：

```
apps/my-admin/
├── src/
│   ├── main.ts                    # 入口（含 qiankun 兼容）
│   ├── App.vue
│   ├── router/
│   │   ├── index.ts               # createRouter 工厂函数
│   │   └── routes.ts              # 静态路由 + 动态路由注册
│   ├── layouts/
│   │   └── AdminLayout.vue        # 后台布局
│   ├── modules/                   # 业务模块（按功能聚合）
│   │   ├── user/                  # 用户管理模块
│   │   │   ├── views/
│   │   │   ├── components/
│   │   │   ├── stores/
│   │   │   ├── api/
│   │   │   └── types/
│   │   ├── order/                 # 订单模块
│   │   │   ├── ...
│   │   └── dashboard/             # 首页模块
│   │       ├── ...
│   ├── shared/                    # 跨模块共享
│   │   ├── components/
│   │   ├── composables/
│   │   └── utils/
│   │       └── tokenStorage.ts    # Token 存储（localStorage）
│   ├── stores/                    # 全局 store（仅 auth、permission、app）
│   ├── api/
│   │   ├── request.ts             # axios 实例 + 拦截器
│   │   └── types.ts               # ApiResponse 等通用类型
│   ├── directives/                # 全局指令（v-permission 等）
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
import { tokenStorage } from '@/shared/utils/tokenStorage';

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

#### 请求治理建议（SPA 高频交互重点）

- 搜索、筛选、分页切换等查询请求优先 `mode: 'takeLatest'`
- 写请求保持 `mode: 'parallel'`，避免误取消造成状态歧义
- 高频触发必须加防抖/节流，避免无意义请求风暴
- `ERR_CANCELED` 默认静默处理，不作为用户可见异常
- 首次进入页面可用全局 loading 预取关键稳定数据，首次后切换为局部 loading
- 全局 loading 需有退出条件和超时兜底，避免整页长期被遮挡
- 对字典、列表、详情等读请求，按业务设置缓存（含 TTL 与失效策略）

### Token 存储：localStorage

```typescript
// src/shared/utils/tokenStorage.ts
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

- 全局 store 放 `src/stores/`：仅限 `auth.ts`、`permission.ts`、`app.ts`
- 业务 store 放模块内 `src/modules/<name>/stores/`
- 命名：`use*Store`（如 `useUserStore`）
- 使用 Pinia 组合式写法（`defineStore('name', () => { ... })`）
- `defineStore`、`ref`、`computed` 等无需手动 import（auto-import 已配置）

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
