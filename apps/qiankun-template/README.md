# Qiankun Template

基于 Vue 3 + Vite +
qiankun 的微前端主应用模板。这个模板只负责基座能力：注册子应用、路由调度、挂载容器、生命周期观察、全局状态通信和样式隔离。

## 技术栈

- Vue 3
- Vite
- Vue Router
- qiankun
- Tailwind CSS + `_shared/assets/styles/theme`

`vite-plugin-qiankun` 主要用于子应用适配；当前主应用通过 `qiankun`
注册和调度子应用。

## 快速开始

启动主应用：

```bash
pnpm --dir apps/qiankun-template dev
```

默认地址：

```txt
http://localhost:9307
```

启动测试子应用：

```bash
pnpm --dir examples/qiankun dev
```

默认地址：

```txt
http://localhost:9393
```

主应用默认把子应用 entry 指向 `http://localhost:9393`。如需替换：

```bash
VITE_QIANKUN_CHILD_ENTRY=http://localhost:9393 pnpm --dir apps/qiankun-template dev
```

## Demo 入口

- `/auto/`：通过 `registerMicroApps()` + `activeRule` 自动加载子应用
- `/manual/`：通过 `loadMicroApp()` 手动加载子应用，离开页面时主动 `unmount()`

页面中会展示：

- 子应用注册信息：`name`、`entry`、`container`、`activeRule`
- 生命周期日志：`beforeLoad`、`beforeMount`、`afterMount`、`beforeUnmount`、`afterUnmount`
- 基座全局状态：通过 `initGlobalState()` 广播给子应用
- 子应用上报：子应用通过 `props.setGlobalState()` 把交互事件回传给基座
- 样式隔离策略：当前使用 `experimentalStyleIsolation`

## 目录结构

```txt
apps/qiankun-template/
├── src/
│   ├── micro/
│   │   ├── config.ts        # 子应用 entry、container、activeRule
│   │   └── state.ts         # 基座状态、全局通信、生命周期日志
│   ├── router/
│   │   └── index.ts         # 主应用路由
│   ├── views/
│   │   ├── auto/Index.vue   # 自动加载容器
│   │   └── manual/Index.vue # 手动加载容器
│   ├── App.vue              # 基座壳和控制台
│   └── main.ts              # 注册子应用、启动 qiankun
├── index.html
├── vite.config.js
└── README.md
```

## 微前端模型

qiankun 基座本身是一个普通 Vue 应用。它提供页面壳、导航、权限、状态和挂载容器；子应用通过 qiankun 生命周期挂载到指定 DOM 节点。

它不是 iframe。iframe 会创建独立文档环境；qiankun 会拉取子应用资源，在当前页面中按生命周期挂载和卸载，因此主子应用可以共享路由上下文、全局状态和更统一的用户体验。

## 子应用要求

子应用需要支持 qiankun 生命周期。`examples/qiankun` 已经提供最小实现：

```ts
renderWithQiankun({
  bootstrap() {},
  mount(props) {
    // mount Vue app into props.container
  },
  unmount() {
    // app.unmount()
  },
  update() {},
});
```

主应用会传入：

- `baseRoute`：子应用路由 base
- `host`：来源基座
- `mode`：`auto` 或 `manual`

`examples/qiankun` 会根据 `mode` 渲染不同页面：

- 自动加载：渲染自动加载子页面
- 手动加载：渲染手动加载子页面

子应用通过 `props.onGlobalStateChange(callback, true)` 接收基座状态，通过
`props.setGlobalState({ childReport })`
上报交互事件。基座右侧面板会展示最近一次子应用上报。

## 构建

```bash
pnpm --dir apps/qiankun-template build
```

产物输出到 `.output/`。

## 开发建议

- 子应用清单集中放在 `src/micro/config.ts`
- 生命周期和通信状态集中放在 `src/micro/state.ts`
- 主应用只声明自己的路由，子应用内部路由交给子应用管理
- 手动加载时必须在页面卸载时调用 `microApp.unmount()`
- 样式优先使用 Tailwind CSS 和 `_shared/assets/styles/theme` 语义 token
- 主应用与子应用可以独立部署，生产环境只需要替换子应用 `entry`
