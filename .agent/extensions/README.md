# .agent/extensions/

项目安装的第三方或团队自定义 skill 放在这里。

约定：

- vup 自带规则只放在 `.agent/_core/`，由模板和 `vup skill` 管理。
- 扩展 skill 使用 `.agent/extensions/<name>/`，不要写入 `_core`。
- 扩展可以补充领域知识、平台发布流程、团队偏好或产品上下文。
- 扩展不应覆盖 `_core` 中的模块拆分、文件落点、质量检查和发版边界。

