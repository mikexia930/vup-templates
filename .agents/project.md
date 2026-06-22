# Project Facts

本文件记录当前 vup 项目的事实。AI 开始任务前先读这里，再查实际文件确认。

## Apps

<!-- 示例：
- `apps/admin`: vue
- `apps/api`: nest
-->

## Packages

<!-- 示例：
- `packages/http`: @vup/http
- `packages/ui`: @vup/ui
-->

## Examples

<!-- 示例：
- `examples/mock`: mock 接入示例
-->

## Commands

- install: `pnpm install`
- lint all: `pnpm lint:all`
- build all: `pnpm build:all`

## Module Style

- Architecture: module-first
- Frontend modules: `src/modules/<module>/`
- uni-app pages: `src/pages/<page>/index.vue` as thin entries, business in
  `src/modules/<module>/`
- Nest modules: `src/<module>/`, not `src/modules/<module>/`

## Reference Style

- Follow existing modules in this project first.
- If this project intentionally follows a reference implementation, record its
  path/name here.

## Notes

- 如果本文件与实际目录不一致，以实际目录和 `package.json`
  为准，并在本文件补充事实。
- `workspaceIsolate: true` 的应用在应用目录内独立安装和运行命令。
