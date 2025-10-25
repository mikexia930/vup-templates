# Qiankun 微前端模板

基于 qiankun + Vue 3 + TypeScript +
Vite 的现代化微前端开发模板，开箱即用，让你快速构建微前端应用。

## 🚀 技术栈

- **qiankun** - 基于 single-spa 的微前端实现库
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js 官方路由管理器
- **Pinia** - Vue 3 官方状态管理库
- **Vue i18n** - Vue.js 国际化插件
- **Tailwind CSS** - 实用优先的 CSS 框架
- **SCSS** - CSS 预处理器，增强样式编写能力
- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **pnpm** - 快速、节省磁盘空间的包管理器

## 📚 文档地址

- [qiankun 官方文档](https://qiankun.umijs.org/)
- [single-spa 官方文档](https://single-spa.js.org/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue Router 官方文档](https://router.vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue i18n 官方文档](https://vue-i18n.intlify.dev/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [SCSS 官方文档](https://sass-lang.com/)
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

启动开发服务器，支持热重载，访问 http://localhost:9307

### 构建项目

```bash
pnpm build
```

构建生产版本，输出到 `.output` 目录

### 代码检查

```bash
pnpm lint
```

运行 ESLint 检查代码质量

```bash
pnpm lint:fix
```

自动修复 ESLint 发现的问题

### 代码格式化

```bash
pnpm format
```

使用 Prettier 格式化代码

```bash
pnpm format:check
```

检查代码格式是否符合 Prettier 规范

## 🧪 测试微前端

### 启动子应用

本模板使用 `vue-template` 作为子应用进行测试。请确保同时启动子应用：

```bash
# 在项目根目录下
cd apps/vue-template
pnpm dev
```

子应用将在 http://localhost:9301 运行

### 访问微前端应用

1. 启动主应用：`pnpm dev`
2. 启动子应用：`cd apps/vue-template && pnpm dev`
3. 访问 http://localhost:9307/auto/vue/ 查看微前端效果

## 📁 项目结构

```
qiankun-template/
├── src/
│   ├── views/
│   │   ├── auto/           # 自动加载示例页面
│   │   │   └── Auto.vue    # 微应用容器组件
│   │   └── manual/         # 手动加载示例页面
│   │       └── Manual.vue  # 手动加载容器组件
│   ├── router/             # 路由配置
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── .eslintrc-auto-import.json  # ESLint 自动导入配置
├── auto-imports.d.ts       # 自动导入类型声明
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.js          # Vite 配置
└── README.md               # 项目说明
```

## ✨ 特性

- 🎯 **TypeScript 支持** - 完整的类型安全
- 🚀 **Vite 构建** - 极速的开发体验
- 🎨 **Tailwind CSS** - 实用优先的样式框架
- 🌍 **国际化支持** - 多语言切换
- 📱 **响应式设计** - 适配各种设备
- 🔧 **代码规范** - ESLint + Prettier
- 📦 **自动导入** - 无需手动导入 Vue API
- 🏪 **状态管理** - Pinia 状态管理
- 🛣️ **路由管理** - Vue Router 路由系统
- 🔗 **微前端架构** - 基于 qiankun 的微前端解决方案
- 📊 **全局状态** - 微应用间状态共享
- 🔄 **生命周期管理** - 完整的微应用生命周期控制

## 🔗 微前端架构

### 主应用功能

- **微应用注册** - 注册和管理子应用
- **路由管理** - 根据路由自动加载微应用
- **生命周期管理** - 控制微应用的加载、挂载、卸载
- **全局状态管理** - 微应用间状态共享
- **通信机制** - 主应用与子应用间的通信

### 子应用要求

子应用需要支持 qiankun 的生命周期函数：

```typescript
// 子应用需要导出的生命周期函数
export async function bootstrap() {
  // 应用启动时调用
}

export async function mount(props) {
  // 应用挂载时调用
}

export async function unmount() {
  // 应用卸载时调用
}

export async function update(props) {
  // 应用更新时调用
}
```

### 全局状态管理

主应用使用 qiankun 的全局状态管理功能：

```typescript
// 主应用
import { initGlobalState } from 'qiankun';

const state = { name: 'qiankun-template' };
const actions = initGlobalState(state);

// 子应用
props.onGlobalStateChange((state, prev) => {
  console.log('状态变化:', state, prev);
});
```

## 🎨 样式系统

项目使用 Tailwind CSS 作为主要样式框架，配合 SCSS 预处理器：

- 使用 `@apply` 指令在 SCSS 中应用 Tailwind 类
- 支持响应式设计
- 自定义主题配置
- 组件级别的样式隔离
- 微应用样式隔离

## 🌍 国际化

项目内置了中英文国际化支持：

- 使用 Vue i18n 进行国际化
- 支持语言切换
- 类型安全的翻译键
- 懒加载语言包

## 📱 响应式设计

- 移动端优先的设计理念
- 适配各种屏幕尺寸
- 触摸友好的交互设计
- 优化的移动端性能

## 🔧 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查
- **Vite HMR** - 热模块替换
- **自动导入** - 无需手动导入常用 API

## 🚀 微前端最佳实践

### 1. 子应用开发

- 使用 `vite-plugin-qiankun` 插件简化配置
- 支持独立运行和微应用运行
- 正确处理生命周期函数
- 实现样式隔离

### 2. 主应用开发

- 合理规划微应用的路由规则
- 实现全局状态管理
- 处理微应用间的通信
- 监控微应用的生命周期

### 3. 部署策略

- 主应用和子应用可以独立部署
- 使用 CDN 加速静态资源
- 实现版本管理和回滚机制

## 📄 许可证

MIT License
