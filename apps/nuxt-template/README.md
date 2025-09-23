# Nuxt 3 全栈应用开发模板

基于 Nuxt 3 +
TypeScript 的现代化全栈应用开发模板，支持 SSR、SSG、多语言和完整的开发工具链。

## 🚀 技术栈

### 核心框架

- **Nuxt 3** - 基于 Vue 3 的全栈框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具

### 状态管理

- **Pinia** - Vue 3 官方状态管理库

### 国际化

- **@nuxtjs/i18n** - Nuxt 官方国际化模块

### 样式系统

- **Tailwind CSS** - 实用优先的 CSS 框架
- **SCSS** - CSS 预处理器，增强样式编写能力

### 开发工具

- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **pnpm** - 快速、节省磁盘空间的包管理器

## 📚 文档地址

### 核心技术

- [Nuxt 3 官方文档](https://nuxt.com/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)

### 状态管理

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [@nuxtjs/i18n 官方文档](https://i18n.nuxtjs.org/)

### 样式系统

- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [SCSS 官方文档](https://sass-lang.com/)

### 开发工具

- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
- [pnpm 官方文档](https://pnpm.io/)

## 🛠️ 使用方式

### 安装依赖

```bash
pnpm install
```

### 开发服务器

```bash
pnpm dev
```

启动开发服务器，支持热重载，访问 http://localhost:9303

### 构建项目

```bash
# 构建生产版本
pnpm build

# 生成静态站点
pnpm generate

# 预览构建结果
pnpm preview
```

### 代码检查

```bash
# 检查代码质量
pnpm lint

# 自动修复问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化代码
pnpm format

# 检查格式
pnpm format:check
```

## 📁 项目结构

```
nuxt-template/
├── src/
│   ├── assets/             # 静态资源
│   │   └── images/         # 图片资源
│   ├── components/         # Vue 组件
│   │   └── Demo.vue        # 演示组件
│   ├── composables/        # 组合式函数
│   ├── layouts/            # 布局组件
│   ├── middlewares/        # 中间件
│   ├── pages/              # 页面组件
│   │   ├── demo.vue        # 演示页面
│   │   └── index.vue       # 首页
│   ├── utils/              # 工具函数
│   └── app.vue             # 根组件
├── i18n/                   # 国际化文件
│   └── locales/            # 语言包
│       ├── zh-CN.json      # 中文语言包
│       └── en-US.json      # 英文语言包
├── public/                 # 公共静态资源
│   ├── favicon.ico         # 网站图标
│   └── robots.txt          # 搜索引擎配置
├── nuxt.config.ts          # Nuxt 配置
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明
```

## ✨ 特性

### 核心特性

- 🎯 **TypeScript 支持** - 完整的类型安全
- 🚀 **Nuxt 3 框架** - 全栈应用开发
- 🎨 **Tailwind CSS** - 实用优先的样式框架
- 🌍 **多语言支持** - 内置中英文国际化
- 📱 **响应式设计** - 适配各种设备
- 🔧 **代码规范** - ESLint + Prettier

### Nuxt 特性

- 🔄 **SSR/SSG** - 服务端渲染和静态生成
- 📦 **自动导入** - 无需手动导入 Vue API
- 🛣️ **文件路由** - 基于文件系统的路由
- 🏪 **状态管理** - Pinia 状态管理
- 🌐 **国际化** - 多语言路由和内容
- 🔧 **中间件** - 路由中间件支持
- 📄 **SEO 优化** - 自动生成 meta 标签

### 开发特性

- 🔧 **热重载** - 开发时自动重新加载
- 📦 **模块化** - 清晰的代码组织结构
- 🛠️ **工具链** - 完整的开发工具支持
- 📝 **代码规范** - ESLint + Prettier
- 🏗️ **构建优化** - 生产环境优化

## 🌍 国际化

项目内置了完整的多语言支持：

### 语言配置

- **默认语言**：英文 (en-US)
- **支持语言**：中文 (zh-CN)、英文 (en-US)
- **路由策略**：`prefix_except_default` - 默认语言无前缀

### 使用方式

```vue
<template>
  <div>
    <h1>{{ $t('page.title') }}</h1>
    <p>{{ $t('page.description') }}</p>
  </div>
</template>

<script setup>
// 使用 useI18n 组合式函数
const { t, locale } = useI18n();

// 切换语言
const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>
```

### 语言文件结构

```json
{
  "page": {
    "title": "页面标题",
    "description": "页面描述"
  },
  "success": {
    "title": "成功标题",
    "description": "成功描述"
  }
}
```

## 🎨 样式系统

项目使用 Tailwind CSS 作为主要样式框架，配合 SCSS 预处理器：

### 使用方式

```vue
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-blue-600">
      {{ title }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.custom-class {
  @apply bg-white rounded-lg shadow-md;

  // 可以混合使用 SCSS 和 Tailwind
  .nested {
    color: #333;
    @apply p-4;
  }
}
</style>
```

### 配置特点

- 使用 `@_shared` 别名引用共享样式
- 支持 SCSS 预处理器
- 自动导入 Tailwind 指令

## 📱 响应式设计

- 移动端优先的设计理念
- 适配各种屏幕尺寸
- 触摸友好的交互设计
- 优化的移动端性能

## 🔧 开发工具

### 代码检查

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查

### 构建工具

- **Vite** - 极速构建
- **Nuxt** - 全栈框架
- **自动导入** - 无需手动导入常用 API

### 调试

```bash
# 开发模式运行
pnpm dev

# 构建并预览
pnpm build && pnpm preview

# 生成静态站点
pnpm generate
```

## 🚀 部署

### 静态部署

```bash
# 生成静态站点
pnpm generate

# 部署到静态托管服务
# 如 Vercel、Netlify、GitHub Pages 等
```

### 服务端部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm preview
```

### Docker 部署

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "preview"]
```

## 📄 页面路由

### 文件路由

- `pages/index.vue` → `/`
- `pages/demo.vue` → `/demo`
- `pages/about.vue` → `/about`

### 动态路由

- `pages/user/[id].vue` → `/user/123`
- `pages/post/[...slug].vue` → `/post/hello/world`

### 嵌套路由

```
pages/
├── index.vue
├── about.vue
└── blog/
    ├── index.vue
    └── [slug].vue
```

## 🏪 状态管理

使用 Pinia 进行状态管理：

```typescript
// stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  return { count, increment };
});
```

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">+</button>
  </div>
</template>

<script setup>
const counter = useCounterStore();
</script>
```

## 🔧 中间件

创建路由中间件：

```typescript
// middlewares/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // 检查用户认证状态
  if (!isAuthenticated()) {
    return navigateTo('/login');
  }
});
```

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd nuxt-template
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev
   ```

4. **访问应用**
   - 打开 http://localhost:9303
   - 查看多语言切换功能
   - 体验响应式设计

5. **构建项目**
   ```bash
   pnpm build
   ```

## 📄 许可证

MIT License
