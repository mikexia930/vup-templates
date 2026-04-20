---
name: uniapp-app
description: >-
  Use when implementing features in uniapp-template projects (uni-app + Vue3).
  Covers uniapp-specific concerns: pages.json routing, conditional compilation,
  multi-platform APIs (H5/WeChat Mini/Alipay Mini/App), platform storage,
  lifecycle hooks. For cross-platform concerns shared with other stacks, load
  the corresponding capability skills.
---

# uniapp-app

基于 `uniapp-template` 的多端应用开发。**只管 uni-app 平台特有的事**。

## 适用场景

- 微信 / 支付宝 / 抖音小程序
- H5 移动端页面
- App（通过 uni-app 打包）
- 一套代码多端发布
- 对应目录：`apps/<uniapp-app>/`

## 何时被加载

- new-project Phase 7 选定 uniapp 栈
- new-feature 在 uniapp 项目中加功能
- maintenance 修 uniapp 项目 bug

## 引用的 capability skills

| 能力         | 加载哪个 skill                                   | uniapp 特殊说明                           |
| ------------ | ------------------------------------------------ | ----------------------------------------- |
| HTTP 请求    | ❌ **不用 http-client**                          | 基座未规定，需与用户确认方案              |
| Token 存储   | `token-storage`（uniapp.ts: uni.setStorageSync） |                                           |
| 登录 / 登出  | `auth-login`（流程通用，路由跳转用 uni API）     |                                           |
| 路由守卫     | ❌ **不用 auth-guard**                           | uni-app 无 vue-router，用 onShow / 拦截器 |
| API 文件组织 | `api-layer`（放 src/api/）                       |                                           |
| UI 组件      | 平台组件 / uView / Vant Weapp（需用户选）        |                                           |

## uni-app 平台特有约定

### 1. 路由：pages.json（非 vue-router）

uni-app 路由由 `pages.json` 声明式配置，**不使用 vue-router**：

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": { "navigationBarTitleText": "首页" }
    },
    {
      "path": "pages/login/index",
      "style": { "navigationBarTitleText": "登录" }
    }
  ],
  "tabBar": {
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/mine/index", "text": "我的" }
    ]
  }
}
```

页面跳转用 uni API：

```typescript
uni.navigateTo({ url: '/pages/user/detail?id=1' });
uni.redirectTo({ url: '/pages/login/index' });
uni.reLaunch({ url: '/pages/index/index' });
uni.switchTab({ url: '/pages/index/index' });
```

### 2. 路由守卫替代方案

uni-app 无 `beforeEach`。替代方案：

- **拦截器**（推荐）：`uni.addInterceptor('navigateTo', { invoke(args) { ... } })`
- **页面 onShow**：在需要登录的页面 onShow 里检查 token
- **混入 / composable**：抽取 `useAuthCheck()` 在页面 setup 调用

### 3. 条件编译（核心特性）

```typescript
// #ifdef MP-WEIXIN
// 仅微信小程序执行
wx.login({ ... });
// #endif

// #ifdef H5
// 仅 H5 执行
window.location.href = '...';
// #endif

// #ifndef APP-PLUS
// 非 App 环境执行
// #endif
```

平台标识：`H5` / `MP-WEIXIN` / `MP-ALIPAY` / `MP-TOUTIAO` / `APP-PLUS`

### 4. HTTP 请求

基座未规定 uni-app 的 HTTP 方案。需要与用户确认：

- **方案 A**：`uni.request` 封装（最通用，所有端都支持）
- **方案 B**：`luch-request`（第三方封装，类 axios API）
- **方案 C**：H5 端用 axios，小程序端用 `uni.request`（条件编译切换）

推荐 **方案 A**（最简单，避免多端兼容问题）。

### 5. 存储

```typescript
// 同步读写（推荐）
uni.setStorageSync('access_token', token);
const token = uni.getStorageSync('access_token');
uni.removeStorageSync('access_token');
```

详见 `token-storage` skill 的 uniapp.ts。

### 6. 生命周期

页面级（uni-app 特有）：

- `onLoad(options)` — 页面加载（接收路由参数）
- `onShow()` — 页面显示（含从后台切回）
- `onHide()` — 页面隐藏
- `onPullDownRefresh()` — 下拉刷新
- `onReachBottom()` — 触底加载

应用级：

- `onLaunch()` — App.vue 中，应用启动
- `onShow()` — App.vue 中，应用切前台

### 7. 目录结构

```
apps/<uniapp-app>/src/
├── App.vue                应用入口
├── main.ts                Vue 入口
├── manifest.json          应用配置（appid / 权限 / 平台配置）
├── pages.json             路由 + 页面配置
├── pages/                 页面目录
│   ├── index/
│   │   └── index.vue
│   └── login/
│       └── index.vue
├── static/                静态资源
├── locales/               国际化
└── uni.scss               全局样式变量
```

⚠️ uni-app 独立于 pnpm workspace，在应用目录内单独 `pnpm install`。

### 8. 环境变量

```bash
VITE_API_BASE=https://api.example.com
```

通过 `import.meta.env.VITE_*` 读取。

## 实现新页面的步骤

1. 与用户确认页面路径和目标平台（哪些端需要支持）
2. 在 `pages.json` 注册新页面
3. 创建 `src/pages/<name>/index.vue`
4. 如有平台差异，用条件编译处理
5. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **目标平台**：微信 / 支付宝 / 抖音 / H5 / App？哪些优先？
2. **HTTP 方案**：uni.request 封装 / luch-request / axios+条件编译？
3. **UI 框架**：平台原生组件 / uView / Vant Weapp / uni-ui？
4. **小程序登录**：微信 wx.login 授权还是自有账号体系？
5. **是否需要分包**：pages.json subPackages 配置？

## 产出位置

- 页面：`apps/<uniapp>/src/pages/<name>/index.vue`
- API：`apps/<uniapp>/src/api/<resource>.ts`
- 配置：`apps/<uniapp>/src/pages.json` + `manifest.json`

## 资源

```
uniapp-app/
└── SKILL.md            本文件
```

uni-app 官方文档：https://uniapp.dcloud.net.cn/
