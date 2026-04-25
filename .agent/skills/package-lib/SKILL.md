---
name: package-lib
description: >-
  Use when developing pure TypeScript npm packages with package-template. Covers
  tsup builds, multi-entry exports, public type design, and package publishing.
  Use for infrastructure libraries such as http, socket, storage, utils, SDKs,
  and framework-agnostic packages.
---

# package-lib

基于 `package-template` 的纯 TypeScript 包开发。**不处理 Vue
SFC，不引入 Vite 组件库构建。**

## 适用场景

- `http` / `socket` / `storage` / `utils`
- SDK / client / adapter
- 无 `.vue` 文件的基础设施库
- 对应目录：`apps/<package-lib>/`

## package-template 特有约定

### 1. 目录结构

```
apps/<package-lib>/
├── src/
│   ├── index.ts                   根入口
│   └── <module>/
│       └── index.ts               子入口模块
├── tsup.config.ts                 tsup 构建配置
├── tsconfig.json
└── package.json                   含 exports / types / main 字段
```

### 2. 模块与类型

- 一个基础能力一个目录，例如 `src/http/`、`src/socket/`。
- 公开类型和公开函数从模块入口直接导出。
- 内部 helper 不要从根入口暴露，除非明确是公共 API。
- 使用 `unknown` 或泛型表达外部数据，不要默认写 `any`。

### 3. 多入口构建

新增子入口时，同时更新 `tsup.config.ts` 和 `package.json`：

```typescript
// tsup.config.ts
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'http/index': 'src/http/index.ts',
  },
});
```

```json
{
  "exports": {
    ".": {
      "types": "./.output/index.d.ts",
      "import": "./.output/index.js",
      "require": "./.output/index.cjs"
    },
    "./http": {
      "types": "./.output/http/index.d.ts",
      "import": "./.output/http/index.js",
      "require": "./.output/http/index.cjs"
    }
  }
}
```

### 4. 构建 & 发布

```bash
pnpm --filter <package> dev
pnpm --filter <package> type-check
pnpm --filter <package> build
pnpm --filter <package> publish:npm
pnpm --filter <package> publish:beta
```

## 实现新模块的步骤

1. 与用户确认模块名、运行环境（browser / node / both）和公开 API
2. 创建 `src/<module>/index.ts`
3. 在 `src/index.ts` 决定是否从根入口聚合导出
4. 在 `tsup.config.ts` 添加子入口
5. 在 `package.json` 添加对应 exports
6. 跑 `type-check` 和 `build`

## 关键决策点

1. **运行环境**：Node、浏览器，还是两者都支持？
2. **入口策略**：只从根入口导出，还是支持 `pkg/<module>` 子路径？
3. **依赖策略**：是否需要 runtime dependencies / peerDependencies？
4. **模块格式**：默认 ESM + CJS，是否需要特殊产物？

## 产出位置

- 模块代码：`apps/<package>/src/<module>/`
- 根入口：`apps/<package>/src/index.ts`
- 构建入口：`apps/<package>/tsup.config.ts`
- 发布入口：`apps/<package>/package.json`

## 资源

```
package-lib/
└── SKILL.md            本文件
```

tsup 文档：https://tsup.egoist.dev/
