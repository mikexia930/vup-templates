# Task: Add Module

## 何时使用

新增业务模块、调整模块边界、拆分模块代码时使用。

## 先读

- `.agent/_core/rules/filesystem.md`
- `.agent/_core/rules/module.md`
- `.agent/_core/rules/quality.md`
- 目标 app 对应的 `.agent/_core/stacks/<stack>.md`

## 执行规则

- 先按 `.agent/_core/rules/module.md` 判断模块边界和平台落点。
- 前端业务模块默认使用 `src/modules/<module>/`。
- Nest 业务模块默认使用 `src/<module>/`，不要放进 `src/modules/`。
- uni-app 使用 `src/pages/<page>/index.vue` 薄入口 + `src/modules/<module>/` 实现。
- 只创建当前任务需要的目录，不为了“完整”创建空目录。

## 注册点

- 新增模块时同步路由、菜单、i18n、store、API/mock 等必要注册点。
- Nest 模块必须通过 module imports 显式接入。
- 删除模块前列出所有注册点和影响面，并等待用户确认。

## 命名

- 目录名用 kebab-case 或项目既有风格。
- 命名细节遵守 `.agent/_core/rules/module.md`。

## 验证

- 目标 app 的 lint/build。
