import type { ToolDefinition, ToolHandler } from './types';
import { requireAuth } from './requireAuth';

/**
 * 定义工具的辅助函数
 * 自动处理认证、类型转换等
 */
export function defineTool(def: {
  name: string;
  description: string;
  inputSchema: {
    type?: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  requiresAuth?: boolean;
  handler: ToolHandler;
}): ToolDefinition {
  // 确保 inputSchema 格式正确
  const inputSchema = {
    type: 'object' as const,
    properties: def.inputSchema.properties || {},
    required: def.inputSchema.required || [],
  };

  // 如果需要认证，自动包装 handler
  const handler = def.requiresAuth ? requireAuth(def.handler) : def.handler;

  // 构建返回对象，只在 requiresAuth 为 true 时包含该属性
  const result: ToolDefinition = {
    name: def.name,
    description: def.description,
    inputSchema,
    handler,
  };

  if (def.requiresAuth) {
    result.requiresAuth = true;
  }

  return result;
}
