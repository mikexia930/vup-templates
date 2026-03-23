# 📱 UniApp 跨平台应用开发模板

基于 UniApp + Vue 3 +
TypeScript 的跨平台应用开发模板，支持 H5、小程序、App 等多端开发。

## ✨ 特性

- 🚀 **Vue 3** - 渐进式 JavaScript 框架
- 📱 **UniApp** - 跨平台应用开发框架
- 🔧 **TypeScript** - JavaScript 的超集，提供类型安全
- ⚡ **Vite** - 下一代前端构建工具
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🌍 **多语言支持** - 内置 vue-i18n 国际化
- 📦 **pnpm** - 快速、节省磁盘空间的包管理器

## 🛠️ 技术栈

| 技术         | 版本 | 说明                         |
| ------------ | ---- | ---------------------------- |
| UniApp       | 3.0+ | 跨平台应用开发框架           |
| Vue          | 3.5+ | 渐进式 JavaScript 框架       |
| TypeScript   | 5.0+ | JavaScript 的超集            |
| Vite         | 6.0+ | 下一代前端构建工具           |
| Tailwind CSS | 3.0+ | 实用优先的 CSS 框架          |
| vue-i18n     | 9.0+ | Vue.js 国际化插件            |
| pnpm         | 8.0+ | 快速、节省磁盘空间的包管理器 |

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
# H5 开发
pnpm dev

# 微信小程序开发
pnpm dev:mp-weixin

# 支付宝小程序开发
pnpm dev:mp-alipay

# 百度小程序开发
pnpm dev:mp-baidu

# 字节跳动小程序开发
pnpm dev:mp-toutiao

# QQ 小程序开发
pnpm dev:mp-qq

# App 开发
pnpm dev:app
```

### 3. 构建生产版本

```bash
# H5 构建
pnpm build

# 微信小程序构建
pnpm build:mp-weixin

# 支付宝小程序构建
pnpm build:mp-alipay

# 百度小程序构建
pnpm build:mp-baidu

# 字节跳动小程序构建
pnpm build:mp-toutiao

# QQ 小程序构建
pnpm build:mp-qq

# App 构建
pnpm build:app
```

## 📱 支持平台

### H5

- 现代浏览器
- 移动端浏览器
- PWA 支持

### 小程序

- 微信小程序
- 支付宝小程序
- 百度小程序
- 字节跳动小程序
- QQ 小程序

### App

- iOS
- Android

## 🎨 功能特性

### 多语言支持

- 内置中文/英文语言包
- 基于 vue-i18n 实现
- 支持语言切换
- 自动检测系统语言

### 响应式设计

- 基于 Tailwind CSS
- 移动端优先设计
- 自适应布局
- 现代化 UI 组件

### 开发体验

- TypeScript 类型支持
- 热重载开发
- ESLint 代码检查
- Prettier 代码格式化

## 📁 项目结构

```
uniapp-template/
├── src/
│   ├── pages/                 # 页面目录
│   │   └── index/            # 首页
│   │       └── index.vue     # 首页组件
│   ├── static/               # 静态资源
│   │   └── logo.png         # 应用图标
│   ├── locales/              # 多语言文件
│   │   ├── index.ts         # i18n 配置
│   │   ├── zh-CN.ts         # 中文语言包
│   │   └── en-US.ts         # 英文语言包
│   ├── App.vue              # 应用根组件
│   ├── main.ts              # 应用入口
│   ├── manifest.json        # 应用配置
│   ├── pages.json           # 页面配置
│   └── uni.scss             # 全局样式
├── index.html               # H5 入口文件
├── package.json             # 依赖配置
├── vite.config.ts           # Vite 配置
└── tsconfig.json            # TypeScript 配置
```

## 🔧 开发工具

### 代码检查

```bash
# 检查代码质量
pnpm lint

# 自动修复代码问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check
```

### 类型检查

```bash
# TypeScript 类型检查
pnpm type-check
```

## 📱 平台特定配置

### 微信小程序

1. 在微信开发者工具中导入项目
2. 选择 `dist/dev/mp-weixin` 目录
3. 配置 AppID

### 支付宝小程序

1. 在支付宝开发者工具中导入项目
2. 选择 `dist/dev/mp-alipay` 目录
3. 配置 AppID

### App 开发

1. 安装 HBuilderX
2. 导入项目
3. 配置证书和签名

## 🌍 多语言配置

### 添加新语言

1. 在 `src/locales/` 目录下创建新的语言文件
2. 在 `src/locales/index.ts` 中注册新语言
3. 更新语言切换器

### 使用多语言

```vue
<template>
  <text>{{ t('common.hello') }}</text>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
```

## 📦 构建和部署

### H5 部署

```bash
# 构建 H5 版本
pnpm build

# 部署到静态服务器
# 将 dist/build/h5 目录上传到服务器
```

### 小程序发布

1. 构建对应平台的小程序
2. 在对应开发者工具中预览
3. 提交审核发布

### App 发布

1. 构建 App 版本
2. 在 HBuilderX 中打包
3. 上传到应用商店

## 🎯 最佳实践

### 1. 页面开发

- 使用 Vue 3 Composition API
- 合理使用 TypeScript 类型
- 遵循 UniApp 组件规范

### 2. 样式开发

- 优先使用 Tailwind CSS 类
- 使用 rpx 单位适配不同屏幕
- 遵循移动端设计规范

### 3. 状态管理

- 简单状态使用 ref/reactive
- 复杂状态考虑 Pinia
- 合理使用 uni.storage

### 4. 性能优化

- 合理使用图片资源
- 避免过深的组件嵌套
- 使用条件编译优化代码

## ⚠️ 常见问题

- 如果 HBuilderX /
  CLI 编译版本 与 手机端运行的 SDK 版本不匹配，请在 uniapp 项目目录执行：
  `npx @dcloudio/uvm@latest`

## 📚 相关文档

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [vue-i18n 官方文档](https://vue-i18n.intlify.dev/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
