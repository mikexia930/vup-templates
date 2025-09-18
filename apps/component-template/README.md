# 双构建方案组件库

## 🎯 项目特点

这个组件库支持**双构建方案**，可以同时开发：

1. **纯 TypeScript 组件**（如 HTTP 请求封装、工具函数等）
2. **Vue 组件**（如 UI 组件库）

## 📦 安装依赖

```bash
npm install
```

## 🚀 构建命令

### 1. **纯 TypeScript 构建**（tsup）

```bash
# 构建纯 TS 组件（工具函数、HTTP 封装等）
npm run build:tsup

# 开发模式
npm run dev:tsup

# 类型检查
npm run type-check:tsup
```

### 2. **Vue 组件构建**（Vite）

```bash
# 构建 Vue 组件
npm run build:vite

# 开发模式
npm run dev:vite

# 类型检查
npm run type-check:vite
```

### 3. **完整构建**

```bash
# 同时构建两种类型
npm run build

# 开发模式（默认使用 tsup）
npm run dev
```

## 📁 项目结构

```
src/
├── components/          # Vue 组件
│   ├── Button/
│   │   ├── Button.vue   # Vue 组件文件
│   │   ├── Button.ts    # JSX 组件（备用）
│   │   ├── types.ts     # 类型定义
│   │   └── index.ts     # 导出文件
│   └── Input/
├── utils/               # 纯 TypeScript 工具
│   └── http.ts          # HTTP 请求封装
└── index.ts             # 主入口文件
```

## 🔧 使用方式

### 纯 TypeScript 组件

```typescript
import { http, HttpClient, type RequestConfig } from 'your-lib';

// 使用默认实例
const data = await http.get('/api/users');

// 创建自定义实例
const client = new HttpClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});
```

### Vue 组件

```typescript
import { Button, Input } from 'your-lib';
import type { ButtonProps, InputProps } from 'your-lib';

// 在 Vue 组件中使用
const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'medium',
};
```

## ⚠️ 注意事项

1. **tsup 无法处理 .vue 文件**：纯 TS 构建会跳过 Vue 组件
2. **Vite 可以处理所有文件**：Vue 构建包含所有组件
3. **按需选择**：根据项目需求选择合适的构建方案

## 🎯 推荐使用场景

- **纯 TS 构建**：工具库、HTTP 封装、通用函数
- **Vue 构建**：UI 组件库、Vue 专用功能
- **完整构建**：发布到 npm 时使用
