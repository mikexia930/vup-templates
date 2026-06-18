# Quality Rules

## TypeScript

- 避免 `any`，优先用明确类型、泛型或 `unknown` 后收窄。
- API 响应类型不要重复漂移；Vue/Electron/Capacitor 默认从 `@vup/http` re-export。
- 已配置 auto-import 的项目，不重复导入 Vue/Pinia/router/i18n 常用 API，除非实际项目未配置。

## Vue

- 组件优先使用 `<script setup lang="ts">`。
- UI 优先使用 vup 封装组件：桌面端 `V*`，移动端 `VM*`。
- 业务模块内部自包含，跨模块只从模块 public entry 引用。

## 验证

- 优先运行目标 app/package 的 lint/build/test。
- 没有单包命令时再运行根命令。
- 无法运行验证时，在最终说明里明确原因。
