# NestJS 后端模板

基于 NestJS 11 +
TypeScript 的后端服务模板。模板默认保持最小可运行形态，提供应用入口、基础 Controller
/ Service、单元测试、E2E 测试和本地开发用 Docker Compose。

## 技术定位

- **主语是 NestJS API 服务**：适合 REST API、后台服务、BFF 和可拆分的业务模块。
- **模板默认不绑定业务数据库模型**：`docker-compose.yml` 只提供 MariaDB /
  Redis 开发环境示例，实际项目应先确认基础设施选型。
- **ORM 不强行定死**：当前依赖中保留 TypeORM 工具链基础，但数据库模块、实体、迁移入口需要按项目需求接入；如果选择 Prisma 或其它方案，应替换对应配置。
- **共享能力优先拆包**：可复用的纯 TS SDK、client、parser、工具函数优先放到
  `package-template`；Nest 模板只承载服务入口和后端业务模块。

## 快速开始

```bash
pnpm install
pnpm dev
```

默认监听端口：

```txt
http://localhost:9310
```

开发监听模式：

```bash
pnpm dev:watch
```

构建与生产运行：

```bash
pnpm build
pnpm start:prod
```

## 测试与质量

```bash
pnpm test
pnpm test:e2e
pnpm test:cov

pnpm lint
pnpm lint:fix

pnpm format
pnpm format:check
```

## Docker 开发环境

`docker-compose.yml`
是本地开发环境示例，只包含 MariaDB 和 Redis，不包含应用容器。

```bash
pnpm docker:db
pnpm docker:up
pnpm docker:down
pnpm docker:build
pnpm docker:logs
```

默认端口：

| 服务    | 宿主机端口 | 容器端口 | 环境变量     |
| ------- | ---------- | -------- | ------------ |
| Nest    | 9310       | -        | `PORT`       |
| MariaDB | 9306       | 3306     | `MYSQL_PORT` |
| Redis   | 9379       | 6379     | `REDIS_PORT` |

新项目应先确认数据库、缓存、队列、对象存储等基础设施，再调整
`docker-compose.yml` 和 `.env.example`。

## 目录结构

```txt
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts

test/
├── app.e2e-spec.ts
└── jest-e2e.json

docker-compose.yml
nest-cli.json
package.json
tsconfig.json
```

## 模块约定

推荐每个业务模块保持 Nest 标准三件套：

```txt
src/<module>/
├── <module>.module.ts
├── <module>.controller.ts
├── <module>.service.ts
├── dto/
│   ├── create-<module>.dto.ts
│   ├── update-<module>.dto.ts
│   └── query-<module>.dto.ts
├── entities/              # 使用 ORM 时再创建
└── guards/                # 模块级守卫，可选
```

通用能力放在：

```txt
src/common/
├── decorators/
├── filters/
├── guards/
├── interceptors/
├── pipes/
└── types/
```

## 开发建议

- Controller 只负责路由、参数接收和状态码语义。
- Service 放业务逻辑，不把数据库实现细节泄漏到 Controller。
- DTO 使用 `Create*Dto` / `Update*Dto` / `Query*Dto` 命名。
- 需要请求校验时接入 `class-validator` / `class-transformer` 并启用全局
  `ValidationPipe`。
- 需要统一响应格式、异常格式、认证授权时，优先放到 `src/common/`。
- 数据库、缓存、消息队列、对象存储不要按 demo 默认值盲目保留，按项目实际确认后接入。

## 环境变量

示例见 `.env.example`。应用端口使用
`PORT`，Docker 服务端口使用各服务自己的变量。

```bash
PORT=9310
MYSQL_PORT=9306
REDIS_PORT=9379
```

## 相关文档

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [Docker](https://docs.docker.com/)
- [TypeORM](https://typeorm.io/)

## 许可证

MIT License
