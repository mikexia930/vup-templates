import type { DemoTask, DemoTaskStatus } from '../types/task';

/**
 * Electron demo 使用本地内存数据，避免首次运行依赖外部服务。
 */

interface ListDemoTasksOptions {
  forceError?: boolean;
}

function createBaseTasks(): DemoTask[] {
  return [
    {
      id: 1,
      owner: 'Tech Lead',
      priority: 'high',
      status: 'in_progress',
      summary: 'Converge demo entrance and make onboarding path explicit.',
      tags: ['onboarding', 'guide'],
      title: 'Refine demo entry structure',
      updatedAt: '2026-04-01 09:20',
    },
    {
      id: 2,
      owner: 'Frontend Engineer',
      priority: 'medium',
      status: 'pending',
      summary: 'Keep request/store/component boundaries obvious for real projects.',
      tags: ['module', 'architecture'],
      title: 'Align module responsibility boundaries',
      updatedAt: '2026-04-01 10:10',
    },
    {
      id: 3,
      owner: 'Designer',
      priority: 'medium',
      status: 'done',
      summary: 'Simplify visual hierarchy and keep information density manageable.',
      tags: ['ui'],
      title: 'Polish demo visual hierarchy',
      updatedAt: '2026-04-01 10:40',
    },
    {
      id: 4,
      owner: 'Architect',
      priority: 'high',
      status: 'pending',
      summary: 'Define app adapter layer and module API boundaries.',
      tags: ['request', 'rule'],
      title: 'Set API layering baseline',
      updatedAt: '2026-04-01 11:00',
    },
  ];
}

const db: DemoTask[] = createBaseTasks().map((task) => ({
  ...task,
  tags: [...task.tags],
}));

function cloneTask(task: DemoTask): DemoTask {
  return {
    ...task,
    tags: [...task.tags],
  };
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function listDemoTasks(options: ListDemoTasksOptions = {}) {
  await wait(320);

  if (options.forceError) {
    throw new Error('Mock: demo list failed, please verify error flow.');
  }

  return db.map(cloneTask);
}

export async function updateDemoTaskStatus(taskId: DemoTask['id'], status: DemoTaskStatus) {
  await wait(180);

  const target = db.find((item) => item.id === taskId);
  if (!target) {
    throw new Error('Mock: task not found.');
  }

  target.status = status;
  target.updatedAt = new Date().toLocaleString();

  return cloneTask(target);
}
