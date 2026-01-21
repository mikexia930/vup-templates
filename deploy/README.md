# 🚀 Docker 部署方案

基于 Docker Compose 的生产环境部署方案，适用于中小型应用（DAU ≤ 5000）。

## ✨ 特性

- 🐳 **Docker Compose** - 一键启动所有服务
- 📦 **Volume 映射** - 更新时只需替换文件并重启，无需 rebuild 镜像
- 🔒 **资源限制** - CPU、内存、进程数限制，防止资源耗尽
- 📊 **健康检查** - 自动检测服务健康状态
- 🔄 **自动重启** - 服务异常时自动重启
- 📝 **日志管理** - 统一的日志收集和轮转
- 💾 **数据持久化** - 数据库和上传文件持久化存储
- 🔐 **HTTPS 支持** - 可选的 SSL/TLS 加密

## 🏗️ 架构说明

### 服务组成

```
┌─────────────┐
│   Nginx     │ ← 反向代理、静态文件服务
│  (80/443)   │
└──────┬──────┘
       │
       ├──────────────┬──────────────┐
       │              │              │
┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐
│   Admin     │ │    API    │ │  MariaDB  │
│  (Nuxt)     │ │ (NestJS)  │ │  (11.3)   │
│   :3000     │ │  :9310    │ │   :3306   │
└─────────────┘ └───────────┘ └───────────┘
```

### 目录结构

```
deploy/
├── docker-compose.yml    # Docker Compose 配置
├── .env                  # 环境变量配置（需手动创建，参考 .env.example）
├── nginx/                # Nginx 配置
│   ├── nginx.conf        # 主配置文件
│   ├── conf.d/           # 站点配置
│   └── ssl/              # SSL 证书（可选）
├── scripts/              # 部署脚本
│   ├── backup.sh         # 数据库备份
│   ├── restore.sh        # 数据库恢复
│   ├── cleanup.sh        # 清理脚本
│   └── monitor.sh        # 监控脚本
├── builds/               # 构建产物目录（需手动创建）
│   ├── api/              # API 构建产物
│   └── frontend/         # 前端构建产物
├── data/                 # 数据目录（自动创建）
│   ├── mariadb/          # 数据库数据
│   └── uploads/          # 上传文件
├── logs/                 # 日志目录（自动创建）
│   ├── api/              # API 日志
│   ├── frontend/         # Frontend 日志
│   └── nginx/            # Nginx 日志
└── backups/              # 备份目录（自动创建）
    ├── mariadb/          # 数据库备份
    └── api/              # API 备份
```

## 🚀 快速开始

### 1. 环境准备

- Docker 20.10+
- Docker Compose 2.0+
- 至少 2GB 可用内存
- 至少 10GB 可用磁盘空间

### 2. 构建应用

在项目根目录执行：

```bash
# 构建 API 服务（仅示例，请根据实际项目路径调整）
cd apps/nest-template
pnpm build
cp -r .output ../../deploy/builds/api

# 构建 Admin 前端（仅示例，请根据实际项目路径调整）
cd apps/nuxt-template
pnpm build
cp -r .output ../../deploy/builds/admin
```

### 3. 配置环境变量

创建 `.env` 文件：

```bash
cd deploy
cp .env.example .env
```

编辑 `.env` 文件，配置以下变量：

```bash
# 数据库配置
MYSQL_DATABASE=vup_db
MYSQL_USER=vup_user
MYSQL_PASSWORD=your_secure_password
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_PORT=3306

# API 配置
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
UPLOAD_MAX_FILE_SIZE=1073741824
UPLOAD_BASE_URL=https://yourdomain.com/uploads

# Admin 配置
API_BASE_URL=https://yourdomain.com/api
APP_BASE_URL=https://yourdomain.com

# 端口配置
HTTP_PORT=80
HTTPS_PORT=443
```

### 4. 启动服务

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 5. 运行数据库迁移

```bash
# 运行迁移（首次部署）
docker-compose --profile migration run --rm migration
```

## 📦 服务管理

### 启动服务

```bash
docker-compose up -d
```

### 停止服务

```bash
docker-compose stop
```

### 重启服务

```bash
# 重启所有服务
docker-compose restart

# 重启单个服务
docker-compose restart api
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看单个服务日志
docker-compose logs -f api
docker-compose logs -f admin
docker-compose logs -f nginx
docker-compose logs -f mariadb
```

### 进入容器

```bash
# 进入 API 容器
docker-compose exec api sh

# 进入数据库容器
docker-compose exec mariadb mysql -u root -p
```

## 🔄 更新部署

### 更新 API 服务

```bash
# 1. 构建新版本（仅示例，请根据实际项目路径调整）
cd apps/nest-template
pnpm build

# 2. 复制构建产物
cp -r .output ../../deploy/builds/api

# 3. 重启服务
cd ../../deploy
docker-compose restart api
```

### 更新 Admin 前端

```bash
# 1. 构建新版本（仅示例，请根据实际项目路径调整）
cd apps/nuxt-template
pnpm build

# 2. 复制构建产物
cp -r .output ../../deploy/builds/admin

# 3. 重启服务
cd ../../deploy
docker-compose restart admin
```

### 更新数据库

```bash
# 运行迁移
docker-compose --profile migration run --rm migration
```

## 💾 数据备份与恢复

### 自动备份

配置定时任务（每日凌晨 2:00）：

```bash
# 编辑 crontab
crontab -e

# 添加以下行
0 2 * * * cd /path/to/deploy && ./scripts/backup.sh >> logs/backup.log 2>&1
```

### 手动备份

```bash
./scripts/backup.sh
```

### 恢复数据库

```bash
# 查看备份列表
ls -lh backups/mariadb/

# 恢复指定备份
./scripts/restore.sh backups/mariadb/backup_20240101_020000.sql.gz
```

详细说明请参考 [scripts/README.md](./scripts/README.md)

## 📊 监控与维护

### 查看服务状态

```bash
# 使用监控脚本
./scripts/monitor.sh

# 或使用 Docker 命令
docker-compose ps
docker stats
```

### 清理资源

```bash
# 运行清理脚本（清理旧日志、备份等）
./scripts/cleanup.sh
```

### 健康检查

```bash
# 检查 API 健康状态
curl http://localhost/api/health

# 检查 Admin 健康状态
curl http://localhost/admin/health
```

## 🔧 配置说明

### 资源限制

服务资源限制配置在 `docker-compose.yml` 中：

- **MariaDB**: CPU 0.8核 / 内存 1GB
- **API**: CPU 0.6核 / 内存 512MB
- **Admin**: CPU 0.2核 / 内存 256MB
- **Nginx**: CPU 0.2核 / 内存 128MB

可根据实际需求调整。

### 端口配置

- **HTTP**: 80（默认，可通过 `HTTP_PORT` 环境变量修改）
- **HTTPS**: 443（默认，可通过 `HTTPS_PORT` 环境变量修改）
- **MariaDB**: 3306（默认，可通过 `MYSQL_PORT` 环境变量修改）

### Nginx 配置

详细配置说明请参考 [nginx/README.md](./nginx/README.md)

## 🔐 HTTPS 配置

### 使用 Let's Encrypt（推荐）

由于 nginx 容器已映射 `./nginx/ssl:/etc/nginx/ssl:ro`，只需将证书文件放在主机的
`nginx/ssl/` 目录即可被容器访问。

1. 将证书文件复制到 `nginx/ssl/` 目录：
   ```bash
    cert.pem
    key.pem
   ```
2. 取消注释 `nginx/conf.d/default.conf` 中的 HTTPS server 块
3. 重启 Nginx：
   ```bash
   docker-compose restart nginx
   ```

### 使用自签名证书（仅测试）

```bash
# 生成自签名证书
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem
```

## 🐛 故障排查

### 服务无法启动

```bash
# 检查服务状态
docker-compose ps

# 查看错误日志
docker-compose logs [service_name]

# 检查端口占用
netstat -tulpn | grep :80
netstat -tulpn | grep :3306
```

### 数据库连接失败

```bash
# 检查数据库容器状态
docker-compose ps mariadb

# 检查数据库日志
docker-compose logs mariadb

# 测试数据库连接
docker-compose exec mariadb mysql -u root -p
```

### 502 Bad Gateway

```bash
# 检查后端服务是否运行
docker-compose ps api
docker-compose ps admin

# 检查服务日志
docker-compose logs api
docker-compose logs admin

# 检查 Nginx 配置
docker-compose exec nginx nginx -t
```

### 磁盘空间不足

```bash
# 查看磁盘使用情况
df -h

# 运行清理脚本
./scripts/cleanup.sh

# 清理 Docker 未使用的资源
docker system prune -a
```

## 📚 相关文档

- [Nginx 配置说明](./nginx/README.md)
- [部署脚本说明](./scripts/README.md)
- [Docker Compose 官方文档](https://docs.docker.com/compose/)
- [MariaDB 官方文档](https://mariadb.org/documentation/)

## ⚠️ 注意事项

1. **生产环境**：务必修改默认密码和密钥
2. **数据备份**：定期备份数据库和上传文件
3. **安全更新**：定期更新 Docker 镜像和依赖
4. **资源监控**：监控服务器资源使用情况
5. **日志管理**：定期清理旧日志，避免磁盘占满
6. **HTTPS**：生产环境必须启用 HTTPS
7. **防火墙**：配置防火墙规则，只开放必要端口

## 🎯 最佳实践

1. **使用环境变量**：敏感信息通过 `.env` 文件管理，不要提交到 Git
2. **定期备份**：配置自动备份任务，保留多份备份
3. **监控告警**：配置监控脚本和告警机制
4. **日志轮转**：配置日志轮转，避免日志文件过大
5. **资源限制**：合理设置资源限制，防止单服务占用过多资源
6. **健康检查**：定期检查服务健康状态
7. **版本管理**：记录每次部署的版本和变更

---

**Happy Deploying! 🚀**
