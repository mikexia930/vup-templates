export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

export interface ApiListData<T = unknown> {
  items: T[];
  total: number;
}
