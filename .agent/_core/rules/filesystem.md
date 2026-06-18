# Filesystem Rules

## 不要手工改语义内容

- `.template.config.json`
- `pnpm-workspace.yaml` / `pnpm.workspace.yaml`
- 根 `eslint.config.js`
- 根 `postcss.config.js`
- 自动生成的 lockfile，除非依赖安装确实需要

## 文件落点

- 应用代码放 `apps/<app>/`。
- 共享能力放 `packages/<package>/`。
- 示例工程放 `examples/<example>/`。
- 非 JS 扩展项目放 `extends/<name>/`，不进入 pnpm workspace。
- 业务模块默认放 `src/modules/<name>/`，除非对应 stack 说明不同。

## 高风险改动

执行前必须说明影响并等用户确认：

- 删除文件或目录
- 改 workspace 范围
- 改部署配置
- 新增外部技术栈
- 大规模移动目录
