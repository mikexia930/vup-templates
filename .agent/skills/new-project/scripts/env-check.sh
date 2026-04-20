#!/usr/bin/env bash
# vup 基座环境体检脚本
# 仅检测，不执行任何安装/切换操作
# 退出码：0 = 全过, 1 = 有警告, 2 = 有失败

set -u

# ===== 配置：基座要求的版本（与根 package.json engines 对齐） =====
NODE_REQUIRED="22"
PNPM_REQUIRED="10"

# ===== 颜色 =====
if [ -t 1 ]; then
  C_RED=$'\033[31m'
  C_GRN=$'\033[32m'
  C_YLW=$'\033[33m'
  C_BLU=$'\033[34m'
  C_DIM=$'\033[2m'
  C_RST=$'\033[0m'
else
  C_RED=''; C_GRN=''; C_YLW=''; C_BLU=''; C_DIM=''; C_RST=''
fi

OK="${C_GRN}✅${C_RST} "
WARN="${C_YLW}⚠️${C_RST}  "
FAIL="${C_RED}❌${C_RST} "
INFO="${C_BLU}ℹ️${C_RST}  "

# ===== 计数 =====
CNT_OK=0
CNT_WARN=0
CNT_FAIL=0
FAIL_ITEMS=()
WARN_ITEMS=()

# ===== 工具函数 =====
record_ok()   { CNT_OK=$((CNT_OK+1)); }
record_warn() { CNT_WARN=$((CNT_WARN+1)); WARN_ITEMS+=("$1"); }
record_fail() { CNT_FAIL=$((CNT_FAIL+1)); FAIL_ITEMS+=("$1"); }

# 比较版本号 (a >= b)
version_ge() {
  printf '%s\n%s\n' "$2" "$1" | sort -V -C
}

has_cmd() { command -v "$1" >/dev/null 2>&1; }

# ===== 标题 =====
echo ""
echo "═══════════════════════════════════════════════════"
echo "  vup 基座环境体检"
echo "═══════════════════════════════════════════════════"
echo ""

# ===== 1. 运行环境 =====
echo "${C_BLU}【运行环境】${C_RST}"

OS_NAME="$(uname -s)"
OS_ARCH="$(uname -m)"
case "$OS_NAME" in
  Darwin*) OS_LABEL="macOS $(sw_vers -productVersion 2>/dev/null || echo '')" ;;
  Linux*)  OS_LABEL="Linux ($(uname -r))" ;;
  MINGW*|MSYS*|CYGWIN*) OS_LABEL="Windows ($OS_NAME)" ;;
  *)       OS_LABEL="$OS_NAME" ;;
esac
echo "  ${INFO}系统: $OS_LABEL ($OS_ARCH)"

# Shell 检测
CURRENT_SHELL="${SHELL:-unknown}"
SHELL_NAME="$(basename "$CURRENT_SHELL")"
case "$SHELL_NAME" in
  zsh)  SHELL_RC="\$HOME/.zshrc" ;;
  bash)
    if [ "$OS_NAME" = "Darwin" ]; then
      SHELL_RC="\$HOME/.bash_profile"
    else
      SHELL_RC="\$HOME/.bashrc"
    fi ;;
  fish) SHELL_RC="\$HOME/.config/fish/config.fish" ;;
  *)    SHELL_RC="\$HOME/.profile" ;;
esac
echo "  ${INFO}Shell: $SHELL_NAME ($CURRENT_SHELL)"
echo "  ${INFO}配置文件: $SHELL_RC"
echo ""

# ===== 2. Node 版本管理器（先检测装了哪些） =====
echo "${C_BLU}【Node 版本管理器】${C_RST}"

MGR_LIST=()

# volta
if has_cmd volta; then
  V_VOLTA="$(volta --version 2>/dev/null || echo '?')"
  echo "  ${OK}volta v$V_VOLTA"
  MGR_LIST+=("volta")
elif [ -d "$HOME/.volta" ]; then
  echo "  ${WARN}volta 目录存在但命令不可用（shell 可能未加载）"
  echo "      ${C_DIM}建议在 $SHELL_RC 中加载 volta 环境${C_RST}"
fi

# nvm（nvm 是 shell 函数，不是 binary）
if [ -n "${NVM_DIR:-}" ] && [ -s "$NVM_DIR/nvm.sh" ]; then
  V_NVM="$(grep -oE '[0-9]+\.[0-9]+\.[0-9]+' "$NVM_DIR/nvm.sh" 2>/dev/null | head -1)"
  echo "  ${OK}nvm v${V_NVM:-?}"
  MGR_LIST+=("nvm")
  # 列出已装版本（用 find 避免 ls 的 ANSI 颜色干扰）
  if [ -d "$NVM_DIR/versions/node" ]; then
    # 提取主版本号去重，便于阅读
    NVM_MAJORS="$(find "$NVM_DIR/versions/node" -mindepth 1 -maxdepth 1 -type d 2>/dev/null \
      | xargs -n1 basename 2>/dev/null \
      | sed 's/^v//' \
      | cut -d. -f1 \
      | sort -un \
      | tr '\n' ' ')"
    if [ -n "$NVM_MAJORS" ]; then
      echo "      ${C_DIM}nvm 已装主版本: $NVM_MAJORS${C_RST}"
      # 检查是否已装目标 Node 版本
      if echo " $NVM_MAJORS " | grep -q " ${NODE_REQUIRED} "; then
        echo "      ${C_DIM}（已包含 Node ${NODE_REQUIRED}，可用 nvm use ${NODE_REQUIRED} 切换）${C_RST}"
      fi
    fi
  fi
elif [ -d "$HOME/.nvm" ]; then
  echo "  ${WARN}nvm 目录存在但 NVM_DIR 未设置（shell 可能未加载）"
  echo "      ${C_DIM}建议在 $SHELL_RC 中加载 nvm 环境${C_RST}"
fi

# fnm
if has_cmd fnm; then
  V_FNM="$(fnm --version 2>/dev/null | awk '{print $2}' || echo '?')"
  echo "  ${OK}fnm v$V_FNM"
  MGR_LIST+=("fnm")
fi

# asdf
if has_cmd asdf; then
  V_ASDF="$(asdf --version 2>/dev/null | awk '{print $1}' || echo '?')"
  echo "  ${OK}asdf $V_ASDF"
  MGR_LIST+=("asdf")
fi

if [ ${#MGR_LIST[@]} -eq 0 ]; then
  echo "  ${WARN}未检测到 Node 版本管理器（volta/nvm/fnm/asdf）"
  record_warn "未安装 Node 版本管理器（推荐安装 volta）"
elif [ ${#MGR_LIST[@]} -gt 1 ]; then
  echo "  ${INFO}并存：${MGR_LIST[*]}（按当前激活的优先）"
fi

# 检测当前 node 来自哪
if has_cmd node; then
  NODE_PATH="$(command -v node)"
  ACTIVE_MGR="system"
  case "$NODE_PATH" in
    *.volta*) ACTIVE_MGR="volta" ;;
    *.nvm*)   ACTIVE_MGR="nvm" ;;
    *.fnm*)   ACTIVE_MGR="fnm" ;;
    *.asdf*)  ACTIVE_MGR="asdf" ;;
  esac
  echo "  ${INFO}当前 node 来源: $ACTIVE_MGR ($NODE_PATH)"
fi
echo ""

# ===== 3. 核心工具 =====
echo "${C_BLU}【核心工具】${C_RST}"

# Node
if has_cmd node; then
  NODE_VER="$(node -v | sed 's/^v//')"
  NODE_MAJOR="$(echo "$NODE_VER" | cut -d. -f1)"
  if [ "$NODE_MAJOR" -ge "$NODE_REQUIRED" ] 2>/dev/null; then
    echo "  ${OK}Node v$NODE_VER (要求 ≥ $NODE_REQUIRED)"
    record_ok
  else
    echo "  ${FAIL}Node v$NODE_VER (要求 ≥ $NODE_REQUIRED)"
    record_fail "Node 版本过低 (当前 v$NODE_VER, 要求 ≥ $NODE_REQUIRED)"
  fi
else
  echo "  ${FAIL}Node 未安装 (要求 ≥ $NODE_REQUIRED)"
  record_fail "Node 未安装"
fi

# pnpm
if has_cmd pnpm; then
  PNPM_VER="$(pnpm -v 2>/dev/null)"
  if [ -z "$PNPM_VER" ]; then
    # pnpm 命令存在但执行异常（如依赖的 Node 版本不兼容）
    echo "  ${FAIL}pnpm 命令存在但无法执行 (可能 Node 版本不兼容)"
    record_fail "pnpm 命令存在但执行异常（先解决 Node 问题后重试）"
  else
    PNPM_MAJOR="$(echo "$PNPM_VER" | cut -d. -f1)"
    if [ "$PNPM_MAJOR" -ge "$PNPM_REQUIRED" ] 2>/dev/null; then
      echo "  ${OK}pnpm $PNPM_VER (要求 ≥ $PNPM_REQUIRED)"
      record_ok
    else
      echo "  ${FAIL}pnpm $PNPM_VER (要求 ≥ $PNPM_REQUIRED)"
      record_fail "pnpm 版本过低 (当前 $PNPM_VER, 要求 ≥ $PNPM_REQUIRED)"
    fi
  fi
else
  echo "  ${FAIL}pnpm 未安装 (要求 ≥ $PNPM_REQUIRED)"
  record_fail "pnpm 未安装"
fi

# git
if has_cmd git; then
  GIT_VER="$(git --version | awk '{print $3}')"
  echo "  ${OK}git $GIT_VER"
  record_ok
else
  echo "  ${FAIL}git 未安装"
  record_fail "git 未安装"
fi

# Docker（可选，Nest 后端开发环境需要）
if has_cmd docker; then
  DOCKER_VER="$(docker --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
  echo "  ${OK}Docker $DOCKER_VER"
  record_ok
  # 检查 Docker 是否在运行
  if docker info >/dev/null 2>&1; then
    echo "      ${C_DIM}Docker daemon 运行中${C_RST}"
  else
    echo "  ${WARN}Docker 已安装但 daemon 未运行"
    record_warn "Docker daemon 未运行（使用 docker-compose 前需启动）"
  fi
else
  echo "  ${INFO}Docker 未安装（可选，Nest 后端用 docker-compose 管理数据库时需要）"
fi

# docker-compose / docker compose
if has_cmd docker && docker compose version >/dev/null 2>&1; then
  DC_VER="$(docker compose version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
  echo "  ${OK}Docker Compose v$DC_VER (docker compose plugin)"
  record_ok
elif has_cmd docker-compose; then
  DC_VER="$(docker-compose --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
  echo "  ${OK}docker-compose v$DC_VER (standalone)"
  record_ok
else
  if has_cmd docker; then
    echo "  ${WARN}Docker Compose 未安装（docker-compose 管理开发环境需要）"
    record_warn "Docker Compose 未安装"
  fi
fi
echo ""

# ===== 4. 项目状态 =====
echo "${C_BLU}【项目状态】${C_RST}"

# 是否在 vup 基座根目录
if [ -f ".template.config.json" ] && [ -f "pnpm-workspace.yaml" ]; then
  echo "  ${OK}在 vup 基座根目录"
  record_ok
  IS_VUP_ROOT=1
else
  echo "  ${FAIL}不在 vup 基座根目录（缺少 .template.config.json 或 pnpm-workspace.yaml）"
  record_fail "不在 vup 基座根目录"
  IS_VUP_ROOT=0
fi

# Git 状态
if [ "$IS_VUP_ROOT" = "1" ] && has_cmd git && [ -d ".git" ]; then
  UNCOMMITTED="$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
  if [ "$UNCOMMITTED" -eq 0 ]; then
    echo "  ${OK}Git 工作区干净"
    record_ok
  else
    echo "  ${WARN}Git 工作区有 $UNCOMMITTED 个未提交变更"
    record_warn "Git 工作区有 $UNCOMMITTED 个未提交变更"
  fi
fi

# node_modules
if [ "$IS_VUP_ROOT" = "1" ]; then
  if [ -d "node_modules" ]; then
    echo "  ${OK}依赖已安装 (node_modules 存在)"
    record_ok
  else
    echo "  ${WARN}依赖未安装"
    record_warn "依赖未安装（建议运行 pnpm install）"
  fi
fi

# .env 是否被 git 跟踪（潜在泄密）
if [ "$IS_VUP_ROOT" = "1" ] && has_cmd git && [ -d ".git" ]; then
  TRACKED_ENV="$(git ls-files 2>/dev/null | grep -E '^\.env(\.|$)' | grep -v 'example' | head -5)"
  if [ -n "$TRACKED_ENV" ]; then
    echo "  ${WARN}检测到 .env 文件被 Git 跟踪（潜在泄密风险）："
    echo "$TRACKED_ENV" | sed 's/^/      /'
    record_warn ".env 文件被 Git 跟踪"
  fi
fi
echo ""

# ===== 5. 汇总 =====
echo "═══════════════════════════════════════════════════"
echo "  汇总：${C_GRN}$CNT_OK ✅${C_RST}  ${C_YLW}$CNT_WARN ⚠️${C_RST}  ${C_RED}$CNT_FAIL ❌${C_RST}"
echo "═══════════════════════════════════════════════════"

if [ "$CNT_FAIL" -gt 0 ]; then
  echo ""
  echo "${C_RED}必须处理的失败项${C_RST}（不处理后续步骤会失败）："
  for item in "${FAIL_ITEMS[@]}"; do
    echo "  • $item"
  done
fi

if [ "$CNT_WARN" -gt 0 ]; then
  echo ""
  echo "${C_YLW}建议处理的警告项${C_RST}："
  for item in "${WARN_ITEMS[@]}"; do
    echo "  • $item"
  done
fi

echo ""
echo "${C_DIM}详细修复方案见 .agent/skills/new-project/references/phase-0-env-check.md${C_RST}"
echo ""

# 退出码
if [ "$CNT_FAIL" -gt 0 ]; then
  exit 2
elif [ "$CNT_WARN" -gt 0 ]; then
  exit 1
else
  exit 0
fi