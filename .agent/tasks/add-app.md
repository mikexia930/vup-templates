# Task: Add App / Package / Example

## 何时使用

用户要初始化项目、添加应用、添加共享包、添加示例工程时使用。

## 先读

- `.agent/rules/filesystem.md`
- 需要判断平台差异时，再读对应 `.agent/stacks/<stack>.md`

## 规则

- 正式应用用 `vup add <app-name>`。
- 共享功能包用 `vup use <package-name>`。
- 示例工程用 `vup example <example-name>`。
- 不手工复制 `apps/`、`packages/`、`examples/` 下的模板目录来替代 vup 命令。
- 命令可能是交互式时，优先让用户执行并回传输出；只有用户明确同意，AI 才走本地拷贝降级方案。

## 完成后

- 更新 `.agent/project.md` 的 Apps / Packages / Examples / Commands。
- 检查目标目录的 `package.json` 名称是否符合用户项目名。
- 如应用声明 `workspaceIsolate: true`，确认 workspace 排除项是否存在。

## 验证

- `pnpm install`
- 目标 app/package 有脚本时运行对应 lint/build。
