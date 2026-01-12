#!/bin/bash

# 监控脚本
# 用途：监控系统资源和服务状态
# 执行：./scripts/monitor.sh

set -e

# 确保脚本退出时清理所有子进程
cleanup() {
    # 杀死所有子进程
    jobs -p | xargs -r kill 2>/dev/null || true
    exit 0
}

# 注册清理函数
trap cleanup EXIT INT TERM

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(dirname "$SCRIPT_DIR")"
cd "$DEPLOY_DIR"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 加载环境变量
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}      CMS 系统监控报告${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. 服务状态
echo -e "${GREEN}[服务状态]${NC}"
timeout 10 docker-compose ps 2>/dev/null || echo "  无法获取服务状态"
echo ""

# 2. 容器资源使用
echo -e "${GREEN}[容器资源使用]${NC}"
CONTAINER_IDS=$(timeout 5 docker-compose ps -q 2>/dev/null || echo "")
if [ -n "$CONTAINER_IDS" ]; then
    timeout 10 docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" $CONTAINER_IDS 2>/dev/null || echo "  无法获取资源使用"
else
    echo "  无运行中的容器"
fi
echo ""

# 3. 磁盘使用
echo -e "${GREEN}[磁盘使用]${NC}"
df -h "$DEPLOY_DIR" | awk 'NR==1 || NR==2'
echo ""

# 4. 内存使用
echo -e "${GREEN}[内存使用]${NC}"
free -h
echo ""

# 5. 数据目录大小
echo -e "${GREEN}[数据目录大小]${NC}"
if [ -d "data" ]; then
    du -sh data/* 2>/dev/null | sort -h || echo "  无数据目录"
else
    echo "  无数据目录"
fi
echo ""

# 6. 日志目录大小
echo -e "${GREEN}[日志目录大小]${NC}"
if [ -d "logs" ]; then
    du -sh logs/* 2>/dev/null | sort -h || echo "  无日志目录"
else
    echo "  无日志目录"
fi
echo ""

# 7. 备份目录大小
echo -e "${GREEN}[备份目录大小]${NC}"
if [ -d "backups" ]; then
    du -sh backups/* 2>/dev/null | sort -h || echo "  无备份目录"
    echo ""
    echo "  备份文件数量："
    find backups -type f 2>/dev/null | wc -l || echo "  0"
else
    echo "  无备份目录"
fi
echo ""

# 8. 数据库信息（如果可能）
# 优化：使用超时机制，避免进程泄漏
echo -e "${GREEN}[数据库信息]${NC}"
if docker-compose ps mariadb 2>/dev/null | grep -q "Up"; then
    # 使用 timeout 确保命令不会挂起，限制执行时间为 5 秒
    DB_CONNECTIONS=$(timeout 5 docker-compose exec -T mariadb mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}" -e "SHOW STATUS LIKE 'Threads_connected';" 2>/dev/null | grep Threads_connected | awk '{print $2}' || echo "N/A")
    echo "  活跃连接数: $DB_CONNECTIONS"
    
    # 合并查询，减少进程创建
    DB_INFO=$(timeout 5 docker-compose exec -T mariadb mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}" -e "SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'DB Size in MB' FROM information_schema.tables WHERE table_schema='${MYSQL_DATABASE}';" 2>/dev/null | tail -1 || echo "N/A")
    echo "  数据库大小: ${DB_INFO}MB"
else
    echo "  MariaDB 未运行"
fi
echo ""

# 9. 健康检查
echo -e "${GREEN}[健康检查]${NC}"
for service in mariadb api-blue admin nginx; do
    if docker-compose ps "$service" | grep -q "Up"; then
        echo -e "  ${GREEN}✓${NC} $service: 运行中"
    else
        echo -e "  ${RED}✗${NC} $service: 未运行"
    fi
done
echo ""

# 10. 告警检查
echo -e "${YELLOW}[告警检查]${NC}"
WARNINGS=0

# 检查磁盘使用率
DISK_USAGE=$(df "$DEPLOY_DIR" | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo -e "  ${RED}⚠${NC} 磁盘使用率: ${DISK_USAGE}% (超过 80%)"
    WARNINGS=$((WARNINGS + 1))
fi

# 检查内存使用率
MEM_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ "$MEM_USAGE" -gt 85 ]; then
    echo -e "  ${RED}⚠${NC} 内存使用率: ${MEM_USAGE}% (超过 85%)"
    WARNINGS=$((WARNINGS + 1))
fi

# 检查服务状态
if ! docker-compose ps | grep -q "Up.*mariadb"; then
    echo -e "  ${RED}⚠${NC} MariaDB 未运行"
    WARNINGS=$((WARNINGS + 1))
fi

if ! docker-compose ps | grep -q "Up.*api-blue"; then
    echo -e "  ${RED}⚠${NC} API 服务未运行"
    WARNINGS=$((WARNINGS + 1))
fi

if [ $WARNINGS -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} 无告警"
fi
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "监控时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo -e "${BLUE}========================================${NC}"





