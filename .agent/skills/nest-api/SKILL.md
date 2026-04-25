---
name: nest-api
description: >-
  Use when implementing backend features in nest-template projects (NestJS +
  TypeScript). Covers nest-specific concerns: module/controller/ service
  pattern, guards, DTOs, validation pipes, TypeORM/Prisma entities, exception
  filters. Reusable pure TypeScript SDK/client/parser work belongs to
  package-template. For frontend concerns, load the corresponding frontend stack
  and capability skills.
---

# nest-api

基于 `nest-template` 的 NestJS 后端开发。**只管后端特有的事**。

## 适用场景

- RESTful API 服务
- 对应目录：`apps/<nest-app>/`

## 何时被加载

- new-project Phase 7 选定 nest 栈
- new-feature 在 nest 项目中加新模块 / 接口
- maintenance 修后端 bug
- 前端 skill 涉及后端接口约定时（如 permission-rbac 的 RolesGuard）

## Nest 平台特有约定

### 1. Module / Controller / Service 三件套

每个业务模块固定结构：

```
src/<module>/
├── <module>.module.ts         模块声明
├── <module>.controller.ts     路由 + 参数校验
├── <module>.service.ts        业务逻辑
├── dto/                       请求 / 响应 DTO
│   ├── create-<module>.dto.ts
│   └── update-<module>.dto.ts
├── entities/                  数据库实体
│   └── <module>.entity.ts
└── guards/                    模块级守卫（可选）
```

### 2. 共享层

```
src/common/
├── decorators/                自定义装饰器（@Roles / @Public）
├── filters/                   异常过滤器
├── guards/                    全局守卫（JwtAuthGuard / RolesGuard）
├── interceptors/              响应拦截器（统一包装 ApiResponse）
├── pipes/                     全局管道（ValidationPipe）
└── types/                     共享类型
```

### 3. 统一响应格式

与前端 `ApiResponse` 对齐：

```typescript
// 响应拦截器统一包装
{
  code: 0,          // 0 = 成功
  data: T,
  message: 'ok'
}
```

### 4. DTO 校验

```typescript
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}
```

- 全局启用 `ValidationPipe`（`transform: true, whitelist: true`）
- DTO 命名：`Create*Dto` / `Update*Dto` / `Query*Dto`

### 5. 认证与授权

```typescript
// JWT 认证守卫
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: User) { ... }

// RBAC 角色守卫
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':id')
remove(@Param('id') id: number) { ... }

// 公开接口（跳过认证）
@Public()
@Post('login')
login(@Body() dto: LoginDto) { ... }
```

### 6. 数据库

基座不强制 ORM 选型。常见选择：

- **TypeORM**：成熟，装饰器风格，与 Nest 集成好
- **Prisma**：类型安全，schema-first，迁移方便

AI 必须问用户选哪个（见决策点）。模板可能预装 TypeORM 相关依赖或脚本，但不代表业务已经完成数据库模块、实体和迁移入口接入；接入前仍要确认项目实际方案。

### 7. Docker 开发环境

基座提供的 `docker-compose.yml` **是 demo**（MariaDB +
Redis），不代表每个项目都用这些。当前 compose 默认只承载本地基础设施，不包含应用容器。

开发前必须与用户确认基础设施选型，然后按需修改 `docker-compose.yml`：

| 基础设施 | 可选方案                                        | demo 默认    |
| -------- | ----------------------------------------------- | ------------ |
| 数据库   | MySQL / MariaDB / PostgreSQL / MongoDB / SQLite | MariaDB 11.3 |
| 缓存     | Redis / 无                                      | Redis 7.2    |
| 消息队列 | RabbitMQ / Kafka / BullMQ / 无                  | 无           |
| 对象存储 | MinIO / S3 / 无                                 | 无           |
| 搜索引擎 | Elasticsearch / 无                              | 无           |

#### 端口约定

demo 默认端口**故意使用非标准端口**，避免与本地已有服务冲突：

| 服务     | 默认端口 | 标准端口 | 环境变量     |
| -------- | -------- | -------- | ------------ |
| Nest App | 9310     | 3000     | `PORT`       |
| MariaDB  | 9306     | 3306     | `MYSQL_PORT` |
| Redis    | 9379     | 6379     | `REDIS_PORT` |

**开发前必须与用户确认端口**，避免与其他项目 / 本地服务冲突。端口通过 `.env`
配置，`docker-compose.yml` 用 `${MYSQL_PORT:-9306}` 读取。

#### docker 命令

```bash
pnpm docker:db          # 只起数据库 + 缓存
pnpm docker:up          # 起 docker-compose 中定义的服务
pnpm docker:down        # 停止所有服务
pnpm docker:build       # 重建容器
pnpm docker:logs        # 查看日志
```

### 8. 环境变量

```bash
# .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_DATABASE=myapp
JWT_SECRET=xxx
JWT_EXPIRES_IN=15m
```

通过 `@nestjs/config` 的 `ConfigService` 读取。

## 实现新模块的步骤

1. 与用户确认模块名和接口清单
2. `nest g module <name>` + `nest g controller <name>` + `nest g service <name>`
3. 创建 DTO（Create / Update / Query）
4. 创建 Entity（如需数据库）
5. 实现 Service 业务逻辑
6. 实现 Controller 路由
7. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **ORM 选型**：TypeORM 还是 Prisma？
2. **数据库**：PostgreSQL / MySQL / MariaDB / SQLite / MongoDB？
3. **缓存**：是否需要 Redis？
4. **消息队列**：是否需要？RabbitMQ / BullMQ / Kafka？
5. **认证方式**：JWT（推荐）/ Session / OAuth？
6. **是否需要 Swagger**：自动生成 API 文档？
7. **是否需要 RBAC**：角色权限控制？（详见 `permission-rbac` skill 的后端段）
8. **端口号**：各服务用什么端口？有没有已占用的端口需要避让？
9. **Docker 环境**：本地是否已安装 Docker？是否用 docker-compose 管理开发环境？
10. **是否需要拆包**：可复用的纯 TS SDK / client / parser 应拆到
    `package-template`，不要塞进 Nest 应用层

## 产出位置

- 模块代码：`apps/<nest>/src/<module>/`
- 共享代码：`apps/<nest>/src/common/`
- 数据库配置：`apps/<nest>/src/database/`
- 环境变量：`apps/<nest>/.env`（不提交，只提交 `.env.example`）

## 资源

```
nest-api/
└── SKILL.md            本文件
```

Nest 官方文档：https://docs.nestjs.com/
