import request from './request';

export type DemoTaskStatus = 'pending' | 'in_progress' | 'done';
export type DemoTaskPriority = 'low' | 'medium' | 'high';

export interface DemoTask {
  id: number;
  title: string;
  summary: string;
  owner: string;
  status: DemoTaskStatus;
  priority: DemoTaskPriority;
  updatedAt: string;
  tags: string[];
}

export async function listDemoTasks() {
  return request<DemoTask[]>('/template-demo/tasks');
}
