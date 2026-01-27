// 认证相关工具
import { defineTool } from '../framework';
import type { ToolContext, ToolDefinition } from '../framework';

/**
 * 获取用户资料（需要登录）
 */
export const get_user_profile: ToolDefinition = defineTool({
  name: 'get_user_profile',
  description: '获取当前用户资料（需要登录）',
  inputSchema: {
    properties: {},
    required: [],
  },
  requiresAuth: true, // 一行代码启用认证
  handler: async (args, context: ToolContext) => {
    // context.userId 已自动注入，无需手动检查
    return {
      content: [{ type: 'text', text: `用户ID: ${context.userId}, 名称: Alice` }],
    };
  },
});
