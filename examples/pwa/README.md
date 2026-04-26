# PWA Example

`examples/pwa` 是一个只演示 `@vup/pwa` 的最小 Vue 示例。

可通过 `vup example pwa` 获取或查看该参考示例。

## 说明

- 构建时会生成 `manifest.webmanifest`、`sw.js`
- 生产环境启动时会注册 service worker
- 默认使用 `@vup/pwa`
  约定的图标路径：`public/pwa/icon-192.png`、`public/pwa/icon-512.png`、`public/pwa/icon-512-maskable.png`
- 页面只保留一个介绍路由，用来说明这层能力的定位

## 启动

```bash
pnpm --filter example-pwa dev
```

默认端口：`9392`

注意：开发模式默认不会注册 PWA，因此通常看不到浏览器安装入口。请使用构建产物预览验证：

```bash
pnpm --filter example-pwa build
pnpm --filter example-pwa preview -- --host 0.0.0.0 --port 9392
```

若浏览器仍未显示安装入口，请优先检查：

- 当前访问地址是否为 `localhost` / `127.0.0.1` 或 HTTPS
- 局域网 `http://192.168.*`、`http://10.*`、`http://172.*`
  这类地址通常不属于安全上下文，浏览器不会注册 `service worker`
- `Application` 面板里是否已注册 `service worker`
- `manifest.webmanifest` 中的图标资源是否都能正常访问

## 关键文件

- `vite.config.js`：通过 `createVupPwaPlugin()` 接入 PWA
- `src/main.ts`：生产环境下注册 `@vup/pwa/runtime`
- `src/views/IntroPage.vue`：单页说明
