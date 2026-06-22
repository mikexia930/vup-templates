# .agents/

vup 的 AI 协作指令集。它的目标是让 AI 按 vup 约定开发，而不是重新学习每个框架。

## 目录结构

```
.agents/
├── ai.md                 AI 客户端入口模板，仅供 vup skill add 生成 AGENTS.md/CLAUDE.md
├── project.md            当前项目事实：已添加的 apps/packages/examples 与常用命令
├── _core/                vup 内置指令，由模板和 vup skill 管理
│   ├── package.json      内置指令版本元信息
│   ├── rules/            少量全局硬规则
│   │   ├── core.md
│   │   ├── module.md
│   │   ├── filesystem.md
│   │   └── quality.md
│   ├── tasks/            按工程动作加载的操作卡片
│   │   ├── add-app.md
│   │   ├── add-module.md
│   │   ├── change-existing-module.md
│   │   ├── add-api.md
│   │   ├── add-page.md
│   │   ├── add-auth.md
│   │   ├── release-commit.md
│   │   └── deploy.md
│   └── stacks/           平台差异说明，只在 task 要求时读取
│       ├── vue.md
│       ├── nuxt.md
│       ├── nest.md
│       └── ...
```

## 设计原则

- **入口模板不进项目指令目录**：`ai.md` 只保留在模板仓库中，`vup skill add`
  用它生成 AGENTS.md/CLAUDE.md。
- **task 优先**：AI 做的是一个工程动作，比如加接口、加页面、加鉴权，而不是“学习 Vue/Nuxt”。
- **stack 只写差异**：框架基础知识 AI 本身会，vup 只约束平台差异和文件落点。
- **project 是事实源**：`.agents/project.md`
  记录当前项目实际拥有的 app、package、example 和命令。
- **只管理 vup 内置核心**：`.agents` 只放 `_core` 和
  `project.md`，外部 skill 由外部安装器自己的目录管理。

## 维护指南

### 修改入口模板

改模板仓库中的 `.agents/ai.md`
时保持 40-80 行，只写加载顺序、任务路由和少量硬原则。该文件不由 `vup skill init`
复制到用户项目。

### 新增 task

只有当一个工程动作经常独立发生时，才新增
`.agents/_core/tasks/<name>.md`。task 应包含：

- 何时使用
- 必读/可选 stack
- 文件落点
- 禁止事项
- 最小实现清单
- 验证命令

### 新增 stack

只有当 vup 对某平台有特殊约定时，才新增
`.agents/_core/stacks/<name>.md`。不要写框架教程。

### 更新 project.md

`vup skill init` 后会生成 `.agents/project.md`。后续
`vup app add`、`vup package add`、`vup example add`
后应同步维护该文件；当前 CLI 未自动维护时，由 AI 或用户按实际项目补充。
