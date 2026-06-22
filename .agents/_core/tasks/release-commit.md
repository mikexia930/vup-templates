# Task: Release Commit

## 何时使用

用户要求发版、生成 release
commit、打 tag、准备 push、检查为什么 push 会触发发布时使用。

## 先读

- `.agents/_core/rules/core.md`
- `.agents/_core/rules/filesystem.md`
- `.agents/project.md`

## 原则

- release commit 负责版本、changelog、tag；deploy 负责线上部署。
- 不把 `git push`
  当普通验证步骤，因为 push 到 main/master 可能触发 Vercel 生产发布。
- 不自动执行 `git push`、`npm publish`、`vercel --prod`；必须得到用户明确确认。
- 不在 release 过程中修改业务代码，除非用户明确要求修复 release blocker。

## 发布前检查

1. 查看当前分支：`git branch --show-current`
2. 查看工作区：`git status --short`
3. 查看版本：`package.json` 的 `version`
4. 查看 release 配置：`package.json` 的 `release-it`
5. 确认是否存在当前版本 tag：`git rev-parse v<version>`
6. 确认 push 目标分支是否会触发部署：检查
   `.github/workflows/`、`vercel.json`、项目 README

## 质量检查

按项目实际脚本选择：

- `pnpm lint:all`
- `pnpm type-check:all`
- `pnpm build:all`
- 单 app/package 的 lint/build/test

无法运行时说明原因，不要假装通过。

## 生成 release commit

默认使用项目已有 release 工具：

```sh
pnpm release
```

执行前必须说明它可能做的事：

- 修改 `package.json` version
- 更新 `CHANGELOG.md`
- 创建 release commit
- 创建 git tag

如果项目配置 `release-it.git.push=false`，release
commit/tag 不会自动 push；仍需用户确认后再 push。

## Push Gate

只有用户明确说“push / 推送 / 发布到远端”时才执行 push。执行前必须汇报：

- 当前分支
- 将推送的 remote/branch
- 是否包含 tag
- 是否会触发 Vercel/GitHub Actions 生产部署

常见命令：

```sh
git push origin <branch>
git push origin --tags
```

如果生产部署由 push 触发，必须再次确认用户是否要继续。

## 失败处理

- release 失败时保留错误信息，先解释原因。
- 不自动反复重试。
- 不自动改 tag、删 tag、reset、force push。
- 需要删除 tag、改历史、force push 时必须单独确认。
