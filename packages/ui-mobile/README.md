# @vup/ui-mobile

基于 Ionic Vue 的移动端 UI 封装层，统一导出 `VM*` 前缀组件与方法型 API，默认用于
`capacitor-template`。默认包含：

- Ionic 基础样式与 `IonicVue` 插件注册（`app.use(VMUI)`）
- `VM*` 组件别名导出（薄封装，映射自 `Ion*`）
- `VMToast` / `VMAlert` / `VMLoading` 等方法型 API

## 包定位

- **主语是移动端 UI 封装**，与 `@vup/ui`（Element
  Plus 桌面端）分工不同，业务层优先使用 `VM*`。
- **路由必须与 Ionic Router 对齐**：使用 `VMRouterOutlet` 时需用
  `@ionic/vue-router` 创建路由实例。
- **优先薄封装**：不把业务逻辑耦合进 UI 包；缺失组件可先业务层受控直用
  `Ion*`，再按需补导出。

## 在应用中注册

```ts
import { createApp } from 'vue';
import App from './App.vue';
import VMUI from '@vup/ui-mobile';

const app = createApp(App);
app.use(VMUI);
app.mount('#app');
```

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
packages/ui-mobile/
├── src/
│   └── index.ts                  # 样式引入、组件别名、方法型 API、install
├── package.json
└── README.md
```

## 路由要求（必须）

使用 `VMRouterOutlet` 时，必须使用 Ionic Router 工厂：

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import routes from './routes';

export default createRouter({
  history: createWebHistory(),
  routes,
});
```

如果使用普通 `vue-router` 的 `createRouter`，会出现 `navManager/viewStacks`
注入缺失警告。

## 页面层级约定（推荐）

```vue
<VMPage>
  <VMHeader>
    <VMToolbar>
      <VMTitle>Title</VMTitle>
    </VMToolbar>
  </VMHeader>
  <VMContent fullscreen>
    <!-- 业务内容 -->
  </VMContent>
</VMPage>
```

- `VMToolbar` 放在 `VMHeader` / `VMFooter` 内。
- `VMCard`、业务列表、表单等内容放在 `VMContent` 内，不与 `VMHeader` 平级混放。

## 组件命名约定

- `VMButton` -> `IonButton`
- `VMPage` -> `IonPage`
- `VMHeader` / `VMToolbar` / `VMTitle`
- `VMRouterOutlet` -> `IonRouterOutlet`
- `VMContent`
- `VMList` / `VMItem`
- `VMCard` / `VMCardHeader` / `VMCardTitle` / `VMCardContent`
- `VMSegment` / `VMSegmentButton`

## 方法型 API

```ts
import { VMAlert, VMLoading, VMToast } from '@vup/ui-mobile';

await VMToast('保存成功');
await VMAlert({ header: '提示', message: '操作完成', buttons: ['确定'] });
const loading = await VMLoading({ message: '处理中...' });
await loading.dismiss();
```

## 约定

- 业务层优先使用 `VM*`，不直接使用 `Ion*`。
- 缺失组件可先在业务层受控直用，再补齐封装导出。
- 优先保持「薄封装」，避免把业务逻辑耦合进 UI 包。

## 常见问题

- **语言切换按钮放到 Header 右侧看不到？**  
  优先使用独立工具栏或内容区显式操作栏，避免在不稳定插槽上承载关键交互。
- **Card 放在 Header 外面不显示/层级错乱？**  
  确保业务 Card 在 `VMContent` 内，`VMHeader` 只负责导航与标题。

## 文档地址

### 框架与相关技术

- [Vue 3](https://vuejs.org/)
- [Ionic Framework](https://ionicframework.com/)
- [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- [@ionic/vue-router](https://ionicframework.com/docs/vue/navigation)
- [Ionicons](https://ionic.io/ionicons)
- [Capacitor](https://capacitorjs.com/)

### 项目内相关文档

- [根目录 README](../../README.md)
- [capacitor-template README](../../apps/capacitor-template/README.md)
- [@vup/ui 文档](../ui/README.md)
