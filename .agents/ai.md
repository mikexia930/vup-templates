# AGENTS.md

你在 vup 项目中工作。vup 已经提供模板、共享包和目录约定；你的任务不是重新设计技术栈，而是在这些约定内完成改动。

## 加载顺序

每次任务只按下面顺序加载必要上下文：

1. 先读 `.agents/project.md`，确认当前项目事实。
2. 再读 `.agents/_core/rules/core.md` 和 `.agents/_core/rules/module.md`。
3. 根据任务只读一个 `.agents/_core/tasks/*.md`。
4. 只有 task 明确要求，才读一个 `.agents/_core/stacks/*.md`。

禁止一次性读取所有 `tasks/` 或所有 `stacks/`。只加载当前任务需要的文件。

## 任务路由

| 用户意图                               | 读取                                            |
| -------------------------------------- | ----------------------------------------------- |
| 初始化/添加 app、package、example      | `.agents/_core/tasks/add-app.md`                |
| 新增业务模块、调整模块边界             | `.agents/_core/tasks/add-module.md`             |
| 修改已有业务模块                       | `.agents/_core/tasks/change-existing-module.md` |
| 新增/修改接口、请求、mock、响应类型    | `.agents/_core/tasks/add-api.md`                |
| 新增页面、路由、布局、组件、CRUD       | `.agents/_core/tasks/add-page.md`               |
| 登录、token、路由守卫、权限、RBAC      | `.agents/_core/tasks/add-auth.md`               |
| 部署、环境变量、CI、Docker、Vercel     | `.agents/_core/tasks/deploy.md`                 |
| 发版、release commit、tag、push 前检查 | `.agents/_core/tasks/release-commit.md`         |

如果任务同时命中多个类别，先读最主要的一个 task；只有实现中确实需要，再读取第二个 task。

## Stack 路由

先根据 `.agents/project.md`
或实际文件路径判断目标 app 类型。只有 task 要求查看平台差异时，读取一个 stack：

| 类型          | 读取                                |
| ------------- | ----------------------------------- |
| Vue SPA       | `.agents/_core/stacks/vue.md`       |
| Nuxt          | `.agents/_core/stacks/nuxt.md`      |
| NestJS        | `.agents/_core/stacks/nest.md`      |
| Electron      | `.agents/_core/stacks/electron.md`  |
| Capacitor     | `.agents/_core/stacks/capacitor.md` |
| uni-app       | `.agents/_core/stacks/uniapp.md`    |
| WXT extension | `.agents/_core/stacks/wxt.md`       |
| qiankun       | `.agents/_core/stacks/qiankun.md`   |
| CLI           | `.agents/_core/stacks/cli.md`       |
| MCP service   | `.agents/_core/stacks/mcp.md`       |
| VitePress     | `.agents/_core/stacks/vitepress.md` |

Stack 文件只记录 vup 的平台差异，不教框架基础用法。

## 工作原则

- **模板默认自包含**：`src/api/request.ts`
  用原生 fetch（Nuxt 用 ofetch），不默认依赖共享包。`@vup/http`、`@vup/ui`、`@vup/ui-mobile`、`@vup/mock`
  是可选升级——项目已接入时优先复用，未接入时不擅自引入，需要时先
  `vup package add`。
- 优先使用 vup 已有模板和资源：`vup app add`、`vup package add`、`vup example add`；不手搓模板结构替代命令。
- 文件落点按 task 约定执行；不确定目标 app 或模块边界时先查项目文件，再问用户。
- 执行 `vup app add` / `vup package add` / `vup example add`
  后，立即把结果同步进 `.agents/project.md` 的 Apps / Packages / Examples。
- 新增依赖、删除文件、改 workspace 配置、改部署配置前必须说明影响并等用户确认。
- 小改动直接实现；业务规则、UI 细节、数据结构不明确时再停下来问。

## 常用验证

优先使用目标 app/package 自带脚本。找不到脚本时再查看根 `package.json`。

- 全仓库：`pnpm lint:all`、`pnpm build:all`
- 单应用：`pnpm --filter <name> lint`、`pnpm --filter <name> build`
- `workspaceIsolate: true` 的应用在应用目录内运行自己的命令。
