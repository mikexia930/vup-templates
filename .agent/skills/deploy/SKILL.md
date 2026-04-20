---
name: deploy
description: >-
  Use when deploying any app in the monorepo. Covers Vercel deployment (default
  for frontend), Docker deployment (for Nest backend or self-hosted), and CI/CD
  setup with GitHub Actions. Includes environment variables and secrets
  configuration.
---

# deploy

应用部署 + CI/CD。**默认 Vercel（前端），Docker 可选（后端 / 自托管）。**

## 适用范围

- 前端应用部署（vue / nuxt / vitepress / electron web 版）→ Vercel
- 后端应用部署（nest）→ Docker / 云平台
- CI 检查（lint + build）→ GitHub Actions

## 何时被加载

- new-project Phase 8 部署上线
- 首次配置 CI/CD
- 切换部署方案

## 基座已有基础设施

| 工具           | 现状                                                           |
| -------------- | -------------------------------------------------------------- |
| Vercel CLI     | ✅ `pnpm deploy:prod` / `pnpm deploy:preview`                  |
| GitHub Actions | ✅ `.github/workflows/deploy-vercel.yml`（模板，需替换占位符） |
| release-it     | ✅ `pnpm release`（conventional-changelog + angular preset）   |

## 方案 A：Vercel 部署（前端默认）

### 手动部署

```bash
# 预览环境
pnpm deploy:preview

# 生产环境
pnpm deploy:prod
```

### GitHub Actions 自动部署

基座已有 `.github/workflows/deploy-vercel.yml`，但使用占位符 `{project_name}`。

**接入步骤**：

1. 复制 workflow 文件并替换占位符：

   ```yaml
   paths:
     - 'apps/<your-app>/**'
   # ...
   working-directory: apps/<your-app>
   ```

2. 在 GitHub 仓库 Settings → Secrets 配置：
   - `VERCEL_TOKEN`：Vercel 个人 token
   - `VERCEL_ORG_ID`：Vercel 团队 ID
   - `VERCEL_PROJECT_ID`：Vercel 项目 ID

3. 推送到 main 分支自动触发部署

### 环境变量

Vercel 环境变量在 Vercel Dashboard → Settings → Environment Variables 配置：

- `VITE_API_BASE`（前端构建时注入）
- `NUXT_PUBLIC_API_BASE`（Nuxt 项目）

## 方案 B：Docker 部署（后端 / 自托管）

适用于 Nest 后端或需要自托管的前端。

### Nest 后端 Dockerfile

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter <nest-app> build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/apps/<nest-app>/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### 前端静态部署 Dockerfile（Nginx）

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter <vue-app> build

FROM nginx:alpine
COPY --from=builder /app/apps/<vue-app>/.output /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### docker-compose（后端 + 数据库）

```yaml
version: '3.8'
services:
  api:
    build:
      context: .
      dockerfile: apps/<nest-app>/Dockerfile
    ports:
      - '3000:3000'
    env_file: .env
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${DB_DATABASE}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## CI 检查（GitHub Actions）

基座缺少 lint/build 检查的 CI。推荐补一个：

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install --no-frozen-lockfile
      - run: pnpm lint
      - run: pnpm build:all
```

## 实现步骤

### Step 1：确认部署方案

问用户：

- 前端用 Vercel（默认）还是自托管（Docker + Nginx）？
- 后端用 Docker 还是云平台（AWS / 阿里云）？
- 是否需要 CI 检查（lint + build on PR）？

### Step 2：配置部署

按方案 A 或 B 的步骤执行。

### Step 3：配置 CI（推荐）

补 `.github/workflows/ci.yml`。

### Step 4：验证

- 推送一个 PR，确认 CI 通过
- 合并到 main，确认自动部署成功

## 关键决策点（AI 必须问用户）

1. **部署平台**：Vercel / Docker / 云平台 / 其他？
2. **是否需要 CI**：PR 自动跑 lint + build？
3. **环境区分**：preview / staging / production 几套？
4. **域名**：是否需要自定义域名？
5. **后端数据库**：用什么？部署在哪？

## 产出位置

- Vercel workflow：`.github/workflows/deploy-vercel.yml`
- CI workflow：`.github/workflows/ci.yml`
- Dockerfile：`apps/<app>/Dockerfile`
- docker-compose：项目根 `docker-compose.yml`
- Nginx 配置：`apps/<app>/nginx.conf`

## 资源

```
deploy/
└── SKILL.md            本文件（代码骨架已内嵌）
```
