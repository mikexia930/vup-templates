# 环境变量配置说明

## 使用方法

1. 复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

2. 根据实际需求修改 `.env.local` 中的配置

## Vite 环境变量规则

### 变量命名

- **客户端变量**：必须以 `VITE_` 开头
- **服务端变量**：可以任意命名（如 `NODE_ENV`）

### 变量优先级（从高到低）

1. `.env.local`（本地环境，不提交到 Git）
2. `.env.development`（开发环境）
3. `.env.production`（生产环境）
4. `.env`（通用环境）

## 常用配置说明

### 应用基础配置

```bash
VITE_APP_TITLE=应用标题
VITE_APP_DESCRIPTION=应用描述
VITE_APP_VERSION=版本号
```

### API 配置

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=10000
```

### 开发服务器配置

```bash
VITE_DEV_SERVER_HOST=0.0.0.0
VITE_DEV_SERVER_PORT=9001
```

### 功能开关

```bash
VITE_ENABLE_MOCK=true          # 启用 Mock 数据
VITE_ENABLE_DEVTOOLS=true      # 启用开发工具
VITE_ENABLE_ANALYTICS=false    # 启用分析统计
```

## 在代码中使用

```typescript
// 获取环境变量
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;

// 类型定义（推荐）
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENABLE_MOCK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 注意事项

1. **敏感信息**：不要将敏感信息放在客户端环境变量中
2. **类型安全**：建议为环境变量定义 TypeScript 类型
3. **默认值**：为环境变量提供合理的默认值
4. **文档更新**：修改环境变量时记得更新文档

## 部署配置

### Vercel 部署

在 Vercel 项目设置中添加环境变量：

- 生产环境：添加 `VITE_` 开头的变量
- 预览环境：可以设置不同的值

### 其他平台

根据平台要求配置相应的环境变量
