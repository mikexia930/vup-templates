/**
 * 工具上下文
 */
export interface ToolContext {
  userId?: string;
  headers: Record<string, string | undefined>;
}

/**
 * 工具定义接口
 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  requiresAuth?: boolean;
  handler: ToolHandler;
}

/**
 * 工具处理器类型
 */
export type ToolHandler = (
  args: Record<string, any>,
  context: ToolContext
) => Promise<{ content: { type: 'text'; text: string }[] }>;

/**
 * 工具注册表
 */
export interface ToolRegistry {
  tools: ToolDefinition[];
  handlers: Map<string, ToolHandler>;
  register: (tool: ToolDefinition) => void;
  getTools: () => Array<{ name: string; description: string; inputSchema: any }>;
  getHandler: () => (name: string, args: Record<string, any>, context: ToolContext) => Promise<any>;
}

/**
 * MCP 服务器配置
 */
export interface McpServerConfig {
  name: string;
  version: string;
  mode?: 'stdio' | 'sse';
  port?: number;
  auth?: {
    loginUrl?: string;
    checkAuth?: (context: ToolContext) => boolean;
  };
}
