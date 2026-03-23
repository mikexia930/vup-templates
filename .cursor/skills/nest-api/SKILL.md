---
name: nest-api
description: >-
  Guide for developing backend APIs using nest-template (NestJS 11 + TypeORM).
  Use when creating REST APIs, backend services, or working in
  apps/nest-template, or when user mentions Nest, NestJS, backend, API server,
  or database.
---

# Nest API 开发指南

基于 `apps/nest-template`，适用于 REST API 后端开发。使用 NestJS 11 + TypeORM +
Express，默认端口 9310。

## 快速开始

```bash
vup add my-api

# 选择 nest 模板，完成后
pnpm install
pnpm --filter my-api dev           # nest start，端口 9310
pnpm --filter my-api dev:watch     # 热重载模式
```

## 目录结构

```
apps/my-api/
├── src/
│   ├── main.ts                    # NestFactory 启动入口
│   ├── app.module.ts              # 根模块
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── auth/                      # 认证模块（需自建）
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── public.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   ├── <module>/                  # 业务模块
│   │   ├── <module>.module.ts
│   │   ├── <module>.controller.ts
│   │   ├── <module>.service.ts
│   │   ├── dto/                   # 请求/响应 DTO
│   │   └── entities/              # TypeORM 实体
│   ├── database/
│   │   └── data-source.ts         # TypeORM 数据源配置
│   └── common/                    # 公共工具（过滤器、管道、拦截器）
├── test/
├── docker-compose.yml             # MariaDB + Redis 等
├── nest-cli.json
└── package.json
```

## 模块化约定

NestJS 按业务域拆分模块，每个模块包含完整的 Controller → Service → Entity 链路：

```
nest g resource user               # 自动生成 CRUD 模块
```

生成的文件：`user.module.ts`、`user.controller.ts`、`user.service.ts`、`dto/`、`entities/`。

## 认证实现

参考 `patterns/auth-login`，后端部分在 Nest 中的具体落地：

### 依赖安装

```bash
pnpm --filter my-api add @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
pnpm --filter my-api add -D @types/passport-jwt @types/bcryptjs
```

### JWT 模块

```typescript
// src/auth/auth.module.ts
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

### JWT Strategy

```typescript
// src/auth/strategies/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number; username: string }) {
    return { id: payload.sub, username: payload.username };
  }
}
```

### 全局 Guard + Public 装饰器

```typescript
// src/main.ts 或 app.module.ts 中全局注册 JwtAuthGuard
// 所有接口默认需要认证，用 @Public() 标记开放接口

// src/auth/decorators/public.decorator.ts
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

### 登录接口

```typescript
// src/auth/auth.controller.ts
@Public()
@Post('login')
async login(@Body() dto: LoginDto) {
  return this.authService.login(dto)
}

@Get('profile')
getProfile(@Req() req) {
  return req.user
}

@Get('permissions')
getPermissions(@Req() req) {
  return this.authService.getPermissions(req.user.id)
}
```

## TypeORM

### 数据源配置

`src/database/data-source.ts` 配置数据库连接，支持 MariaDB/MySQL/PostgreSQL。

### 实体定义

```typescript
// src/user/entities/user.entity.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

### Migration 命令

| 命令                                                   | 说明         |
| ------------------------------------------------------ | ------------ |
| `pnpm migration:generate src/database/migrations/Init` | 生成迁移     |
| `pnpm migration:run`                                   | 执行迁移     |
| `pnpm migration:revert`                                | 回滚迁移     |
| `pnpm migration:show`                                  | 查看迁移状态 |

## Docker

```bash
pnpm docker:db                     # 启动数据库（MariaDB + Redis）
pnpm docker:up                     # 启动所有服务
pnpm docker:logs                   # 查看日志
```

## 统一响应格式

建议通过拦截器统一响应结构，与前端 `ApiResponse<T>` 对齐：

```typescript
// src/common/interceptors/transform.interceptor.ts
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(map((data) => ({ code: 0, data, message: 'success' })));
  }
}
```

## 常用命令

| 命令              | 说明         |
| ----------------- | ------------ |
| `pnpm dev`        | 启动         |
| `pnpm dev:watch`  | 热重载启动   |
| `pnpm build`      | 构建到 dist/ |
| `pnpm start:prod` | 生产启动     |
| `pnpm test`       | 运行测试     |
| `pnpm test:e2e`   | E2E 测试     |

## 注意事项

- 端口通过 `process.env.PORT` 配置，默认 9310
- TypeORM 使用装饰器，需要 `experimentalDecorators`（根 tsconfig 已开启）
- 生产构建到 `dist/` 目录（非 `.output`，与前端不同）
- mcp-template 使用 Fastify，不遵循本模板的 Express 约定
