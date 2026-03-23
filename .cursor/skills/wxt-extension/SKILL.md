---
name: wxt-extension
description: >-
  Guide for developing browser extensions using wxt-template (WXT + Vue3). Use
  when creating Chrome or Firefox extensions, or working in apps/wxt-template,
  or when user mentions browser extension, Chrome extension, or plugin.
---

# WXT 浏览器扩展开发指南

基于 `apps/wxt-template`，适用于 Chrome / Firefox 浏览器扩展开发。使用 WXT +
Vue3，Manifest V3。

## 快速开始

```bash
vup add my-extension

# 选择 wxt 模板，完成后
pnpm install
pnpm --filter my-extension dev              # Chrome 开发
pnpm --filter my-extension dev:firefox      # Firefox 开发
```

## 目录结构

```
apps/my-extension/
├── src/
│   ├── manifest.ts                # defineManifest — 扩展声明
│   ├── entrypoints/
│   │   ├── popup/                 # 弹出页（点击图标）
│   │   │   ├── main.ts
│   │   │   └── App.vue
│   │   ├── options/               # 选项页（设置）
│   │   │   ├── main.ts
│   │   │   └── App.vue
│   │   ├── newtab/                # 新标签页覆盖
│   │   │   ├── main.ts
│   │   │   └── App.vue
│   │   ├── background.ts         # Service Worker（后台脚本）
│   │   └── content.ts            # Content Script（注入网页）
│   └── assets/
├── wxt.config.ts                  # WXT 配置
└── package.json
```

## 入口点说明

| 入口            | 运行环境       | 用途                         |
| --------------- | -------------- | ---------------------------- |
| `popup/`        | 扩展弹出窗口   | 用户点击图标后显示的 UI      |
| `options/`      | 独立页面       | 扩展设置页                   |
| `newtab/`       | 新标签页       | 覆盖浏览器默认新标签页       |
| `background.ts` | Service Worker | 后台逻辑、事件监听、API 请求 |
| `content.ts`    | 网页上下文     | 操作网页 DOM、注入 UI        |

每个 Vue 入口点（popup/options/newtab）都是独立的 Vue 应用。

## Token 存储：browser.storage.local

```typescript
// src/utils/tokenStorage.ts
export const tokenStorage = {
  getToken: async () =>
    (await browser.storage.local.get('access_token')).access_token ?? null,
  setToken: async (token: string) =>
    browser.storage.local.set({ access_token: token }),
  removeToken: async () => browser.storage.local.remove('access_token'),
  getRefreshToken: async () =>
    (await browser.storage.local.get('refresh_token')).refresh_token ?? null,
  setRefreshToken: async (token: string) =>
    browser.storage.local.set({ refresh_token: token }),
  removeRefreshToken: async () => browser.storage.local.remove('refresh_token'),
};
```

`browser.storage.local` 在所有入口点（popup、background、content）间共享。

## 权限声明

在 `src/manifest.ts` 的 `permissions` 中声明所需权限：

```typescript
permissions: ['storage', 'activeTab', 'tabs'],
host_permissions: ['<all_urls>'],
```

添加新能力时需在此注册（如 `cookies`、`notifications`、`alarms` 等）。

## 常用命令

| 命令                 | 说明                        |
| -------------------- | --------------------------- |
| `pnpm dev`           | Chrome 开发模式             |
| `pnpm dev:firefox`   | Firefox 开发模式            |
| `pnpm build`         | Chrome 构建                 |
| `pnpm build:firefox` | Firefox 构建                |
| `pnpm zip`           | Chrome 打包（用于商店上传） |

## 消息通信模式

Content Script、Background、Popup 运行在不同上下文中，通过消息通信协作。

### 定义消息类型

```typescript
// src/utils/messages.ts
interface MessageMap {
  'get-page-info': { url: string; title: string };
  'fetch-data': { endpoint: string };
  'save-result': { data: any };
}

type MessageType = keyof MessageMap;
```

### Background 监听消息

```typescript
// src/entrypoints/background.ts
export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'fetch-data') {
      fetch(message.payload.endpoint)
        .then((res) => res.json())
        .then((data) => sendResponse({ success: true, data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true; // 表示异步响应
    }
  });
});
```

### Content Script 发送消息

```typescript
// src/entrypoints/content.ts
export default defineContentScript({
  matches: ['<all_urls>'],
  async main() {
    // 向 Background 发送消息
    const response = await browser.runtime.sendMessage({
      type: 'fetch-data',
      payload: { endpoint: 'https://api.example.com/data' },
    });
    console.log('收到响应:', response);
  },
});
```

### Popup 向 Content Script 发送消息

```typescript
// 在 popup 的 Vue 组件中
async function sendToContent() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    const response = await browser.tabs.sendMessage(tab.id, {
      type: 'highlight-text',
      payload: { color: 'yellow' },
    });
  }
}
```

### 通信方向总结

| 方向                         | API                                     |
| ---------------------------- | --------------------------------------- |
| Content / Popup → Background | `browser.runtime.sendMessage`           |
| Background → Content Script  | `browser.tabs.sendMessage(tabId, msg)`  |
| Popup → Content Script       | `browser.tabs.sendMessage(tabId, msg)`  |
| Content Script 监听          | `browser.runtime.onMessage.addListener` |
| Background 监听              | `browser.runtime.onMessage.addListener` |

## Content Script 注入 Vue 组件

在网页中渲染自定义 Vue UI（如浮动面板、侧边栏等）。

### 使用 WXT 的 createShadowRootUi

WXT 提供了 Shadow DOM 注入方案，避免样式污染：

```typescript
// src/entrypoints/content.ts
import { createApp } from 'vue';
import FloatingPanel from './components/FloatingPanel.vue';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'my-extension-panel',
      position: 'inline',
      anchor: 'body',
      append: 'last',
      onMount(container) {
        const app = createApp(FloatingPanel);
        app.mount(container);
        return app;
      },
      onRemove(app) {
        app?.unmount();
      },
    });
    ui.mount();
  },
});
```

### 注入的 Vue 组件

```vue
<!-- src/entrypoints/components/FloatingPanel.vue -->
<template>
  <div
    class="fixed right-4 bottom-4 z-[99999] w-80 rounded-lg border bg-white p-4 shadow-2xl"
  >
    <div class="mb-3 flex items-center justify-between">
      <h3 class="text-sm font-bold">My Extension</h3>
      <button
        class="text-gray-400 hover:text-gray-600"
        @click="visible = false"
      >
        ✕
      </button>
    </div>
    <div class="text-sm text-gray-700">
      <!-- 你的 UI 内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(true);
</script>

<style scoped>
/* 样式在 Shadow DOM 中隔离，不会影响宿主页面 */
</style>
```

### 样式隔离说明

- `cssInjectionMode: 'ui'` 让 WXT 自动将 CSS 注入 Shadow DOM
- Shadow DOM 内的样式不会泄漏到宿主页面，宿主页面的样式也不会影响注入的 UI
- 注入组件中**不能使用 Tailwind 的全局样式**（Shadow DOM 隔离），需要用 scoped
  CSS 或内联样式
- 若需要 Tailwind，需单独配置一份 Tailwind CSS 注入到 Shadow DOM 中

## 数据持久化

Background（Service Worker）随时可能被浏览器杀掉，所有需要持久化的数据必须用
`browser.storage`：

```typescript
// 存储设置
await browser.storage.local.set({ settings: { theme: 'dark', fontSize: 14 } });

// 读取设置
const { settings } = await browser.storage.local.get('settings');

// 监听变更（跨入口点同步）
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.settings) {
    console.log('设置已更新:', changes.settings.newValue);
  }
});
```

## 注意事项

- Content
  Script 和 Background 无法直接使用 Vue，仅 popup/options/newtab 是 Vue 应用（content 通过 Shadow
  DOM 注入例外）
- `browser.runtime.onMessage.addListener` 中若需异步响应，必须 `return true`
- Manifest V3 的 Background 是 Service Worker，无持久状态，需用
  `browser.storage` 存储
- Content Script 的 `matches` 决定在哪些网页上运行，按需配置避免权限过宽
- 上架 Chrome Web Store 前需 `pnpm zip` 打包
- WXT 开发服务端口默认 9306
