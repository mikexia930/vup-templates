/**
 * Demo 模块示例数据类型
 */

export type TemplatePlatform = 'h5' | 'mp-weixin' | 'mp-alipay' | 'app';

export interface TemplateInfo {
  /** 模板名称 */
  name: string;
  /** 当前版本号 */
  version: string;
  /** 描述 */
  description: string;
  /** 支持的平台 */
  platforms: TemplatePlatform[];
  /** 最近更新时间（ISO 字符串） */
  updatedAt: string;
}

export interface TemplateFeedback {
  /** 评分 1-5 */
  rating: number;
  /** 反馈内容 */
  content: string;
}

export interface TemplateFeedbackResult {
  /** 反馈 ID */
  id: string;
  /** 提交时间 */
  createdAt: string;
}
