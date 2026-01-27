import type { ToolDefinition, ToolRegistry, ToolContext } from './types';

/**
 * 创建工具注册表
 */
export function createToolRegistry(): ToolRegistry {
  const tools: ToolDefinition[] = [];
  const handlers = new Map<string, ToolDefinition['handler']>();

  return {
    tools,
    handlers,

    register(tool: ToolDefinition) {
      tools.push(tool);
      handlers.set(tool.name, tool.handler);
    },

    getTools() {
      return tools.map(({ name, description, inputSchema }) => ({
        name,
        description,
        inputSchema,
      }));
    },

    getHandler() {
      return async (name: string, args: Record<string, any>, context: ToolContext) => {
        const handler = handlers.get(name);
        if (!handler) {
          throw new Error(`Unknown tool: ${name}`);
        }
        return handler(args, context);
      };
    },
  };
}
