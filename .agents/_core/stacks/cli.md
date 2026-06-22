# Stack: CLI

- 命令注册集中在 CLI 入口。
- 单个命令放到 `src/commands/<name>/` 或项目既有结构。
- 文案走 i18n，不要只写一种语言。
- 文件操作使用项目已有 FileManager/Logger 等工具。
- 交互式命令要处理取消场景。
- 会删除/覆盖文件的命令必须有确认或 `--force`。
