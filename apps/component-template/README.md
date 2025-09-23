# Vue 3 组件库开发模板

基于 Vue 3 +
TypeScript 的现代化组件库开发模板，支持组件开发、工具库构建和完整的发布流程。

## 🚀 技术栈

### 核心框架

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具

### 构建工具

- **tsup** - 基于 ESBuild 的 TypeScript 打包器
- **vite-plugin-dts** - Vite 类型声明文件生成插件
- **ESBuild** - 极速的 JavaScript 打包器

### 开发工具

- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具

### 功能特性

- **组件开发** - Vue 3 组件开发支持
- **工具库** - 纯 TypeScript 工具函数
- **类型声明** - 完整的 TypeScript 类型支持
- **多格式输出** - CommonJS 和 ESM 格式支持

## 📚 文档地址

### 核心技术

- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)

### 构建工具

- [tsup 官方文档](https://tsup.egoist.sh/)
- [vite-plugin-dts 官方文档](https://github.com/qmhc/vite-plugin-dts)
- [ESBuild 官方文档](https://esbuild.github.io/)

### 开发工具

- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)

## 🛠️ 使用方式

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# tsup 开发模式（监听文件变化）
pnpm dev:tsup

# Vite 开发模式（监听文件变化）
pnpm dev:vite
```

### 构建项目

```bash
# 完整构建（tsup + vite）
pnpm build

# 仅构建 tsup
pnpm build:tsup

# 仅构建 Vite
pnpm build:vite
```

### 类型检查

```bash
# tsup 类型检查
pnpm type-check:tsup

# Vite 类型检查
pnpm type-check:vite
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

## 📦 发布到 NPM

### 构建并发布

```bash
# 构建项目
pnpm build

# 发布到 NPM
pnpm publish:npm

# 发布 Beta 版本
pnpm publish:beta
```

### 使用组件库

```bash
# 安装组件库
npm install your-component-lib

# 在项目中使用
import { Input, http } from 'your-component-lib';
```

## 📁 项目结构

```
component-template/
├── src/
│   ├── components/         # Vue 组件
│   │   ├── Input/          # Input 组件
│   │   │   ├── Input.vue   # 组件模板
│   │   │   ├── Input.ts    # 组件逻辑
│   │   │   ├── types.ts    # 类型定义
│   │   │   └── index.ts    # 导出文件
│   │   └── index.ts        # 组件统一导出
│   ├── libs/               # 工具库
│   │   ├── http/           # HTTP 请求工具
│   │   │   └── index.ts
│   │   └── index.ts        # 工具库统一导出
│   ├── index.ts            # 主入口文件
│   └── vue-shim.d.ts       # Vue 类型声明
├── scripts/                # 构建脚本
│   └── build-index.cjs     # 索引构建脚本
├── .output/                # 构建输出目录
├── tsup.config.ts          # tsup 配置
├── vite.config.ts          # Vite 配置
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明
```

## ✨ 特性

### 组件开发

- 🎯 **Vue 3 组件** - 完整的 Vue 3 组件开发支持
- 📝 **TypeScript** - 完整的类型安全
- 🎨 **样式隔离** - Scoped CSS 样式隔离
- 🔧 **Props 验证** - 完整的 Props 类型定义
- 📤 **事件系统** - 完整的事件发射和监听

### 工具库开发

- 🛠️ **纯 TypeScript** - 无框架依赖的工具函数
- 📦 **模块化** - 清晰的模块结构
- 🔄 **HTTP 客户端** - 完整的 HTTP 请求封装
- 🎯 **类型安全** - 完整的类型定义

### 构建系统

- 🚀 **双构建器** - tsup + Vite 双重构建
- 📦 **多格式输出** - CommonJS 和 ESM 支持
- 📝 **类型声明** - 自动生成 .d.ts 文件
- 🔍 **Tree Shaking** - 支持按需引入
- ⚡ **极速构建** - 基于 ESBuild 的快速构建

### 开发体验

- 🔧 **热重载** - 开发时自动重新构建
- 📝 **代码规范** - ESLint + Prettier
- 🎯 **类型检查** - 完整的 TypeScript 类型检查
- 📦 **模块化** - 清晰的代码组织结构

## 🎨 组件开发

### 创建新组件

1. **创建组件目录**

   ```
   src/components/MyComponent/
   ├── MyComponent.vue      # 组件模板
   ├── MyComponent.ts       # 组件逻辑
   ├── types.ts            # 类型定义
   └── index.ts            # 导出文件
   ```

2. **定义组件类型**

   ```typescript
   // types.ts
   export interface MyComponentProps {
     title: string;
     size?: 'small' | 'medium' | 'large';
     disabled?: boolean;
   }

   export interface MyComponentEmit {
     (e: 'change', value: string): void;
     (e: 'click', event: MouseEvent): void;
   }
   ```

3. **实现组件逻辑**

   ```typescript
   // MyComponent.ts
   import { computed } from 'vue';
   import type { MyComponentProps, MyComponentEmit } from './types';

   export function useMyComponent(
     props: MyComponentProps,
     emit: MyComponentEmit
   ) {
     const classes = computed(() => {
       return [
         'my-component',
         `my-component--${props.size}`,
         { 'my-component--disabled': props.disabled },
       ];
     });

     const handleClick = (event: MouseEvent) => {
       if (!props.disabled) {
         emit('click', event);
       }
     };

     return {
       classes,
       handleClick,
     };
   }
   ```

4. **实现组件模板**

   ```vue
   <!-- MyComponent.vue -->
   <template>
     <div :class="classes" @click="handleClick">
       <h3>{{ title }}</h3>
       <slot />
     </div>
   </template>

   <script setup lang="ts">
   import { useMyComponent } from './MyComponent';
   import type { MyComponentProps, MyComponentEmit } from './types';

   defineOptions({
     name: 'MyComponent',
   });

   const props = withDefaults(defineProps<MyComponentProps>(), {
     size: 'medium',
     disabled: false,
   });

   const emit = defineEmits<MyComponentEmit>();

   const { classes, handleClick } = useMyComponent(props, emit);
   </script>

   <style scoped>
   .my-component {
     /* 组件样式 */
   }
   </style>
   ```

5. **导出组件**
   ```typescript
   // index.ts
   export { default as MyComponent } from './MyComponent.vue';
   export type { MyComponentProps, MyComponentEmit } from './types';
   ```

### 组件使用示例

```vue
<template>
  <div>
    <Input
      v-model:value="inputValue"
      placeholder="请输入内容"
      size="large"
      clearable
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Input } from 'your-component-lib';

const inputValue = ref('');

const handleChange = (value: string) => {
  console.log('Input changed:', value);
};
</script>
```

## 🛠️ 工具库开发

### 创建工具函数

1. **创建工具模块**

   ```typescript
   // src/libs/utils/index.ts
   export function formatDate(
     date: Date,
     format: string = 'YYYY-MM-DD'
   ): string {
     // 日期格式化逻辑
   }

   export function debounce<T extends (...args: any[]) => any>(
     func: T,
     wait: number
   ): (...args: Parameters<T>) => void {
     // 防抖函数逻辑
   }
   ```

2. **导出工具函数**
   ```typescript
   // src/libs/index.ts
   export * from './utils';
   export * from './http';
   ```

### HTTP 客户端使用

```typescript
import { http, HttpClient } from 'your-component-lib';

// 使用默认实例
const data = await http.get('/api/users');

// 创建自定义实例
const apiClient = new HttpClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
});

// 添加拦截器
apiClient.addRequestInterceptor({
  onRequest: (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
});

// 发送请求
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', { name: 'John' });
```

## 🔧 构建配置

### tsup 配置

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  outDir: '.output',
  format: ['cjs', 'esm'], // 输出 CommonJS 和 ESM 格式
  dts: {
    resolve: true, // 解析类型声明
  },
  splitting: false, // 不分割代码
  sourcemap: true, // 生成 sourcemap
  clean: true, // 清理输出目录
  external: ['vue'], // 外部依赖
  treeshake: true, // 启用 Tree Shaking
});
```

### Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: '.output',
      include: ['src/**/*'],
      exclude: ['**/*.test.*', '**/*.spec.*'],
      insertTypesEntry: true,
      copyDtsFiles: false,
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: '.output',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      name: 'ComponentLib',
      fileName: (format: string, entryName: string) =>
        `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
```

## 📦 发布配置

### package.json 配置

```json
{
  "name": "your-component-lib",
  "version": "1.0.0",
  "main": "./.output/index.js",
  "module": "./.output/index.mjs",
  "types": "./.output/index.d.ts",
  "exports": {
    ".": {
      "types": "./.output/index.d.ts",
      "import": "./.output/index.mjs",
      "require": "./.output/index.js"
    }
  },
  "files": ["./.output"],
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd component-template
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **开发模式**

   ```bash
   pnpm dev:tsup
   ```

4. **构建项目**

   ```bash
   pnpm build
   ```

5. **发布到 NPM**
   ```bash
   pnpm publish:npm
   ```

## 📄 许可证

MIT License
