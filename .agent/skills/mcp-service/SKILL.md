---
name: mcp-service
description: >-
  Use when implementing MCP (Model Context Protocol) server services. Covers
  tool definition with defineTool, tool registration, auth guard, server
  creation with Fastify + @modelcontextprotocol/sdk Streamable HTTP transport.
  Based on mcp-template which provides a framework layer for rapid MCP
  development.
---

# mcp-service

基于 `mcp-template` 的 MCP 服务开发。**为 AI 模型提供工具调用能力**。

## 适用场景

- 为 Claude / ChatGPT 等 AI 模型提供自定义工具
- 构建 MCP Server（Model Context Protocol）
- 对应目录：`apps/<mcp-service>/`

## 何时被加载

- new-project Phase 7 选定 MCP 栈
- new-feature 给 MCP 服务加新工具
- maintenance 修 MCP 服务 bug

## MCP 平台特有约定

### 1. 目录结构

```
apps/<mcp-service>/src/
├── server.ts                  入口（创建 MCP server，通常只改配置）
├── framework/                 框架层（基座提供，通常不改）
│   ├── index.ts               统一导出
│   ├── createServer.ts        Fastify + MCP 集成
│   ├── defineTool.ts          工具定义辅助函数
│   ├── toolRegistry.ts        工具注册中心
│   ├── requireAuth.ts         认证守卫
│   └── types.ts               框架类型
└── tools/                     工具目录（业务代码写这里）
    ├── index.ts               工具注册入口
    ├── public.ts              无需认证的公开工具
    ├── auth.ts                需要认证的受保护工具
    └── demo.ts                示例工具
```

### 2. 定义工具（核心操作）

```typescript
// src/tools/demo.ts
import { defineTool } from '../framework';

export const helloTool = defineTool({
  name: 'hello',
  description: '问候工具，返回个性化问候语',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: '用户姓名' },
    },
    required: ['name'],
  },
  handler: async ({ name }) => {
    return { content: [{ type: 'text', text: `你好，${name}！` }] };
  },
});
```

### 3. 注册工具

```typescript
// src/tools/index.ts
import { helloTool } from './demo';
import { protectedTool } from './auth';
import type { ToolDefinition } from '../framework';

export const TOOLS: ToolDefinition[] = [helloTool, protectedTool];
```

### 4. 认证守卫

需要认证的工具在 `defineTool()` 中设置
`requiresAuth: true`。远程 HTTP 模式下框架会从 `Authorization: Bearer <token>`
解析 JWT，并把 `userId` 注入 `ToolContext`。

```typescript
export const protectedTool = defineTool({
  name: 'protected_tool',
  description: '需要登录后调用的工具',
  inputSchema: {
    properties: {},
  },
  requiresAuth: true,
  handler: async (_args, context) => {
    return {
      content: [{ type: 'text', text: `当前用户：${context.userId}` }],
    };
  },
});
```

### 5. 启动模式

```bash
# 本地开发（stdio 模式，直接连接 AI 客户端）
pnpm dev

# 远程模式（Streamable HTTP，通过 Fastify 暴露 /mcp）
pnpm dev:remote

# 生产构建
pnpm build
pnpm start           # stdio 模式
pnpm start:remote    # HTTP 模式
```

### 6. 工具设计原则

- **单一职责**：一个工具做一件事
- **描述清晰**：`description` 和 `inputSchema` 是 AI 理解工具的关键
- **错误处理**：handler 抛异常时框架自动包装为 MCP 错误响应
- **幂等性**：同样的输入应该产生同样的输出

## 实现新工具的步骤

1. 与用户确认工具名称、描述、输入参数
2. 在 `src/tools/` 新建文件，用 `defineTool` 定义
3. 在 `src/tools/index.ts` 注册
4. 在 `src/tools/index.ts` 的 `TOOLS` 数组中导出
5. `pnpm dev` 本地测试；远程调用用 `pnpm dev:remote`
6. 每完成一个工具 Gate 一次

## 关键决策点（AI 必须问用户）

1. **工具清单**：需要提供哪些工具？每个工具做什么？
2. **认证**：哪些工具需要认证？认证方式（JWT token）？
3. **部署模式**：stdio（本地）还是 HTTP（远程）？
4. **外部依赖**：工具需要调用哪些外部 API / 数据库？
5. **是否需要拆包**：可复用的纯 TS SDK / client / parser 应放到
   `package-template`，MCP 模板只承载服务入口、工具定义和协议适配

## 产出位置

- 工具定义：`apps/<mcp>/src/tools/<tool-name>.ts`
- 工具注册：`apps/<mcp>/src/tools/index.ts`
- 服务入口：`apps/<mcp>/src/server.ts`（通常不改）

## 资源

```
mcp-service/
└── SKILL.md            本文件
```

MCP 官方文档：https://modelcontextprotocol.io/
