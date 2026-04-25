import type { TemplateFeedback, TemplateFeedbackResult, TemplateInfo } from '../types/template';

export const templateInfoMock: TemplateInfo = {
  name: 'UniApp App Template',
  version: 'v2.0.0',
  description: 'uni-app + Vue 3 multi-platform app template',
  platforms: ['h5', 'mp-weixin', 'mp-alipay', 'app'],
  updatedAt: '2026-04-25T00:00:00.000Z',
};

export function createFeedbackResultMock(payload: TemplateFeedback): TemplateFeedbackResult {
  return {
    id: `feedback-${payload.rating}-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
}

export function waitForDemoResponse<T>(data: T, delay = 650): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}
