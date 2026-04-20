---
name: qiankun-app
description: >-
  Use when implementing the qiankun micro-frontend main app (master/base
  application). Covers sub-app registration, routing coordination, global state
  sharing, and lifecycle management. For sub-app development, use vue-app skill
  (which includes qiankun child compatibility).
---

# qiankun-app

基于 `qiankun-template` 的微前端主应用开发。**只管主应用（基座）的事**。

## 适用场景

- 微前端架构的主应用（注册 / 调度 / 通信）
- 对应目录：`apps/<qiankun-app>/`

## 与子应用的关系

- **本 skill**：主应用（注册子应用、路由协调、全局状态）
- **vue-app skill**：子应用（vue-template 默认支持 qiankun 子应用模式）

## 何时被加载

- new-project 选定微前端架构
- 注册新的子应用
- 调整主应用布局或路由

## qiankun 平台特有约定

### 1. 目录结构

```
apps/<qiankun-app>/src/
├── main.ts              入口（注册子应用）
├── App.vue              主应用壳
├── router/
│   └── index.ts         主应用路由
└── views/
    ├── Index.vue        首页 / 子应用容器
    ├── auto/
    │   └── Auto.vue     自动加载模式
    └── manual/
        └── Manual.vue   手动加载模式
```

### 2. 子应用注册

```typescript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'sub-app-1',
    entry: '//localhost:9301', // 子应用地址
    container: '#subapp-container', // 挂载 DOM
    activeRule: '/sub-app-1', // 激活路由
  },
]);

start();
```

### 3. 两种加载模式

| 模式               | 说明                                    | 适用场景           |
| ------------------ | --------------------------------------- | ------------------ |
| **自动（Auto）**   | `start()` 后根据 URL 自动匹配加载子应用 | 标准微前端         |
| **手动（Manual）** | `loadMicroApp()` 手动控制加载时机       | 需要精细控制的场景 |

### 4. 主应用路由

```typescript
const routes = [
  { path: '/', component: Index },
  // 子应用路由由 qiankun activeRule 接管，主应用不需要声明
  // 主应用只管自己的页面（首页、设置等）
];
```

**关键**：子应用的路由由子应用自己管理，主应用只负责：

- 提供挂载容器（`#subapp-container`）
- 配置 `activeRule`（URL 前缀匹配）

### 5. 主子应用通信

```typescript
import { initGlobalState } from 'qiankun';

// 主应用初始化全局状态
const actions = initGlobalState({ user: null, token: '' });

// 主应用监听变化
actions.onGlobalStateChange((state, prev) => {
  console.log('state changed:', state);
});

// 主应用修改状态
actions.setGlobalState({ user: { name: 'admin' } });
```

子应用在 `mount` 生命周期中接收 `props.onGlobalStateChange` 和
`props.setGlobalState`。

### 6. 样式隔离

```typescript
start({
  sandbox: {
    strictStyleIsolation: true, // Shadow DOM 隔离（严格）
    // 或
    experimentalStyleIsolation: true, // CSS Scoping（宽松）
  },
});
```

### 7. 构建

```bash
pnpm --filter <qiankun-app> dev    # 启动主应用
pnpm --filter <qiankun-app> build  # 构建
```

## 实现步骤

1. 与用户确认子应用清单（名称 / 入口地址 / 激活路由）
2. 在 `main.ts` 注册子应用
3. 在 `App.vue` 提供子应用挂载容器
4. 配置主应用路由（仅主应用自己的页面）
5. 如需通信，初始化全局状态
6. 每完成一步 Gate 一次

## 关键决策点（AI 必须问用户）

1. **子应用清单**：有哪些子应用？各自的入口地址和激活路由？
2. **加载模式**：自动加载还是手动加载？
3. **样式隔离**：strictStyleIsolation 还是 experimentalStyleIsolation？
4. **主子通信**：是否需要共享全局状态（用户信息 / token）？
5. **主应用是否有自己的页面**：还是纯容器（只负责调度子应用）？

## 产出位置

- 主应用入口：`apps/<qiankun>/src/main.ts`
- 路由：`apps/<qiankun>/src/router/index.ts`
- 容器页面：`apps/<qiankun>/src/views/`

## 资源

```
qiankun-app/
└── SKILL.md            本文件
```

qiankun 官方文档：https://qiankun.umijs.org/
