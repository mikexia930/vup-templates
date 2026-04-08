export type DemoTaskStatus = 'done' | 'in_progress' | 'pending';

export type DemoTaskPriority = 'high' | 'low' | 'medium';

export type DemoTaskFilter = 'all' | DemoTaskStatus;

export interface DemoTask {
  id: number;
  owner: string;
  priority: DemoTaskPriority;
  status: DemoTaskStatus;
  summary: string;
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface DemoTaskStats {
  done: number;
  inProgress: number;
  pending: number;
  total: number;
}
