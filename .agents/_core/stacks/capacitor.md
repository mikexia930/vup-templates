# Stack: Capacitor

- 目标目录通常是 `apps/<capacitor-app>/`。
- 请求层使用 `@vup/http`。
- 业务模块按 Vue 前端规则放 `src/modules/<module>/`，除非项目已有不同风格。
- 移动端 UI 优先使用 `@vup/ui-mobile` 的 `VM*` 组件。
- Token 可用 localStorage，涉及原生能力时按 Capacitor 插件能力确认。
- 注意 safe area、触摸反馈、移动端 loading 和错误提示。
- 原生插件、新权限、打包配置改动前先确认目标平台。
