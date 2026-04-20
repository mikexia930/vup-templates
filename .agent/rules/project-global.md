# 全局项目约束

## 禁止修改的文件

以下文件由 vup-cli 或基座管理，不要修改：

- `.template.config.json`（vup-cli 模板清单）
- `pnpm-workspace.yaml`（workspace 排除规则）
- 根 `eslint.config.js`（全局 lint 配置）
- 根 `postcss.config.js`（全局 PostCSS 配置）

## 依赖管理

**触发**：AI 需要安装新依赖时，必须先列出包名 + 安装位置 + 理由，等用户确认后才能执行。
**禁忌**：AI 不得直接执行 `pnpm add`，不得把业务依赖装到根 `package.json`。

- **新增依赖加到子应用的
  `package.json`**，不要加到根目录——除非是所有应用共用的基础依赖
- 安装后确认 `pnpm install` 能正常执行
- `uniapp-*` 应用独立于 workspace，在应用目录内单独 `pnpm install`
- `extends/` 下的非 JS 项目独立管理依赖，不进入 pnpm workspace（详见
  `extends/README.md`）

## Demo 模块

基座每个模板都包含
`modules/demo/`（或类似示例模块），用于展示推荐的代码组织方式。

- **demo 是示例，不是业务代码**——开始做真实需求时可以删除
- 删除前必须问用户确认（属于「需要删除文件」的 Hard Gate）
- 删除范围：`modules/demo/` 整个目录 + 对应的路由配置 + 对应的 mock handler
- 保留与否取决于用户：有些团队喜欢留着当参考
- **docker-compose.yml 也是 demo**：nest-template 的 docker-compose.yml 默认配置（MariaDB +
  Redis）是示例，做真实项目时必须按用户选择的基础设施替换

## 环境变量

- **不要提交 `.env` 文件**，只提交 `.env.example` 作为模板
- 敏感信息（API 密钥、JWT Secret、数据库密码）绝对不能写入代码或提交到仓库
- 前端变量前缀：`VITE_`（Vue 系）、`NUXT_PUBLIC_`（Nuxt）
- 后端变量无前缀限制，通过 `process.env` 读取

## 代码风格

- 注释用中文，代码用英文（变量名、函数名、类名）
- 提交前由 lint-staged 自动执行 ESLint fix + Prettier format，不要手动关闭
- 调试用的 `console.log`
  在提交前应清理（ESLint 未强制禁用，但不应残留在最终代码中）
