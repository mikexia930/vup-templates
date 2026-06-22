export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 项目级扩展类型
export interface ApiListData<T = unknown> {
  items: T[];
  total: number;
}
