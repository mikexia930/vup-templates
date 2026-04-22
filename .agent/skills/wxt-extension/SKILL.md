---
name: wxt-extension
description: >-
  Use when implementing features in wxt-template projects (WXT + Vue3 browser
  extension). Covers wxt-specific concerns: entrypoints
  (background/popup/content/options/newtab), manifest permissions,
  browser.storage, cross-context messaging, content script injection. For
  cross-platform concerns, load the corresponding capability skills.
---

# wxt-extension

基于 `wxt-template` 的浏览器扩展开发。**只管 WXT 平台特有的事**。

## 适用场景

- Chrome / Firefox / Edge 浏览器扩展
- 对应目录：`apps/<wxt-extension>/`

## 何时被加载

- new-project Phase 7 选定 wxt 栈
- new-feature 在浏览器扩展中加功能
- maintenance 修扩展 bug

## 引用的 capability skills

| 能力         | 加载哪个 skill                                   | WXT 特殊说明               |
| ------------ | ------------------------------------------------ | -------------------------- |
| HTTP 请求    | `http-client`（按需引入 @vup/http）              |                            |
| Token 存储   | `token-storage`（wxt.ts: browser.storage.local） | **必须用 browser.storage** |
| 登录 / 登出  | `auth-login`                                     |                            |
| 登录态同步   | `auth-guard`（wxt-context-sync.ts）              | 跨 context 同步            |
| API 文件组织 | `api-layer`                                      |                            |

## WXT 平台特有约定

### 1. Entrypoints（核心概念）

WXT 用 entrypoints 目录组织各 context 入口：

```
src/entrypoints/
├── background.ts          Service Worker（常驻后台）
├── popup/                 点击图标弹出面板
│   ├── main.ts
│   ├── App.vue
│   └── index.html
├── options/               扩展设置页
│   ├── main.ts
│   ├── App.vue
│   └── index.html
├── newtab/                新标签页
│   ├── main.ts
│   ├── App.vue
│   └── index.html
└── content.ts             内容脚本（注入到网页）
```

每个 entrypoint 是**独立的运行环境**，内存不共享。

### 2. Context 差异

| Context    | 环境           | localStorage | DOM       | Vue | 常驻             |
| ---------- | -------------- | ------------ | --------- | --- | ---------------- |
| background | Service Worker | ❌           | ❌        | ❌  | ✅               |
| popup      | 浏览器弹窗     | ✅           | ✅        | ✅  | ❌（关闭即销毁） |
| options    | 独立页面       | ✅           | ✅        | ✅  | ❌               |
| newtab     | 新标签页       | ✅           | ✅        | ✅  | ❌               |
| content    | 宿主网页       | ⚠️ 宿主的    | ✅ 宿主的 | ❌  | ❌               |

**关键限制**：

- background（Service Worker）**没有 localStorage**，必须用 `browser.storage`
- content script 的 localStorage 是**宿主网页**的，不是扩展的
- popup 关闭后内存销毁，下次打开要重新初始化

### 3. 跨 Context 通信

```typescript
import { browser } from 'wxt/browser';

// 任何 context → background
browser.runtime.sendMessage({ type: 'do-something', payload: {} });

// background 监听
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'do-something') { ... }
});

// background → content（指定 tab）
browser.tabs.sendMessage(tabId, { type: 'inject-data', data: {} });

// content 监听
browser.runtime.onMessage.addListener((message) => { ... });
```

推荐模式：

- HTTP 请求统一从 **background** 发（避免 CORS 问题）
- popup / options 通过 `sendMessage` 向 background 请求数据
- 或各 context 直接发请求（扩展有 `host_permissions` 跨域权限）

### 4. Manifest 权限

在 `wxt.config.ts` 配置：

```typescript
export default defineConfig({
  manifest: {
    permissions: [
      'storage', // browser.storage
      'activeTab', // 当前 tab 操作
      'tabs', // tab 信息查询
    ],
    host_permissions: [
      'https://api.example.com/*', // API 跨域
    ],
  },
});
```

**原则**：只申请需要的权限，不要过度申请（影响审核）。

### 5. Token 存储（重要）

⚠️ **扩展禁止用 localStorage 存 token**

原因：

- Service Worker 没有 localStorage
- popup 关闭后 localStorage 可能不持久
- 多 context 需要共享 token

必须使用 `browser.storage.local`（详见 `token-storage`
skill 的 wxt.ts）。每个 entrypoint 入口需 `await syncTokenFromStorage()`。

### 6. Content Script

```typescript
// src/entrypoints/content.ts
export default defineContentScript({
  matches: ['https://example.com/*'],
  main() {
    // 注入到匹配的网页中执行
    console.log('Content script loaded on', window.location.href);

    // 与 background 通信
    browser.runtime.sendMessage({
      type: 'page-loaded',
      url: window.location.href,
    });
  },
});
```

### 7. 构建

```bash
pnpm --filter <wxt-extension> dev              # 开发模式（自动重载）
pnpm --filter <wxt-extension> dev:firefox      # Firefox 开发
pnpm --filter <wxt-extension> build            # Chrome 构建
pnpm --filter <wxt-extension> build:firefox    # Firefox 构建
pnpm --filter <wxt-extension> zip              # 打包 zip（上传商店）
```

产物在 `.output/` 目录。

## 实现新功能的步骤

1. 确认功能在哪个 context（background / popup / content / options）
2. 如需新 entrypoint → 在 `src/entrypoints/` 创建
3. 如需新权限 → 在 `wxt.config.ts` 的 manifest 中添加
4. 如涉及跨 context 数据 → 用 `browser.storage` + `sendMessage`
5. popup / options 的 Vue 代码按 vue-app 标准
6. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **需要哪些 entrypoints**：popup / options / newtab / content / background？
2. **content script 注入范围**：哪些网站？`matches` 怎么配？
3. **HTTP 请求从哪发**：background 统一发（推荐）还是各 context 各自发？
4. **目标浏览器**：Chrome / Firefox / Edge？（manifest v3 vs v2 差异）
5. **需要哪些权限**：storage / tabs / activeTab / notifications / ...？

## 产出位置

- Entrypoints：`apps/<wxt>/src/entrypoints/`
- 共享代码：`apps/<wxt>/src/composables/` + `src/common/`
- 静态资源：`apps/<wxt>/public/`
- 配置：`apps/<wxt>/wxt.config.ts`

## 资源

```
wxt-extension/
└── SKILL.md            本文件
```

WXT 官方文档：https://wxt.dev/ Chrome
Extensions 文档：https://developer.chrome.com/docs/extensions/
