# Nginx 配置说明

## 目录结构

```
nginx/
├── nginx.conf          # Nginx 主配置文件
├── conf.d/             # 站点配置文件目录
│   └── default.conf    # 默认站点配置
├── ssl/                # SSL 证书目录（可选）
│   ├── cert.pem        # SSL 证书
│   └── key.pem         # SSL 私钥
└── logs/               # Nginx 日志目录
    ├── access.log      # 访问日志
    └── error.log       # 错误日志
```

## 配置说明

### 路由配置

- `/api/` → `http://api:9310/api/` - API 服务
- `/frontend/` → `http://frontend:3000/` - Admin 前端服务
- `/uploads/` → 静态文件服务（从 volume 挂载）
- `/` → 重定向到 `/frontend/`
- `/health` → 健康检查端点

### 功能特性

1. **反向代理**：API 和 Admin 服务通过反向代理访问
2. **静态文件服务**：上传文件通过 Nginx 直接提供
3. **文件上传支持**：最大上传大小 1GB
4. **Gzip 压缩**：启用 Gzip 压缩提升性能
5. **缓存控制**：上传文件缓存 30 天
6. **CORS 支持**：上传文件支持跨域访问

## 测试配置

### 1. 测试配置文件语法

```bash
# 在容器内测试
docker compose exec nginx nginx -t

# 或者直接使用 nginx 镜像测试
docker run --rm -v $(pwd)/nginx:/etc/nginx:ro nginx:alpine nginx -t
```

### 2. 重新加载配置（不中断服务）

```bash
docker compose exec nginx nginx -s reload
```

### 3. 查看日志

```bash
# 查看访问日志
docker compose exec nginx tail -f /var/log/nginx/access.log

# 查看错误日志
docker compose exec nginx tail -f /var/log/nginx/error.log

# 或者直接查看本地日志文件
tail -f nginx/logs/access.log
tail -f nginx/logs/error.log
```

## HTTPS 配置（可选）

如果需要启用 HTTPS：

1. 将 SSL 证书文件放到 `nginx/ssl/` 目录：
   - `cert.pem` - SSL 证书
   - `key.pem` - SSL 私钥

2. 取消注释 `default.conf` 中的 HTTPS server 块

3. 修改 `server_name` 为实际域名

4. 重启 nginx 服务：
   ```bash
   docker-compose restart nginx
   ```

## 注意事项

1. **Admin 端口**：确保 Admin 服务运行在 3000 端口（Nuxt SSR 默认端口）
2. **API 端口**：确保 API 服务运行在 9310 端口
3. **文件权限**：确保 `nginx/logs` 目录有写入权限
4. **SSL 证书**：生产环境建议使用 Let's Encrypt 免费证书

## 常见问题

### 502 Bad Gateway

- 检查 API 或 Admin 服务是否正常运行
- 检查服务名称是否正确（`api`、`frontend`）
- 检查端口是否正确（API: 9310, Admin: 3000）

### 403 Forbidden

- 检查文件权限
- 检查 `uploads` 目录是否存在

### 413 Request Entity Too Large

- 检查 `client_max_body_size` 设置
- 检查 API 服务的 `UPLOAD_MAX_FILE_SIZE` 环境变量
