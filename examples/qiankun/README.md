# qiankun Example

`examples/qiankun` 是 qiankun 子应用接入示例，用于配合 `apps/qiankun-template`
验证挂载、路由 base、状态下发和子应用上报。

## 说明

- 保留 `renderWithQiankun()` 和子应用生命周期
- 独立运行时展示 standalone 页面
- 被基座挂载时，根据 `props.mode` 渲染自动加载页或手动加载页
- 通过 `props.onGlobalStateChange()` 接收基座状态
- 通过 `props.setGlobalState()` 上报子应用交互
- 不再混入 mock、PWA、UI demo 逻辑

## 启动

```bash
pnpm --filter example-qiankun dev
```

默认端口：`9393`

如果你用宿主应用联调这个子应用，请把宿主里的 `entry` 指向
`http://localhost:9393`。该端口已经和正式模板 `apps/qiankun-template` 的 `9307`
错开，避免本地调试时冲突。

## 关键文件

- `vite.config.js`：通过 `vite-plugin-qiankun` 注册子应用
- `src/main.ts`：处理独立运行和被宿主挂载两种入口
- `src/qiankun/state.ts`：保存基座传入状态和上报方法
- `src/views/IntroPage.vue`：独立运行页面
- `src/views/AutoPage.vue`：自动加载模式页面
- `src/views/ManualPage.vue`：手动加载模式页面
