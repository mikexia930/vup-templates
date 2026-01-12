#!/bin/bash

# 数据库备份脚本
# 用途：备份 MariaDB 数据库和上传文件
# 执行：./scripts/backup.sh
# 定时任务：每日凌晨 2:00 执行

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

# 加载环境变量
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# 配置
BACKUP_DIR="$DEPLOY_DIR/backups"
MARIADB_BACKUP_DIR="$BACKUP_DIR/mariadb"
API_BACKUP_DIR="$BACKUP_DIR/api"
RETENTION_DAYS=7  # 保留7天
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 Docker Compose 是否运行
if ! docker-compose ps mariadb | grep -q "Up"; then
    log_error "MariaDB 容器未运行"
    exit 1
fi

# 创建备份目录
mkdir -p "$MARIADB_BACKUP_DIR"
mkdir -p "$API_BACKUP_DIR"

log_info "开始备份..."

# 1. 备份 MariaDB 数据库
log_info "备份 MariaDB 数据库..."
BACKUP_FILE="$MARIADB_BACKUP_DIR/backup_${TIMESTAMP}.sql.gz"

# 使用 timeout 确保命令不会挂起，限制执行时间为 10 分钟
if timeout 600 docker-compose exec -T mariadb mysqldump -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}" 2>/dev/null | gzip > "$BACKUP_FILE"; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log_info "数据库备份完成: $BACKUP_FILE (大小: $BACKUP_SIZE)"
else
    log_error "数据库备份失败"
    exit 1
fi

# 2. 备份上传文件（如果存在）
if [ -d "data/api/uploads" ] && [ "$(ls -A data/api/uploads 2>/dev/null)" ]; then
    log_info "备份上传文件..."
    UPLOAD_BACKUP="$API_BACKUP_DIR/uploads_${TIMESTAMP}.tar.gz"
    
    if tar -czf "$UPLOAD_BACKUP" -C data/api uploads; then
        UPLOAD_SIZE=$(du -h "$UPLOAD_BACKUP" | cut -f1)
        log_info "文件备份完成: $UPLOAD_BACKUP (大小: $UPLOAD_SIZE)"
    else
        log_warn "文件备份失败（可能没有文件）"
    fi
fi

# 3. 清理旧备份
log_info "清理 $RETENTION_DAYS 天前的备份..."
find "$MARIADB_BACKUP_DIR" -name "backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
find "$API_BACKUP_DIR" -name "uploads_*.tar.gz" -type f -mtime +$RETENTION_DAYS -delete

DELETED_COUNT=$(find "$MARIADB_BACKUP_DIR" -name "backup_*.sql.gz" -type f | wc -l)
log_info "保留的数据库备份数量: $DELETED_COUNT"

# 4. 显示备份统计
log_info "备份完成！"
echo ""
echo "备份文件："
ls -lh "$MARIADB_BACKUP_DIR"/backup_*.sql.gz 2>/dev/null | tail -5 || echo "  无数据库备份"
ls -lh "$API_BACKUP_DIR"/uploads_*.tar.gz 2>/dev/null | tail -5 || echo "  无文件备份"
echo ""
echo "磁盘使用："
du -sh "$BACKUP_DIR"/* 2>/dev/null | sort -h





