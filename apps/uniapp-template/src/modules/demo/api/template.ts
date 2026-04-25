/**
 * Demo 模块示例接口
 *
 * demo 默认使用模块内测试数据，避免模板启动后依赖真实后端。
 * 真实项目里把函数体替换成下面的 http 调用即可。
 *
 * 调用链：
 *   modules/demo/api  →  common/api (业务策略)  →  libs/http (uni.request 封装)
 */
// import { http } from '@/common/api';
import {
  createFeedbackResultMock,
  templateInfoMock,
  waitForDemoResponse,
} from '../common/mock-data';
import type { TemplateFeedback, TemplateFeedbackResult, TemplateInfo } from '../types/template';

/**
 * 获取模板基础信息
 */
export function fetchTemplateInfo() {
  // return http.get<TemplateInfo>('/api/template-demo/info');
  return waitForDemoResponse<TemplateInfo>(templateInfoMock);
}

/**
 * 提交模板反馈
 */
export function submitTemplateFeedback(payload: TemplateFeedback) {
  // return http.post<TemplateFeedbackResult>('/api/template-demo/feedback', payload);
  return waitForDemoResponse<TemplateFeedbackResult>(createFeedbackResultMock(payload), 520);
}
