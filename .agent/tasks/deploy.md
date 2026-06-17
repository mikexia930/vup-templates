# Task: Deploy

## 何时使用

部署、预览环境、生产环境变量、CI、Docker、Nginx、Vercel 配置使用。

## 先读

- `.agent/rules/filesystem.md`
- 目标 app 对应的 `.agent/stacks/<stack>.md`

## 规则

- 前端静态/SSR 项目优先看项目已有 Vercel 配置。
- 后端服务优先看 Dockerfile / docker-compose / CI 配置。
- 环境变量只写 `.env.example`，不要提交 `.env`。
- 敏感值不要写进代码、README、CI 明文配置。
- 改生产部署配置前必须说明影响范围并等用户确认。

## 文件落点

- App Dockerfile：`apps/<app>/Dockerfile`
- Nginx：`apps/<app>/nginx.conf` 或 `deploy/nginx/`
- CI：`.github/workflows/`
- Vercel：根 `vercel.json` 或 app 既有配置
- 环境模板：`apps/<app>/.env.example`

## 验证

- 构建目标 app。
- Docker 相关改动尽量运行 build；无法运行时说明原因。
- CI 配置改动后检查路径过滤和 working-directory。
