// Nuxt 不依赖 @vup/http（用 ofetch），ApiResponse 在此自行定义
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

export interface ApiListData<T = unknown> {
  items: T[];
  total: number;
}
