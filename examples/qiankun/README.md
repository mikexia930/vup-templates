# qiankun Example

`examples/qiankun` 是一个只演示 qiankun 子应用接入的最小 Vue 示例。

## 说明

- 保留 `renderWithQiankun()` 和子应用生命周期
- 保留一个单页路由，方便独立运行和被宿主挂载时都能看清状态
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
- `src/views/IntroPage.vue`：展示当前是否运行在 qiankun 环境
