# .agent/

vup 的 AI 协作指令集。它的目标是让 AI 按 vup 约定开发，而不是重新学习每个框架。

## 目录结构

```
.agent/
├── ai.md                 AI 客户端入口模板，由 vup skill add 复制为 AGENTS.md/CLAUDE.md
├── project.md            当前项目事实：已添加的 apps/packages/examples 与常用命令
├── rules/                少量全局硬规则
│   ├── core.md
│   ├── module.md
│   ├── filesystem.md
│   └── quality.md
├── tasks/                按工程动作加载的操作卡片
│   ├── add-app.md
│   ├── add-module.md
│   ├── change-existing-module.md
│   ├── add-api.md
│   ├── add-page.md
│   ├── add-auth.md
│   └── deploy.md
├── stacks/               平台差异说明，只在 task 要求时读取
│   ├── vue.md
│   ├── nuxt.md
│   ├── nest.md
│   └── ...
```

## 设计原则

- **入口要短**：`ai.md` 只负责加载路由，不堆完整规范。
- **task 优先**：AI 做的是一个工程动作，比如加接口、加页面、加鉴权，而不是“学习 Vue/Nuxt”。
- **stack 只写差异**：框架基础知识 AI 本身会，vup 只约束平台差异和文件落点。
- **project 是事实源**：`.agent/project.md` 记录当前项目实际拥有的 app、package、example 和命令。

## 维护指南

### 修改入口

改 `.agent/ai.md` 时保持 40-80 行，只写加载顺序、任务路由和少量硬原则。

### 新增 task

只有当一个工程动作经常独立发生时，才新增 `.agent/tasks/<name>.md`。task 应包含：

- 何时使用
- 必读/可选 stack
- 文件落点
- 禁止事项
- 最小实现清单
- 验证命令

### 新增 stack

只有当 vup 对某平台有特殊约定时，才新增 `.agent/stacks/<name>.md`。不要写框架教程。

### 更新 project.md

`vup init/add/use/example` 后应同步维护 `.agent/project.md`。当前 CLI 未自动维护时，由 AI 或用户按实际项目补充。
