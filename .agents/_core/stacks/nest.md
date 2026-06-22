# Stack: Nest

- 目标目录通常是 `apps/<nest-app>/`。
- Nest 本身就是 module-first；业务模块放 `src/<module>/`，不要放进
  `src/modules/`。
- 每个 feature module 自包含 module/controller/service/dto/entities。
- 新模块必须通过 `AppModule` 或上级模块 imports 显式接入。
- 删除模块时检查 module
  imports、providers/controllers、entities、seed、migration。
- 共享能力放 `src/common/`。
- 数据库相关放 `src/database/` 或项目既有目录。
- DTO 使用 class-validator / class-transformer 时，保持请求/响应类型清晰。
- `docker-compose.yml`
  默认可能只是 demo，真实项目按用户选择的数据库、缓存、队列改。
- 环境变量写 `.env.example`，不要提交 `.env`。
- 新增数据库、缓存、队列前必须让用户确认选型和端口。
