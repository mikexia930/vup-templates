# Mock Example

`examples/mock` 是一个只演示 `@vup/mock` 的最小 Vue 示例。

可通过 `vup example mock` 获取或查看该参考示例。

## 说明

- 开发环境下会启动 MSW worker
- 示例页面会请求 `/api/template-demo/tasks`
- 你可以切换“Force error response”来验证错误分支

## 启动

```bash
pnpm --filter example-mock dev
```

默认端口：`9391`

## 关键文件

- `src/main.ts`：启动 `@vup/mock/browser`
- `src/views/IntroPage.vue`：单页介绍与真实 mock 请求示例
- `public/mockServiceWorker.js`：MSW 浏览器 worker 文件
