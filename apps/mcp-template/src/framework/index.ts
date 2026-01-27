// framework/index.ts
// MCP 框架核心 API

export { defineTool } from './defineTool';
export { requireAuth, setAuthConfig } from './requireAuth';
export { createToolRegistry } from './toolRegistry';
export { createMcpServer } from './createServer';
export type {
  McpServerConfig,
  ToolContext,
  ToolDefinition,
  ToolHandler,
  ToolRegistry,
} from './types';
