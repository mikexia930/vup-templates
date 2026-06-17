# Stack: Vue

- 目标目录通常是 `apps/<app>/`。
- 请求层使用 `@vup/http`，应用适配在 `src/api/request.ts`。
- 通用响应类型从 `@vup/http` re-export 到 `src/api/types.ts`。
- 业务模块放 `src/modules/<name>/`。
- 模块对外通过 `src/modules/<name>/index.ts` 暴露 public API。
- 新模块接入时检查 routes、menu/permission、i18n、store、mock。
- 路由集中在 `src/router/`，动态路由由权限模块注入。
- 布局放 `src/layouts/`。
- UI 使用 `@vup/ui` 的 `V*` 组件。
- Vite 环境变量使用 `VITE_` 前缀。
- 已配置 auto-import 时，不重复 import Vue/Pinia/router/i18n 常用 API。
