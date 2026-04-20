// 从 @vup/http re-export，避免重复定义漂移
export type { ApiResponse } from '@vup/http';

// 项目级扩展类型
export interface ApiListData<T = unknown> {
  items: T[];
  total: number;
}
