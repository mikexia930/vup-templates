# Stack: Electron

- 主进程、preload、renderer 按项目现有目录分层。
- Renderer 侧按 Vue 规则组织：模块、路由、UI、`@vup/http`。
- Renderer 业务模块默认放 `src/renderer/modules/<module>/`
  或项目既有 renderer 模块目录。
- 主进程不要直接依赖浏览器 API。
- preload 暴露 API 要保持最小面，避免把 Node 能力直接泄漏给页面。
- 跨进程通信集中管理，不在组件里散写 channel 字符串。
- 打包和自动更新配置改动前先确认目标平台。
