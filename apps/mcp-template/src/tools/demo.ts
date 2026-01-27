// 示例工具 - 文档搜索（从 CSV 读取数据）
// 这是一个完整的示例，展示如何实现一个实用的工具
import { defineTool } from '../framework';
import type { ToolContext, ToolDefinition } from '../framework';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface DocItem {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  created_at: string;
}

/**
 * 读取 CSV 文件并解析为文档列表
 */
function loadDocs(): DocItem[] {
  const csvPath = join(__dirname, '../../data/docs.csv');

  if (!existsSync(csvPath)) {
    console.warn(`CSV file not found: ${csvPath}`);
    return [];
  }

  try {
    const content = readFileSync(csvPath, 'utf-8');
    const lines = content.trim().split('\n');

    if (lines.length < 2) {
      return [];
    }

    // 解析 CSV（简单实现，假设没有包含逗号的字段值）
    const headerLine = lines[0];
    if (!headerLine) {
      return [];
    }

    const headers = headerLine.split(',');
    const docs: DocItem[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      const values = line.split(',');
      if (values.length === headers.length) {
        docs.push({
          id: values[0] || '',
          title: values[1] || '',
          content: values[2] || '',
          author: values[3] || '',
          category: values[4] || '',
          created_at: values[5] || '',
        });
      }
    }

    return docs;
  } catch (error) {
    console.error('Failed to load docs CSV:', error);
    return [];
  }
}

/**
 * 搜索文档
 */
function searchDocs(docs: DocItem[], query: string): DocItem[] {
  const lowerQuery = query.toLowerCase();

  return docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.author.toLowerCase().includes(lowerQuery) ||
      doc.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 搜索文档库（示例工具）
 *
 * 这是一个完整的示例工具，展示如何：
 * 1. 从 CSV 文件读取数据
 * 2. 实现搜索功能
 * 3. 格式化返回结果
 */
export const search_docs: ToolDefinition = defineTool({
  name: 'search_docs',
  description: '搜索文档库，支持按标题、内容、作者、分类搜索（示例工具）',
  inputSchema: {
    properties: {
      query: {
        type: 'string',
        description: '搜索关键词（支持搜索标题、内容、作者、分类）',
      },
      limit: {
        type: 'number',
        description: '返回结果数量限制（默认 10，最大 50）',
      },
    },
    required: ['query'],
  },
  handler: async (args, context: ToolContext) => {
    const query = args.query as string;
    const limit = Math.min(Math.max(1, (args.limit as number) || 10), 50);

    // 加载文档数据
    const allDocs = loadDocs();

    if (allDocs.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: '文档库为空或加载失败',
          },
        ],
      };
    }

    // 搜索文档
    const results = searchDocs(allDocs, query);

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `未找到包含 "${query}" 的文档。\n\n提示：可以尝试搜索关键词如 "Vue"、"前端"、"数据库"、"API" 等。`,
          },
        ],
      };
    }

    // 限制返回数量
    const limitedResults = results.slice(0, limit);

    // 格式化结果
    const resultText = limitedResults
      .map((doc, index) => {
        return `${index + 1}. 【${doc.category}】${doc.title}\n   作者：${doc.author} | 日期：${doc.created_at}\n   内容：${doc.content}`;
      })
      .join('\n\n');

    const summary = `找到 ${results.length} 条相关文档（显示前 ${limitedResults.length} 条）：\n\n${resultText}`;

    return {
      content: [
        {
          type: 'text',
          text: summary,
        },
      ],
    };
  },
});
