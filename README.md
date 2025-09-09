# 🚀 Vue Template - 现代化开发模板

一个基于 Vue 3 + TypeScript +
Vite 的现代化开发模板，集成了路由管理、状态管理、国际化、代码规范等核心功能，让你快速开始开发。

## ✨ 特性

- 🎯 **Vue 3** - 使用最新的 Composition API
- 🔧 **TypeScript** - 完整的类型支持
- ⚡ **Vite** - 极速的开发体验
- 🌐 **Vue Router 4** - 现代化路由系统
- 📦 **Pinia** - 轻量级状态管理
- 🌍 **Vue I18n** - 国际化解决方案
- 🎨 **Tailwind CSS** - 原子化CSS框架
- 📝 **ESLint 9** - 代码质量检查
- 🎨 **Prettier** - 代码格式化
- 📱 **响应式设计** - 支持移动端

## 🛠️ 技术栈

| 技术         | 版本 | 说明                 |
| ------------ | ---- | -------------------- |
| Vue          | 3.5+ | 渐进式JavaScript框架 |
| TypeScript   | 5.0+ | JavaScript的超集     |
| Vite         | 5.0+ | 下一代前端构建工具   |
| Vue Router   | 4.0+ | Vue.js官方路由管理器 |
| Pinia        | 2.0+ | Vue的状态管理库      |
| Vue I18n     | 9.0+ | Vue国际化插件        |
| Tailwind CSS | 3.0+ | 实用优先的CSS框架    |
| ESLint       | 9.0+ | 代码质量检查工具     |
| Prettier     | 3.0+ | 代码格式化工具       |

## 📁 项目结构

```
project-vue/
├── _shared/                 # 共享资源
├── apps/                    # 应用目录
│   └── demo/               # 示例应用
│       ├── src/
│       │   ├── assets/     # 静态资源
│       │   ├── components/ # 组件
│       │   ├── locales/    # 国际化文件
│       │   ├── router/     # 路由配置
│       │   ├── stores/     # 状态管理
│       │   ├── views/      # 页面组件
│       │   ├── App.vue     # 根组件
│       │   └── main.ts     # 入口文件
│       ├── index.html      # HTML模板
│       ├── package.json    # 应用依赖
│       └── vite.config.js  # Vite配置
├── eslint.config.js        # ESLint配置
├── .prettierrc            # Prettier配置
├── tailwind.config.js     # Tailwind配置
├── tsconfig.json          # TypeScript配置
├── vite.config.base.js    # 基础Vite配置
└── package.json           # 根目录依赖
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 2. 启动开发服务器

```bash
# 启动demo应用
pnpm dev

# 或指定应用
pnpm dev:demo
```

### 3. 构建生产版本

```bash
# 构建demo应用
pnpm build

# 或指定应用
pnpm build:demo
```

## 📖 使用指南

### 路由管理

```typescript
// 路由配置
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/content/:id', component: Content },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 在组件中使用
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
```

### 状态管理

```typescript
// 定义store
import { defineStore } from 'pinia';

export const useCounter = defineStore('counter', () => {
  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  return { count, increment };
});

// 在组件中使用
import { useCounter } from '@/stores/counter';

const counter = useCounter();
```

### 国际化

```typescript
// 语言配置
const messages = {
  'zh-CN': {
    hello: '你好',
    welcome: '欢迎使用',
  },
  'en-US': {
    hello: 'Hello',
    welcome: 'Welcome',
  },
};

// 在模板中使用
{
  {
    t('hello');
  }
}
{
  {
    t('welcome');
  }
}

// 切换语言
const { locale } = useI18n();
locale.value = 'en-US';
```

### 自动导入

项目配置了自动导入，以下API无需手动导入：

- Vue API: `ref`, `reactive`, `computed`, `watch` 等
- Vue Router: `useRouter`, `useRoute` 等
- Pinia: `defineStore`, `storeToRefs` 等

```typescript
// 无需导入，直接使用
export const useCounter = defineStore('counter', () => {
  const count = ref(0); // ref 自动导入
  const increment = () => count.value++;
  return { count, increment };
});
```

## 🎨 样式开发

### Tailwind CSS

```vue
<template>
  <div class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    Button
  </div>
</template>
```

### 自定义样式

```scss
// 使用 SCSS
.custom-component {
  @apply bg-gray-100 p-4;

  &:hover {
    @apply bg-gray-200;
  }
}
```

## 🔧 代码规范

### ESLint

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

### Prettier

```bash
# 格式化代码
pnpm format

# 检查格式
pnpm format:check
```

## 📱 响应式设计

项目使用 Tailwind CSS 的响应式前缀，支持不同屏幕尺寸：

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+
- `2xl:` - 1536px+

## 🌟 最佳实践

### 1. 组件命名

- 使用 PascalCase 命名组件
- 组件文件名与组件名保持一致

### 2. 文件组织

- 按功能模块组织文件
- 使用 index.ts 作为模块入口

### 3. 类型定义

- 为所有函数添加返回类型
- 使用接口定义数据结构

### 4. 状态管理

- 按功能模块拆分 store
- 使用组合式API定义 store

## 🚀 部署

### 构建

```bash
pnpm build
```

### 部署到静态服务器

构建完成后，`dist` 目录包含所有静态文件，可以部署到：

- Netlify
- Vercel
- GitHub Pages
- 任何静态文件服务器

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

---

**Happy Coding! 🎉**
