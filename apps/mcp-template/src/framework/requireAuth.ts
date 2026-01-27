// framework/requireAuth.ts
import { UrlElicitationRequiredError } from '@modelcontextprotocol/sdk/types.js';
import type { ToolHandler, ToolContext } from './types';

/**
 * 认证配置
 */
let authConfig: {
  loginUrl: string;
  checkAuth: (context: ToolContext) => boolean;
} = {
  loginUrl: process.env.BASE_URL || 'http://localhost:9316',
  checkAuth: (context) => !!context.userId,
};

/**
 * 设置认证配置
 */
export function setAuthConfig(config: Partial<typeof authConfig>) {
  authConfig = { ...authConfig, ...config };
  if (config.loginUrl) {
    authConfig.loginUrl = config.loginUrl.endsWith('/login.html')
      ? config.loginUrl
      : `${config.loginUrl}/login.html`;
  }
}

/**
 * 包装工具处理器，自动检查认证
 * 如果未认证，自动抛出 UrlElicitationRequiredError
 */
export function requireAuth(handler: ToolHandler): ToolHandler {
  return async (args: Record<string, any>, context: ToolContext) => {
    if (!authConfig.checkAuth(context)) {
      throw new UrlElicitationRequiredError(
        [
          {
            mode: 'url',
            message: '请先登录以访问此功能',
            elicitationId: `auth-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: authConfig.loginUrl,
          },
        ],
        'Authentication required'
      );
    }
    return handler(args, context);
  };
}
