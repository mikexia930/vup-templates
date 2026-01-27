import { createMcpServer, createToolRegistry } from './framework';
import { TOOLS } from './tools';
import type { ToolDefinition } from './framework';

// 创建工具注册表并注册所有工具
const registry = createToolRegistry();
(TOOLS as ToolDefinition[]).forEach((tool) => registry.register(tool));

// 创建并启动 MCP 服务器
createMcpServer(
  {
    name: 'mcp-server',
    version: '1.0.0',
    mode: process.argv.includes('--remote') || process.env.MCP_MODE === 'sse' ? 'sse' : 'stdio',
    port: Number.parseInt(process.env.PORT || '9316'),
    auth: {
      loginUrl: `${process.env.BASE_URL || 'http://localhost:9316'}/login.html`,
      checkAuth: (context) => !!context.userId,
    },
  },
  registry
).catch((error) => {
  console.error('❌ MCP 服务器启动失败:', error);
  process.exit(1);
});
