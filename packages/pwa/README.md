# @vup/pwa

`@vup/pwa` 是给 vup
templates 准备的一层 PWA 能力包，定位是“接入层”，不是完整 app 框架。

它主要做两件事：

- 对 `vite-plugin-pwa` 做一层封装，让 app template 只依赖 `@vup/pwa`
- 提供一份可复用的 PWA 配置预设和运行时助手，方便 `vue-template` 之类的模板接入
- 提供一组轻量运行时助手，统一处理 `service worker`
  注册、更新提示、激活等待中的新版本

## 设计边界

- **它增强现有 app template**，而不是替代 `vue-template` / `nuxt-template`
- **默认只处理静态资源缓存思路**，不默认缓存业务 API
- **运行时 API 尽量轻量**，避免把业务状态和离线同步逻辑塞进基础包

## 导出能力

- `createVupPwaPlugin()`：直接返回已封装好的 Vite PWA 插件
- `createVupPwaPreset()`：生成一份可交给 `vite-plugin-pwa` 的默认配置对象
- `createVupManifest()`：生成 Web App Manifest
- `registerVupPwa()`：注册 service worker
- `updateVupPwa()`：主动检查更新
- `activateWaitingVupPwa()`：通知等待中的新版本立即接管
- `getVupPwaState()`：读取当前页面的 PWA 基础状态

## 使用方式

### 1. 在 Vite 配置里直接接入

```ts
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { createVupPwaPlugin } from '@vup/pwa';

export default defineConfig({
  plugins: [
    vue(),
    createVupPwaPlugin({
      appName: 'VUP Vue App',
      shortName: 'VUP',
      description: 'Vue template with optional PWA capability',
    }),
  ],
});
```

如果需要覆盖底层 `vite-plugin-pwa` 配置，可以通过 `overrides` 透传。

### 2. 在应用入口注册

```ts
import { registerVupPwa } from '@vup/pwa/runtime';

await registerVupPwa({
  onOfflineReady() {
    console.info('[pwa] offline ready');
  },
  onNeedRefresh() {
    console.info('[pwa] new version available');
  },
});
```

### 3. 在发现新版本时触发更新

```ts
import { activateWaitingVupPwa, updateVupPwa } from '@vup/pwa/runtime';

const registration = await registerVupPwa();

await updateVupPwa(registration);
await activateWaitingVupPwa(registration);
window.location.reload();
```

## 默认策略建议

- 默认缓存静态资源，不默认缓存 API
- 开发环境默认关闭 PWA 能力，避免调试被缓存干扰
- 生产环境通过 UI 提示用户刷新进入新版本
- 登录态、权限页、用户私有数据保持保守策略

## 后续可扩展方向

- 补充和 `vite-plugin-pwa` 对应的更细粒度 runtime caching preset
- 提供更新提示组件示例
- 为 `vue-template` 增加一个可选 `with-pwa` 接入示例
