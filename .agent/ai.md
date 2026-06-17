# AGENTS.md

你在 vup 项目中工作。vup 已经提供模板、共享包和目录约定；你的任务不是重新设计技术栈，而是在这些约定内完成改动。

## 加载顺序

每次任务只按下面顺序加载必要上下文：

1. 先读 `.agent/project.md`，确认当前项目事实。
2. 再读 `.agent/rules/core.md` 和 `.agent/rules/module.md`。
3. 根据任务只读一个 `.agent/tasks/*.md`。
4. 只有 task 明确要求，才读一个 `.agent/stacks/*.md`。

禁止一次性读取所有 `tasks/` 或所有 `stacks/`。只加载当前任务需要的文件。

## 任务路由

| 用户意图 | 读取 |
| --- | --- |
| 初始化/添加 app、package、example | `.agent/tasks/add-app.md` |
| 新增业务模块、调整模块边界 | `.agent/tasks/add-module.md` |
| 修改已有业务模块 | `.agent/tasks/change-existing-module.md` |
| 新增/修改接口、请求、mock、响应类型 | `.agent/tasks/add-api.md` |
| 新增页面、路由、布局、组件、CRUD | `.agent/tasks/add-page.md` |
| 登录、token、路由守卫、权限、RBAC | `.agent/tasks/add-auth.md` |
| 部署、环境变量、CI、Docker、Vercel | `.agent/tasks/deploy.md` |

如果任务同时命中多个类别，先读最主要的一个 task；只有实现中确实需要，再读取第二个 task。

## Stack 路由

先根据 `.agent/project.md` 或实际文件路径判断目标 app 类型。只有 task 要求查看平台差异时，读取一个 stack：

| 类型 | 读取 |
| --- | --- |
| Vue SPA | `.agent/stacks/vue.md` |
| Nuxt | `.agent/stacks/nuxt.md` |
| NestJS | `.agent/stacks/nest.md` |
| Electron | `.agent/stacks/electron.md` |
| Capacitor | `.agent/stacks/capacitor.md` |
| uni-app | `.agent/stacks/uniapp.md` |
| WXT extension | `.agent/stacks/wxt.md` |
| qiankun | `.agent/stacks/qiankun.md` |
| CLI | `.agent/stacks/cli.md` |
| MCP service | `.agent/stacks/mcp.md` |
| VitePress | `.agent/stacks/vitepress.md` |

Stack 文件只记录 vup 的平台差异，不教框架基础用法。

## 工作原则

- 优先使用 vup 已有模板和共享包：`vup add`、`vup use`、`vup example`。
- 不手搓模板结构，不绕开 `@vup/http`、`@vup/ui`、`@vup/ui-mobile` 等已有能力。
- 文件落点按 task 约定执行；不确定目标 app 或模块边界时先查项目文件，再问用户。
- 新增依赖、删除文件、改 workspace 配置、改部署配置前必须说明影响并等用户确认。
- 小改动直接实现；业务规则、UI 细节、数据结构不明确时再停下来问。

## 常用验证

优先使用目标 app/package 自带脚本。找不到脚本时再查看根 `package.json`。

- 全仓库：`pnpm lint:all`、`pnpm build:all`
- 单应用：`pnpm --filter <name> lint`、`pnpm --filter <name> build`
- `workspaceIsolate: true` 的应用在应用目录内运行自己的命令。
