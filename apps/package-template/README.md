# TypeScript Package 模板

基于 TypeScript + tsup 的纯 TS npm 包模板，适合开发
`http`、`socket`、`storage`、`utils`、SDK 等基建库。如果要开发 Vue
SFC 组件，请使用 `component-template`。

## 技术定位

- **主语是纯 TypeScript 包**：不处理 `.vue`、样式和浏览器应用页面。
- **tsup 负责构建**：输出 ESM、CJS 和类型声明。
- **支持多入口导出**：根入口 `.` 和子入口 `./http` 都有明确 exports。
- **无框架默认依赖**：按基建库需要自行添加运行时依赖。

## 快速开始

```bash
pnpm install
pnpm dev
```

构建与检查：

```bash
pnpm type-check
pnpm build
pnpm lint
pnpm format:check
```

## 目录结构

```txt
package-template/
├── src/
│   ├── http/
│   │   └── index.ts        # HTTP 基建模块示例
│   └── index.ts            # 根入口
├── tsup.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 模块约定

- 一个基建能力一个目录，例如 `src/http/`、`src/socket/`、`src/storage/`。
- 每个模块自己导出公开类型和函数。
- `src/index.ts` 只做根入口聚合。
- 如果希望消费方按子路径引入，需要同步维护 `tsup.config.ts` 的 entry 和
  `package.json` 的 exports。

示例：

```typescript
import { http } from 'your-package';
import { HttpClient } from 'your-package/http';
```

## 构建产物

tsup 输出到 `.output/`：

```txt
.output/
├── index.js
├── index.cjs
├── index.d.ts
└── http/
    ├── index.js
    ├── index.cjs
    └── index.d.ts
```

`package.json` 的 exports 需要和入口保持一致：

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

## 发布

发布前确认：

- `pnpm type-check` 通过。
- `pnpm build` 生成 ESM、CJS 和 `.d.ts`。
- `package.json` 的 `name`、`version`、`exports`、`dependencies` 正确。

```bash
pnpm publish:npm
pnpm publish:beta
```

## 相关文档

- [TypeScript](https://www.typescriptlang.org/)
- [tsup](https://tsup.egoist.dev/)
