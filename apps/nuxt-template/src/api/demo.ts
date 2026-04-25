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

interface ListDemoTasksOptions {
  forceError?: boolean;
}

export async function listDemoTasks(options: ListDemoTasksOptions = {}) {
  return request<DemoTask[]>('/template-demo/tasks', {
    query: {
      forceError: options.forceError ? '1' : undefined,
    },
  });
}
