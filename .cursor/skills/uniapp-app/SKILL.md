---
name: uniapp-app
description: >-
  Guide for developing multi-platform apps using uniapp-template (uni-app +
  Vue3). Use when creating WeChat mini programs, Alipay mini programs, H5, or
  native apps, or working in apps/uniapp-template, or when user mentions
  uni-app, mini program, or 小程序.
---

# uni-app 开发指南

基于
`apps/uniapp-template`，适用于微信/支付宝/百度等小程序、H5、App 多端开发。使用 uni-app +
Vue3 + Vite。

## 快速开始

```bash
vup add my-miniapp

# 选择 uniapp 模板，完成后
cd apps/my-miniapp && pnpm install   # 独立安装（不在 workspace 中）
pnpm dev                              # H5 开发
pnpm dev:mp-weixin                     # 微信小程序开发
```

## 重要：独立于 workspace

`uniapp-template` 被 `pnpm-workspace.yaml`
排除（`!apps/uniapp-*`），原因是 uni-app 的依赖版本与主 workspace 冲突。因此：

- 必须在应用目录内独立执行 `pnpm install`
- 不能通过 `pnpm --filter` 从根目录运行命令
- 不能引用 workspace 内的 `@vup/*` 包

## 目录结构

```
apps/my-miniapp/
├── src/
│   ├── main.ts                    # createSSRApp 入口
│   ├── App.vue                    # 根组件（onLaunch / onShow）
│   ├── pages.json                 # 页面路由 + 导航栏配置
│   ├── manifest.json              # 应用配置（appid、权限等）
│   ├── uni.scss                   # 全局 SCSS 变量
│   ├── pages/
│   │   ├── index/index.vue        # 首页
│   │   ├── login/index.vue        # 登录页（需自建）
│   │   └── <module>/index.vue
│   ├── components/                # 公共组件（easycom 自动注册）
│   ├── stores/                    # Pinia store
│   ├── api/
│   │   ├── request.ts             # uni.request 封装
│   │   ├── types.ts
│   │   └── modules/
│   ├── utils/
│   │   └── tokenStorage.ts        # uni.setStorageSync
│   ├── locales/                   # i18n 语言包
│   └── static/                    # 静态资源（不编译）
└── package.json
```

## 与 Vue SPA 的关键差异

| 方面       | vue-template  | uniapp-template                                  |
| ---------- | ------------- | ------------------------------------------------ |
| 路由       | vue-router    | **pages.json** 声明式路由                        |
| 导航       | `router.push` | **`uni.navigateTo`** / `uni.redirectTo`          |
| HTTP       | axios         | **uni.request**                                  |
| Token 存储 | localStorage  | **uni.setStorageSync**                           |
| 生命周期   | Vue 生命周期  | Vue + **onLoad / onShow / onReady** 页面生命周期 |
| 组件       | HTML 标签     | **uni 组件**（`<view>` / `<text>` / `<image>`）  |
| 条件编译   | 无            | **`#ifdef MP-WEIXIN`** 等                        |
| 入口       | createApp     | **createSSRApp**                                 |

## 平台特定实现

### HTTP 客户端：uni.request

```typescript
// src/api/request.ts
import { tokenStorage } from '@/utils/tokenStorage';
import type { ApiResponse } from '@/api/types';

const BASE_URL = 'https://api.example.com';

export function request<T = any>(
  options: UniApp.RequestOptions
): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    const token = tokenStorage.getToken();
    uni.request({
      ...options,
      url: BASE_URL + options.url,
      header: {
        ...options.header,
        Authorization: token ? `Bearer ${token}` : '',
      },
      success: (res) => {
        if (res.statusCode === 401) {
          tokenStorage.removeToken();
          uni.reLaunch({ url: '/pages/login/index' });
          return reject(new Error('Unauthorized'));
        }
        resolve(res.data as ApiResponse<T>);
      },
      fail: (err) => {
        uni.showToast({ title: '网络错误', icon: 'none' });
        reject(err);
      },
    });
  });
}

export const get = <T>(url: string, data?: any) =>
  request<T>({ url, method: 'GET', data });
export const post = <T>(url: string, data?: any) =>
  request<T>({ url, method: 'POST', data });
```

### Token 存储：uni.setStorageSync

```typescript
// src/utils/tokenStorage.ts
const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const tokenStorage = {
  getToken: () => uni.getStorageSync(TOKEN_KEY) || null,
  setToken: (token: string) => uni.setStorageSync(TOKEN_KEY, token),
  removeToken: () => uni.removeStorageSync(TOKEN_KEY),
  getRefreshToken: () => uni.getStorageSync(REFRESH_KEY) || null,
  setRefreshToken: (token: string) => uni.setStorageSync(REFRESH_KEY, token),
  removeRefreshToken: () => uni.removeStorageSync(REFRESH_KEY),
};
```

### 路由导航

uni-app 不使用 vue-router，页面在 `pages.json` 中注册，导航用 uni API：

```typescript
// 跳转（保留当前页）
uni.navigateTo({ url: '/pages/detail/index?id=1' });

// 跳转（关闭当前页）
uni.redirectTo({ url: '/pages/login/index' });

// 跳转到 tabBar 页
uni.switchTab({ url: '/pages/index/index' });

// 重启应用跳转
uni.reLaunch({ url: '/pages/login/index' });
```

## 常用命令

| 命令                   | 平台           |
| ---------------------- | -------------- |
| `pnpm dev`             | H5             |
| `pnpm dev:mp-weixin`   | 微信小程序     |
| `pnpm dev:mp-alipay`   | 支付宝小程序   |
| `pnpm build:h5`        | H5 构建        |
| `pnpm build:mp-weixin` | 微信小程序构建 |

## 条件编译

跨平台差异通过条件编译处理：

```vue
<!-- #ifdef MP-WEIXIN -->
<button open-type="getPhoneNumber">微信授权登录</button>
<!-- #endif -->

<!-- #ifdef H5 -->
<button @click="login">账号密码登录</button>
<!-- #endif -->
```

```typescript
// #ifdef MP-WEIXIN
wx.login({
  success: (res) => {
    /* ... */
  },
});
// #endif
```

## 注意事项

- 独立于 workspace，不能引用 `@vup/*` 包，公共逻辑需拷贝或发布到 npm
- 小程序端不支持 DOM 操作、window/document 等浏览器 API
- 使用 `<view>` / `<text>` 等 uni 组件替代 HTML 标签
- `pages.json` 中的第一个页面是应用首页
- 小程序包大小限制：主包 2MB，分包 2MB（微信）
