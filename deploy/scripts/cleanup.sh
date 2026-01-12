#!/bin/bash

# 清理脚本
# 用途：清理旧日志和备份，释放磁盘空间
# 执行：./scripts/cleanup.sh
# 定时任务：每日凌晨 3:00 执行

set -e

# 确保脚本退出时清理所有子进程
cleanup() {
    jobs -p | xargs -r kill 2>/dev/null || true
    exit 0
}

# 注册清理函数
trap cleanup EXIT INT TERM

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(dirname "$SCRIPT_DIR")"
cd "$DEPLOY_DIR"

# 配置
LOG_RETENTION_DAYS=10  # 日志保留30天
BACKUP_RETENTION_DAYS=7  # 备份保留7天
DISK_WARNING_THRESHOLD=80  # 磁盘使用率告警阈值

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查磁盘使用率
check_disk_usage() {
    DISK_USAGE=$(df -h "$DEPLOY_DIR" | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ "$DISK_USAGE" -gt "$DISK_WARNING_THRESHOLD" ]; then
        log_warn "磁盘使用率: ${DISK_USAGE}% (超过 ${DISK_WARNING_THRESHOLD}%)"
        return 1
    else
        log_info "磁盘使用率: ${DISK_USAGE}%"
        return 0
    fi
}

log_info "开始清理..."

# 1. 清理旧日志
log_info "清理 $LOG_RETENTION_DAYS 天前的日志..."
if [ -d "logs" ]; then
    find logs -type f -name "*.log" -mtime +$LOG_RETENTION_DAYS -delete
    find logs -type f -name "*.log.*" -mtime +$LOG_RETENTION_DAYS -delete
    LOG_COUNT=$(find logs -type f | wc -l)
    log_info "清理完成，剩余日志文件: $LOG_COUNT"
fi

# 2. 清理旧备份（已在 backup.sh 中处理，这里做二次清理）
log_info "清理 $BACKUP_RETENTION_DAYS 天前的备份..."
if [ -d "backups" ]; then
    find backups -type f -name "*.sql.gz" -mtime +$BACKUP_RETENTION_DAYS -delete
    find backups -type f -name "*.tar.gz" -mtime +$BACKUP_RETENTION_DAYS -delete
    BACKUP_COUNT=$(find backups -type f | wc -l)
    log_info "清理完成，剩余备份文件: $BACKUP_COUNT"
fi

# 3. 清理 Docker 未使用的资源
log_info "清理 Docker 未使用的资源..."
# 使用 timeout 确保命令不会挂起
timeout 300 docker system prune -f --volumes > /dev/null 2>&1 || true

# 4. 清理 Docker 日志（如果过大）
log_info "检查 Docker 日志..."
DOCKER_LOG_SIZE=$(du -sh /var/lib/docker/containers 2>/dev/null | cut -f1 || echo "0")
if [ -d "/var/lib/docker/containers" ]; then
    # 清理超过100MB的容器日志
    find /var/lib/docker/containers -name "*.log" -size +100M -delete 2>/dev/null || true
fi

# 5. 显示清理结果
echo ""
log_info "清理完成！"
echo ""
echo "目录大小："
du -sh logs backups data 2>/dev/null | sort -h
echo ""

# 6. 检查磁盘使用率
check_disk_usage

# 7. 显示磁盘使用详情
echo ""
echo "磁盘使用详情："
df -h "$DEPLOY_DIR"




