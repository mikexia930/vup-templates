# Capacitor 跨平台移动应用开发模板

基于 Vue 3 +
Capacitor 的跨平台移动应用开发模板，支持 iOS 和 Android 平台，让你用 Web 技术构建原生移动应用。

## 🚀 技术栈

### 前端框架

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js 官方路由管理器
- **Pinia** - Vue 3 官方状态管理库
- **Vue i18n** - Vue.js 国际化插件

### 样式系统

- **Tailwind CSS** - 实用优先的 CSS 框架
- **SCSS** - CSS 预处理器，增强样式编写能力

### 移动端框架

- **Capacitor** - 跨平台原生应用开发框架
- **iOS** - Apple iOS 移动操作系统
- **Android** - Google Android 移动操作系统

### 开发工具

- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **pnpm** - 快速、节省磁盘空间的包管理器

### Capacitor 插件

- **@capacitor/core** - Capacitor 核心功能
- **@capacitor/camera** - 相机功能
- **@capacitor/splash-screen** - 启动屏幕

## 📚 文档地址

### 前端技术

- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue Router 官方文档](https://router.vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue i18n 官方文档](https://vue-i18n.intlify.dev/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [SCSS 官方文档](https://sass-lang.com/)

### 移动端技术

- [Capacitor 官方文档](https://capacitorjs.com/)
- [iOS 开发文档](https://developer.apple.com/ios/)
- [Android 开发文档](https://developer.android.com/)

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

启动开发服务器，支持热重载，访问 http://localhost:9305

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

## 📱 移动端开发

### 添加平台支持

#### iOS 平台

```bash
# 添加 iOS 平台
pnpm ios:add

# 构建并同步到 iOS
pnpm ios:build

# 打开 iOS 项目
pnpm ios:open

# 一键构建并打开 iOS 项目
pnpm ios
```

#### Android 平台

```bash
# 添加 Android 平台
pnpm android:add

# 构建并同步到 Android
pnpm android:build

# 打开 Android 项目
pnpm android:open

# 一键构建并打开 Android 项目
pnpm android
```

### 同步代码

```bash
# 同步 Web 代码到原生平台
npx cap sync
```

## 📁 项目结构

```
capacitor-template/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   ├── locales/           # 国际化文件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── ios/                   # iOS 原生项目（运行 ios:add 后生成）
├── android/               # Android 原生项目（运行 android:add 后生成）
├── .eslintrc-auto-import.json  # ESLint 自动导入配置
├── auto-imports.d.ts      # 自动导入类型声明
├── capacitor.config.ts    # Capacitor 配置
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.js         # Vite 配置
└── README.md              # 项目说明
```

## ✨ 特性

### 前端特性

- 🎯 **TypeScript 支持** - 完整的类型安全
- 🚀 **Vite 构建** - 极速的开发体验
- 🎨 **Tailwind CSS** - 实用优先的样式框架
- 🌍 **国际化支持** - 多语言切换
- 📱 **响应式设计** - 适配各种设备
- 🔧 **代码规范** - ESLint + Prettier
- 📦 **自动导入** - 无需手动导入 Vue API
- 🏪 **状态管理** - Pinia 状态管理
- 🛣️ **路由管理** - Vue Router 路由系统

### 移动端特性

- 📱 **跨平台支持** - 一套代码，多端运行
- 🍎 **iOS 原生** - 完整的 iOS 平台支持
- 🤖 **Android 原生** - 完整的 Android 平台支持
- 📷 **原生插件** - 相机、启动屏幕等原生功能
- 🔄 **热重载** - 开发时实时预览
- 📦 **原生构建** - 生成原生应用包

## 🎨 样式系统

项目使用 Tailwind CSS 作为主要样式框架，配合 SCSS 预处理器：

- 使用 `@apply` 指令在 SCSS 中应用 Tailwind 类
- 支持响应式设计
- 移动端优化的触摸交互
- 原生应用适配的样式

## 🌍 国际化

项目内置了中英文国际化支持：

- 使用 Vue i18n 进行国际化
- 支持语言切换
- 类型安全的翻译键
- 懒加载语言包

## 📱 移动端适配

- 移动端优先的设计理念
- 触摸友好的交互设计
- 原生应用性能优化
- 适配各种屏幕尺寸和方向

## 🔧 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查
- **Vite HMR** - 热模块替换
- **自动导入** - 无需手动导入常用 API
- **Capacitor CLI** - 移动端开发工具

## 📱 平台要求

### iOS 开发

- macOS 系统
- Xcode 14.0+
- iOS 13.0+

### Android 开发

- Android Studio
- Android SDK
- Java 11+

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd capacitor-template
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev
   ```

4. **添加移动端平台**

   ```bash
   # iOS
   pnpm ios:add

   # Android
   pnpm android:add
   ```

5. **构建并运行**

   ```bash
   # iOS
   pnpm ios

   # Android
   pnpm android
   ```

## 📄 许可证

MIT License
