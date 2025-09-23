# NestJS 后端开发模板

基于 NestJS +
TypeScript 的现代化后端开发模板，支持模块化架构、依赖注入、测试和完整的开发工具链。

## 🚀 技术栈

### 核心框架

- **NestJS** - 基于 Node.js 的企业级应用框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Express** - 基于 Express 的 HTTP 服务器

### 数据库

- **MariaDB** - 开源关系型数据库
- **Redis** - 内存数据结构存储

### 开发工具

- **Jest** - JavaScript 测试框架
- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **Docker** - 容器化部署

### 功能特性

- **依赖注入** - 完整的 IoC 容器
- **模块化架构** - 清晰的代码组织结构
- **装饰器** - 基于装饰器的编程模式
- **中间件** - 请求处理中间件
- **守卫** - 认证和授权
- **拦截器** - 请求/响应拦截
- **管道** - 数据验证和转换

## 📚 文档地址

### 核心技术

- [NestJS 官方文档](https://nestjs.com/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Express 官方文档](https://expressjs.com/)

### 数据库

- [MariaDB 官方文档](https://mariadb.org/documentation/)
- [Redis 官方文档](https://redis.io/docs/)

### 测试框架

- [Jest 官方文档](https://jestjs.io/)
- [Supertest 官方文档](https://github.com/visionmedia/supertest)

### 开发工具

- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
- [Docker 官方文档](https://docs.docker.com/)

## 🛠️ 使用方式

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动开发服务器（监听文件变化）
pnpm dev:watch

# 启动开发服务器
pnpm dev

# 调试模式
pnpm start:debug
```

### 构建项目

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start:prod
```

### 测试

```bash
# 运行单元测试
pnpm test

# 监听模式运行测试
pnpm test:watch

# 生成测试覆盖率报告
pnpm test:cov

# 调试测试
pnpm test:debug

# 运行端到端测试
pnpm test:e2e
```

### 代码检查

```bash
# 检查代码质量
pnpm lint

# 自动修复问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化代码
pnpm format

# 检查格式
pnpm format:check
```

## 🐳 Docker 支持

### 启动服务

```bash
# 启动所有服务
pnpm docker:up

# 启动数据库服务
pnpm docker:db

# 启动应用服务
pnpm docker:app
```

### 管理服务

```bash
# 停止所有服务
pnpm docker:down

# 重新构建镜像
pnpm docker:build

# 查看服务日志
pnpm docker:logs
```

## 📁 项目结构

```
nest-template/
├── src/
│   ├── app.controller.spec.ts  # 控制器测试
│   ├── app.controller.ts       # 应用控制器
│   ├── app.module.ts          # 应用模块
│   ├── app.service.ts         # 应用服务
│   └── main.ts                # 应用入口
├── test/
│   ├── app.e2e-spec.ts        # 端到端测试
│   └── jest-e2e.json          # E2E 测试配置
├── docker-compose.yml         # Docker 编排文件
├── nest-cli.json              # NestJS CLI 配置
├── package.json               # 项目配置
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目说明
```

## ✨ 特性

### 核心特性

- 🎯 **TypeScript 支持** - 完整的类型安全
- 🏗️ **模块化架构** - 清晰的代码组织结构
- 💉 **依赖注入** - 完整的 IoC 容器
- 🎨 **装饰器** - 基于装饰器的编程模式
- 🔧 **代码规范** - ESLint + Prettier

### NestJS 特性

- 🛣️ **路由系统** - 基于装饰器的路由定义
- 🛡️ **守卫系统** - 认证和授权
- 🔄 **拦截器** - 请求/响应拦截
- 📝 **管道** - 数据验证和转换
- 🏪 **服务** - 业务逻辑封装
- 📦 **模块** - 功能模块化

### 开发特性

- 🔧 **热重载** - 开发时自动重新加载
- 🧪 **测试支持** - 单元测试和 E2E 测试
- 📊 **测试覆盖率** - 完整的测试覆盖率报告
- 🐳 **Docker 支持** - 容器化部署
- 📝 **代码规范** - ESLint + Prettier

## 🏗️ 模块化架构

### 创建新模块

```typescript
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### 创建控制器

```typescript
// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
```

### 创建服务

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    const user = { id: Date.now(), ...createUserDto };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
```

### 创建 DTO

```typescript
// src/users/dto/create-user.dto.ts
export class CreateUserDto {
  name: string;
  email: string;
  age: number;
}
```

## 🛡️ 守卫和中间件

### 创建守卫

```typescript
// src/auth/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any): boolean {
    // 实现认证逻辑
    return true;
  }
}
```

### 创建中间件

```typescript
// src/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  }
}
```

## 🧪 测试

### 单元测试

```typescript
// src/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto = { name: 'John', email: 'john@example.com', age: 30 };
    const user = service.create(createUserDto);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John');
  });
});
```

### E2E 测试

```typescript
// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```

## 🐳 Docker 部署

### 开发环境

```bash
# 启动数据库服务
pnpm docker:db

# 启动应用（需要先构建）
pnpm docker:app
```

### 生产环境

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN pnpm install

COPY . .
RUN pnpm build

EXPOSE 9310

CMD ["pnpm", "start:prod"]
```

### Docker Compose 配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '9310:9310'
    environment:
      - NODE_ENV=production
    depends_on:
      - mariadb
      - redis

  mariadb:
    image: mariadb:11.3
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: nestdb
    ports:
      - '9306:3306'

  redis:
    image: redis:7.2-alpine
    ports:
      - '9379:6379'
```

## 🔧 配置管理

### 环境变量

```typescript
// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 9310,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'nestdb',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
});
```

### 配置模块

```typescript
// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
```

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd nest-template
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev:watch
   ```

4. **访问应用**
   - 打开 http://localhost:9310
   - 查看 API 响应

5. **运行测试**

   ```bash
   pnpm test
   ```

6. **启动 Docker 服务**
   ```bash
   pnpm docker:up
   ```

## 📄 许可证

MIT License
