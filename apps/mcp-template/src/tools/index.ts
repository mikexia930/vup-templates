import { get_user_profile } from './auth';
import { search_public_docs } from './public';
import { search_docs } from './demo';
import type { ToolDefinition } from '../framework';

// 导出所有工具定义
export const TOOLS: ToolDefinition[] = [
  get_user_profile,
  search_public_docs,
  search_docs, // 示例工具：文档搜索
];
