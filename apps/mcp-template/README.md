# MCP 服务器模板

基于 Model Context Protocol
(MCP) 的服务器模板，提供简化的框架封装，降低使用门槛。

## ✨ 特性

- 🚀 **简化 API** - 使用 `defineTool()` 一行代码定义工具
- 🔐 **自动认证** - 通过 `requiresAuth: true` 自动处理认证流程
- 📦 **工具注册表** - 自动管理工具注册和调用
- 🌐 **双模式支持** - STDIO（本地）和 SSE（远程）模式
- 🎯 **类型安全** - 完整的 TypeScript 类型支持

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 定义工具

在 `src/tools/` 目录下创建工具文件：

```typescript
// src/tools/my-tool.ts
import { defineTool } from '../framework';
import type { ToolContext } from '../framework';

export const my_tool = defineTool({
  name: 'my_tool',
  description: '我的工具描述',
  inputSchema: {
    properties: {
      param: { type: 'string', description: '参数说明' },
    },
    required: ['param'],
  },
  requiresAuth: true, // 一行代码启用认证
  handler: async (args, context: ToolContext) => {
    // context.userId 已自动注入，无需手动检查
    return {
      content: [{ type: 'text', text: `结果: ${args.param}` }],
    };
  },
});
```

### 3. 注册工具

在 `src/tools/index.ts` 中导出：

```typescript
import { my_tool } from './my-tool';

export const TOOLS = [my_tool];
```

### 4. 启动服务器

```bash
# STDIO 模式（本地，供 Cursor 直接调用）
pnpm dev

# SSE 模式（远程）
pnpm dev:remote
```

## 📖 框架 API

### `defineTool()`

定义工具的辅助函数，自动处理认证、类型转换等。

```typescript
defineTool({
  name: string;
  description: string;
  inputSchema: {
    properties: Record<string, any>;
    required?: string[];
  };
  requiresAuth?: boolean;  // 是否需要认证
  handler: (args, context) => Promise<{ content: ... }>;
})
```

### `requireAuth()`

手动包装工具处理器，自动检查认证。

```typescript
import { requireAuth } from '../framework';

const handler = requireAuth(async (args, context) => {
  // 这里已确保 context.userId 存在
});
```

### `setAuthConfig()`

设置认证配置。

```typescript
import { setAuthConfig } from '../framework';

setAuthConfig({
  loginUrl: 'http://localhost:9316/login.html',
  checkAuth: (context) => !!context.userId,
});
```

### `createMcpServer()`

创建 MCP 服务器。

```typescript
import { createMcpServer, createToolRegistry } from './framework';
import { TOOLS } from './tools';

const registry = createToolRegistry();
TOOLS.forEach((tool) => registry.register(tool));

createMcpServer(
  {
    name: 'mcp-server',
    version: '1.0.0',
    mode: 'stdio', // 或 'sse'
    port: 9316,
    auth: {
      loginUrl: 'http://localhost:9316/login.html',
      checkAuth: (context) => !!context.userId,
    },
  },
  registry
);
```

## 🔧 开发模式

### STDIO 模式（本地）

用于 Cursor 等 AI 客户端直接调用：

```bash
pnpm dev
```

### SSE 模式（远程）

用于远程服务器部署：

```bash
pnpm dev:remote
```

访问：

- MCP 端点: `http://localhost:3000/mcp`
- 登录页: `http://localhost:3000/login.html`

## 📁 项目结构

```
mcp-template/
├── src/
│   ├── framework/              # 框架核心
│   │   ├── defineTool.ts      # 工具定义辅助函数
│   │   ├── requireAuth.ts     # 认证处理
│   │   ├── toolRegistry.ts    # 工具注册表
│   │   ├── createServer.ts    # 服务器创建
│   │   ├── types.ts           # 类型定义
│   │   └── index.ts           # 框架入口
│   ├── tools/                 # 工具定义
│   │   ├── auth.ts            # 认证相关工具
│   │   ├── public.ts          # 公开工具（简单示例）
│   │   ├── demo.ts            # 示例工具（文档搜索，完整实现）
│   │   └── index.ts           # 工具导出
│   └── server.ts              # 服务器入口
├── public/
│   └── login.html             # 登录页面
└── package.json
```

## 📚 工具示例

### `search_docs` - 文档搜索工具（示例）

这是一个完整的示例工具（`src/tools/demo.ts`），展示如何实现一个实用的工具。

**功能特性**：

- 从 CSV 文件读取文档数据
- 支持按标题、内容、作者、分类搜索
- 返回格式化的搜索结果
- 可限制返回数量（默认 10 条，最大 50 条）

**数据来源**：

- CSV 文件：`data/docs.csv`
- 包含 50 条示例文档数据
- 字段：id, title, content, author, category, created_at

**代码示例**：

```typescript
// src/tools/demo.ts
export const search_docs = defineTool({
  name: 'search_docs',
  description: '搜索文档库，支持按标题、内容、作者、分类搜索',
  inputSchema: {
    properties: {
      query: { type: 'string', description: '搜索关键词' },
      limit: { type: 'number', description: '返回数量限制（默认 10）' },
    },
    required: ['query'],
  },
  handler: async (args, context) => {
    // 从 CSV 读取数据
    const docs = loadDocs();
    // 搜索并返回结果
    // ...
  },
});
```

**使用示例**：

```typescript
// 搜索 "Vue"
search_docs({ query: 'Vue' });

// 搜索 "前端"，限制返回 5 条
search_docs({ query: '前端', limit: 5 });
```

**测试建议**：

- 搜索 "Vue" - 应该返回多个前端相关文档
- 搜索 "数据库" - 应该返回数据库相关文档
- 搜索 "张三" - 应该返回该作者的文档
- 搜索 "不存在的关键词" - 应该返回友好的提示信息

**说明**：

- `demo.ts` 是一个完整的示例，展示如何实现复杂的工具逻辑
- `public.ts` 是一个简单的示例，展示最基本的工具定义
- 你可以参考 `demo.ts` 来实现自己的工具

## 🔐 认证机制

### 自动认证

使用 `requiresAuth: true` 自动处理认证：

```typescript
export const my_tool = defineTool({
  name: 'my_tool',
  requiresAuth: true, // 自动检查认证
  handler: async (args, context) => {
    // context.userId 已确保存在
  },
});
```

### 手动认证

使用 `requireAuth()` 包装处理器：

```typescript
import { requireAuth } from '../framework';

const handler = requireAuth(async (args, context) => {
  // 认证已通过
});
```

### 认证流程

1. 工具调用时，如果 `requiresAuth: true`，框架自动检查 `context.userId`
2. 如果未认证，抛出 `UrlElicitationRequiredError`
3. Cursor 等客户端识别错误码 `-32042` 和 `elicitations` 数组
4. 客户端自动打开登录页面
5. 用户登录后，客户端携带 JWT token 重新调用工具

## 📚 相关文档

- [Model Context Protocol 规范](https://modelcontextprotocol.io/)
- [MCP SDK 文档](https://github.com/modelcontextprotocol/sdk)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
