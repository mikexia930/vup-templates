# VitePress 自动部署到 Vercel

## 自动部署（推荐）

### 1. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

- `VERCEL_TOKEN`: Vercel 访问令牌
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_PROJECT_ID`: Vercel 项目 ID

### 2. 获取 Vercel 配置信息

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 在项目目录中初始化
cd apps/vitepress-template
vercel

# 获取项目信息
vercel env ls
```

### 3. 自动触发

- **推送到 main/master 分支**：自动部署到生产环境
- **创建 Pull Request**：自动部署预览环境

## 手动部署

### 1. 本地部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 进入项目目录
cd apps/vitepress-template

# 部署到预览环境
pnpm deploy:preview

# 部署到生产环境
pnpm deploy
```

### 2. 使用 Vercel CLI

```bash
# 构建项目
pnpm build

# 部署到 Vercel
vercel --prod
```

## 配置说明

### vercel.json 配置

- `buildCommand`: 构建命令
- `outputDirectory`: 输出目录（.output）
- `rewrites`: SPA 路由重写规则
- `headers`: 缓存策略

### GitHub Actions 工作流

- 监听 `apps/vitepress-template/**` 和 `_shared/**` 路径变化
- 自动安装依赖、构建、部署
- 支持预览和生产环境

## 环境变量

如果需要环境变量，在 Vercel 项目设置中添加：

```bash
# 在 Vercel 控制台添加
NODE_ENV=production
VITE_APP_TITLE=My VitePress Site
```

## 自定义域名

1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录指向 Vercel
3. 启用 HTTPS（自动）

## 监控和日志

- **部署状态**: GitHub Actions 页面
- **Vercel 日志**: Vercel 控制台
- **性能监控**: Vercel Analytics
