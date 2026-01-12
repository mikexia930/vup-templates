# 部署脚本说明

## 脚本列表

### backup.sh - 数据库备份脚本

**功能**：

- 备份 MariaDB 数据库
- 备份上传文件
- 自动清理旧备份（保留7天）

**使用方法**：

```bash
./scripts/backup.sh
```

**定时任务配置**（每日凌晨 2:00）：

```bash
# 编辑 crontab
crontab -e

# 添加以下行
0 2 * * * /opt/vup/scripts/backup.sh >> /opt/vup/logs/backup.log 2>&1
```

---

### cleanup.sh - 清理脚本

**功能**：

- 清理旧日志（保留30天）
- 清理旧备份（保留7天）
- 清理 Docker 未使用的资源
- 检查磁盘使用率

**使用方法**：

```bash
./scripts/cleanup.sh
```

**定时任务配置**（每日凌晨 3:00）：

```bash
0 3 * * * /opt/vup/scripts/cleanup.sh >> /opt/vup/logs/cleanup.log 2>&1
```

---

### monitor.sh - 监控脚本

**功能**：

- 显示服务状态
- 显示资源使用情况
- 显示磁盘、内存使用
- 健康检查
- 告警检查

**使用方法**：

```bash
./scripts/monitor.sh
```

**定时任务配置**（每小时）：

```bash
0 * * * * /opt/vup/scripts/monitor.sh >> /opt/vup/logs/monitor.log 2>&1
```

---

### 5. restore.sh - 数据库恢复脚本

**功能**：

- 从备份文件恢复数据库
- 恢复前自动创建临时备份

**使用方法**：

```bash
# 查看备份列表
ls -lh backups/postgres/

# 恢复指定备份
./scripts/restore.sh backups/mariadb/backup_20240101_020000.sql.gz
```

**注意事项**：

- 恢复操作会覆盖当前数据库
- 恢复前会自动创建临时备份
- 需要手动确认

---

## 定时任务完整配置

创建 `/opt/cms/scripts/setup-cron.sh`：

```bash
#!/bin/bash

# 设置定时任务
crontab -l > /tmp/cron_backup 2>/dev/null || true

# 备份任务（每日凌晨 2:00）
echo "0 2 * * * /opt/cms/scripts/backup.sh >> /opt/cms/logs/backup.log 2>&1" >> /tmp/cron_backup

# 清理任务（每日凌晨 3:00）
echo "0 3 * * * /opt/cms/scripts/cleanup.sh >> /opt/cms/logs/cleanup.log 2>&1" >> /tmp/cron_backup

# 监控任务（每小时）
echo "0 * * * * /opt/cms/scripts/monitor.sh >> /opt/cms/logs/monitor.log 2>&1" >> /tmp/cron_backup

# 安装定时任务
crontab /tmp/cron_backup
rm /tmp/cron_backup

echo "定时任务已配置"
```

执行：

```bash
chmod +x /opt/cms/scripts/setup-cron.sh
/opt/cms/scripts/setup-cron.sh
```

---

## 权限设置

确保脚本有执行权限：

```bash
chmod +x /opt/cms/scripts/*.sh
```

---

## 日志位置

- 备份日志：`logs/backup.log`
- 清理日志：`logs/cleanup.log`
- 监控日志：`logs/monitor.log`

---

## 故障排查

### 脚本无法执行

```bash
# 检查权限
ls -l scripts/

# 添加执行权限
chmod +x scripts/*.sh
```

### 定时任务不执行

```bash
# 查看定时任务
crontab -l

# 查看 cron 日志
grep CRON /var/log/syslog

# 测试脚本
./scripts/backup.sh
```

### 备份失败

```bash
# 检查 Docker 服务
docker-compose ps

# 检查磁盘空间
df -h

# 手动执行备份
./scripts/backup.sh
```
