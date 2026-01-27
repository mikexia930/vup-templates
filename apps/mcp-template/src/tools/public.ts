// 公开工具（无需认证）
import { defineTool } from '../framework';
import type { ToolContext, ToolDefinition } from '../framework';

/**
 * 搜索公开文档（无需登录）
 */
export const search_public_docs: ToolDefinition = defineTool({
  name: 'search_public_docs',
  description: '搜索公开文档（无需登录）',
  inputSchema: {
    properties: {
      query: {
        type: 'string',
        description: '搜索关键词',
      },
    },
    required: ['query'],
  },
  handler: async (args, context: ToolContext) => {
    return {
      content: [{ type: 'text', text: `Found results for: ${args.query}` }],
    };
  },
});
