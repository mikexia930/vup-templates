# Vue SPA 模板

基于 Vue 3 + TypeScript + Vite 的 SPA 模板，默认包含：

- 模块化示例（`src/modules/demo`）
- 基础请求层（`@vup/http` + `src/api/request.ts`）
- UI 封装层（`@vup/ui`，`V*` 组件）

## 模板定位

- **主语是 Vue SPA 工程结构**，用于后台、Dashboard、企业应用。
- **请求层按三层分离**：共享能力、应用适配、模块接口。
- **业务代码按模块聚合**：页面、组件、store、api、types、locales 就近放在模块目录。

## 快速开始

```bash
pnpm install
pnpm dev
```

默认访问：`http://localhost:9301`

## 常用命令

```bash
pnpm build
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## 当前目录结构（已同步）

```txt
src/
├── api/
│   ├── request.ts                # 应用侧请求适配层（基于 @vup/http）
│   └── types.ts
├── locales/                      # 根语言包（全局公共文案）
├── modules/
│   └── demo/
│       ├── views/                # DemoLayout / DemoGuidePage / DemoExamplePage
│       ├── components/
│       ├── stores/
│       ├── api/
│       ├── types/
│       └── locales/
├── router/
│   └── routes.ts                 # /demo/guide + /demo/example
├── views/empty/Empty.vue
├── App.vue
└── main.ts                       # 应用入口
```

## 请求层约定

当前模板使用 `@vup/http` 作为共享基础请求能力，应用侧保留 `src/api/request.ts`
做适配：

- token、语言、401 行为放应用层
- 业务接口函数放 `src/modules/<name>/api`
- 不在基础请求文件里堆业务细节

### 请求取消（推荐场景）

对于搜索联想、筛选快速切换、分页连续点击这类“只关心最后一次结果”的查询接口，建议启用取消能力：

```ts
request.get('/api/template-demo/tasks', {
  mode: 'takeLatest',
  cancelKey: 'demo:task-list:load',
  cancelScope: 'demo:task-list',
});
```

- 页面离开时可按作用域取消：`request.cancelAll('demo:task-list')`
- 主动取消默认静默处理，不会被当作全局异常提示

## UI 约定

- 统一使用 `@vup/ui` 的 `V*` 组件
- 页面层尽量保持结构清晰，样式轻量
- 组件命名和封装边界优先于“炫技样式”

## 路由与 demo 说明

- 默认首页重定向到 `demo-guide`
- `demo` 模块采用 layout + 子路由结构：
  - `demo-guide`
  - `demo-example`
- `empty` 页面用于兜底路由

## 相关示例

专项能力示例已拆到根目录 `examples/`：

- `examples/mock`：MSW mock 接入示例
- `examples/pwa`：PWA 接入示例
- `examples/qiankun`：qiankun 子应用接入示例

## 文档地址

### 框架与工程

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue i18n](https://vue-i18n.intlify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### 项目内相关文档

- [根目录 README](../../README.md)
- [@vup/http 文档](../../packages/http/README.md)
- [@vup/ui 文档](../../packages/ui/README.md)
