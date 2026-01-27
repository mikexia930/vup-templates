import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { McpServerConfig, ToolRegistry } from './types';
import { setAuthConfig } from './requireAuth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 创建 MCP 服务器
 */
export async function createMcpServer(config: McpServerConfig, registry: ToolRegistry) {
  const { name, version, mode, port = 3000, auth } = config;

  // 配置认证
  if (auth) {
    setAuthConfig({
      loginUrl: auth.loginUrl || `${process.env.BASE_URL || 'http://localhost:9316'}/login.html`,
      checkAuth: auth.checkAuth || ((context) => !!context.userId),
    });
  }

  const isRemote =
    mode === 'sse' || process.argv.includes('--remote') || process.env.MCP_MODE === 'sse';

  if (!isRemote) {
    // STDIO 模式
    return createStdioServer(name, version, registry);
  } else {
    // SSE 模式
    return createSseServer(name, version, port, registry);
  }
}

/**
 * 创建 STDIO 模式服务器
 */
async function createStdioServer(name: string, version: string, registry: ToolRegistry) {
  console.log('🚀 运行在本地 STDIO 模式（供 Cursor 直接调用）');

  const server = new Server(
    { name, version },
    {
      capabilities: {
        tools: {},
      },
    }
  );
  const tools = registry.getTools();
  const handler = registry.getHandler();

  server.setRequestHandler(ListToolsRequestSchema, () => ({ tools }));
  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    return handler(req.params.name, req.params.arguments || {}, { headers: {} });
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('✅ MCP 服务器已启动（STDIO 模式）');
}

/**
 * 创建 SSE 模式服务器
 */
async function createSseServer(
  name: string,
  version: string,
  port: number,
  registry: ToolRegistry
) {
  console.log('🌐 运行在远程 SSE 模式');

  const fastify = Fastify({ logger: true });
  await fastify.register(jwt, { secret: process.env.JWT_SECRET || 'my-super-secret' });

  // 静态文件（登录页）
  await fastify.register(fastifyStatic, {
    root: join(__dirname, '../public'),
    prefix: '/',
  });

  const tools = registry.getTools();
  const handler = registry.getHandler();

  // 创建全局 MCP Server 实例
  const mcpServer = new Server(
    { name, version },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // 设置请求处理器
  mcpServer.setRequestHandler(ListToolsRequestSchema, () => ({ tools }));

  mcpServer.setRequestHandler(CallToolRequestSchema, async (req, extra) => {
    // 从 extra 中获取请求信息（由 transport 传递）
    const requestInfo = extra?.requestInfo;
    const headers = requestInfo?.headers || {};

    // 从 Authorization 头提取用户
    const authHeader = headers.authorization;
    const authHeaderStr = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    const token = authHeaderStr?.split(' ')[1];
    let userId: string | undefined;

    if (token) {
      try {
        const payload = await fastify.jwt.verify<{ sub?: string }>(token);
        userId = payload.sub;
      } catch {
        // 忽略验证错误
      }
    }

    // 转换 headers 类型
    const normalizedHeaders: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(headers)) {
      normalizedHeaders[key] = Array.isArray(value) ? value[0] : value;
    }

    const context: { userId?: string; headers: Record<string, string | undefined> } = {
      headers: normalizedHeaders,
    };
    if (userId) {
      context.userId = userId;
    }

    return handler(req.params.name, req.params.arguments || {}, context);
  });

  // 创建 StreamableHTTPServerTransport
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
  });

  // 设置必要的回调（满足 Transport 接口要求）
  transport.onclose = () => {};
  transport.onerror = () => {};

  // 连接 Server 到 Transport（Server 会自动处理消息）
  // 使用类型断言解决 exactOptionalPropertyTypes 的类型检查问题
  await mcpServer.connect(transport as any);

  // MCP 端点 - 处理 GET 和 POST 请求
  fastify.all('/mcp', async (request, reply) => {
    // 解析请求体（如果是 POST）
    let parsedBody: any;
    if (request.method === 'POST') {
      try {
        parsedBody = request.body;
      } catch {
        // 忽略解析错误
      }
    }

    // 处理请求
    await transport.handleRequest(request.raw, reply.raw, parsedBody);
  });

  // 启动
  await fastify.listen({ port, host: '0.0.0.0' });
  console.log(`✅ MCP 服务运行在 http://localhost:${port}/mcp`);
  console.log(`📄 登录页: http://localhost:${port}/login.html`);
}
