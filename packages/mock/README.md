# @vup/mock

基于 MSW 的共享 mock 包，用于模板项目在开发/测试阶段模拟后端接口。默认包含：

- 浏览器侧 `setupWorker` 启动封装（`src/browser.ts`）
- Node 侧 `setupServer` 启动封装（`src/node.ts`）
- 可复用的 handlers 入口（`src/handlers/`）

## 包定位

- **统一 mock 入口**，避免每个 app 重复造轮子。
- **网络层拦截**，尽量贴近真实请求路径，业务代码仍走原有 `fetch` / 请求客户端。
- **同一套 handlers** 可在浏览器与 Node（测试等）复用。

## 在应用中启用

```ts
import { startMockWorker } from '@vup/mock/browser';

if (import.meta.env.DEV) {
  await startMockWorker();
}
```

应用侧需已通过 `msw init public`（或等价方式）生成
`public/mockServiceWorker.js`，具体开关与接口前缀以各模板 README 为准（如
`VITE_ENABLE_MOCK`）。

## 常用命令

```bash
pnpm build
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## 目录结构

```txt
packages/mock/
├── src/
│   ├── handlers/
│   │   ├── index.ts              # handlers 聚合导出
│   │   └── demo.ts               # 示例域 handler
│   ├── browser.ts                # 浏览器 Worker 启动
│   ├── node.ts                   # Node Server 启动
│   └── index.ts                  # 包入口
├── package.json
└── README.md
```

## 文档地址

### 框架与相关技术

- [MSW](https://mswjs.io/)
- [MSW 文档](https://mswjs.io/docs/)
- [MSW GitHub](https://github.com/mswjs/msw)
- [Service Worker API（MDN）](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

### 项目内相关文档

- [根目录 README](../../README.md)
- [vue-template README](../../apps/vue-template/README.md)（应用侧接入与
  `VITE_ENABLE_MOCK` 等约定）
- [@vup/http 文档](../http/README.md)
- [@vup/ui 文档](../ui/README.md)
