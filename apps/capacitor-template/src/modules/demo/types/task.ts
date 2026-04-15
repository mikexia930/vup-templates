export type DemoTaskStatus = 'pending' | 'in_progress' | 'done';

export type DemoTaskPriority = 'low' | 'medium' | 'high';

export type DemoTaskFilter = 'all' | DemoTaskStatus;

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

export interface DemoTaskStats {
  total: number;
  pending: number;
  inProgress: number;
  done: number;
}
