#!/bin/bash

# 数据库恢复脚本
# 用途：从备份文件恢复 MariaDB 数据库
# 执行：./scripts/restore.sh <备份文件路径>
# 示例：./scripts/restore.sh backups/mariadb/backup_20240101_020000.sql.gz

set -e

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(dirname "$SCRIPT_DIR")"
cd "$DEPLOY_DIR"

# 参数
BACKUP_FILE=$1

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

# 检查参数
if [ -z "$BACKUP_FILE" ]; then
    log_error "请指定备份文件路径"
    echo "用法: $0 <备份文件路径>"
    echo "示例: $0 backups/postgres/backup_20240101_020000.sql.gz"
    exit 1
fi

# 检查备份文件是否存在
if [ ! -f "$BACKUP_FILE" ]; then
    log_error "备份文件不存在: $BACKUP_FILE"
    exit 1
fi

# 加载环境变量
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# 确认操作
log_warn "警告：此操作将覆盖当前数据库！"
log_warn "备份文件: $BACKUP_FILE"
read -p "确认恢复？(yes/no): " -r
if [ "$REPLY" != "yes" ]; then
    log_info "已取消"
    exit 0
fi

# 检查 MariaDB 是否运行
if ! docker-compose ps mariadb | grep -q "Up"; then
    log_error "MariaDB 容器未运行"
    exit 1
fi

# 创建临时备份（安全措施）
log_info "创建当前数据库的临时备份..."
TEMP_BACKUP="backups/mariadb/temp_before_restore_$(date +%Y%m%d_%H%M%S).sql.gz"
docker-compose exec -T mariadb mysqldump -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}" | gzip > "$TEMP_BACKUP"
log_info "临时备份已创建: $TEMP_BACKUP"

# 恢复数据库
log_info "开始恢复数据库..."
if [[ "$BACKUP_FILE" == *.gz ]]; then
    # 压缩文件
    gunzip -c "$BACKUP_FILE" | docker-compose exec -T mariadb mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}"
else
    # 未压缩文件
    cat "$BACKUP_FILE" | docker-compose exec -T mariadb mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}"
fi

if [ $? -eq 0 ]; then
    log_info "数据库恢复成功！"
    log_info "临时备份文件: $TEMP_BACKUP (可手动删除)"
else
    log_error "数据库恢复失败！"
    log_warn "可以从临时备份恢复: $TEMP_BACKUP"
    exit 1
fi






