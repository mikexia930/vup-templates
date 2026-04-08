import { delay, http, HttpResponse } from 'msw';
import type { RequestHandler } from 'msw';

export type DemoTaskStatus = 'pending' | 'in_progress' | 'done';
export type DemoTaskPriority = 'low' | 'medium' | 'high';

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

interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
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

const db: DemoTask[] = createBaseTasks().map((task) => ({ ...task, tags: [...task.tags] }));

function parseForceError(url: URL) {
  const value = url.searchParams.get('forceError');
  return value === '1' || value === 'true';
}

export const demoHandlers: RequestHandler[] = [
  http.get('*/api/template-demo/tasks', async ({ request }) => {
    await delay(320);
    if (parseForceError(new URL(request.url))) {
      const payload: ApiResponse<null> = {
        code: 5001,
        data: null,
        message: 'Mock: demo list failed, please verify error flow.',
      };
      return HttpResponse.json(payload, { status: 500 });
    }

    const payload: ApiResponse<DemoTask[]> = {
      code: 0,
      data: db.map((task) => ({ ...task, tags: [...task.tags] })),
      message: 'ok',
    };
    return HttpResponse.json(payload);
  }),

  http.patch('*/api/template-demo/tasks/:id/status', async ({ params, request }) => {
    await delay(180);

    const taskId = Number(params.id);
    const body = (await request.json()) as { status?: DemoTaskStatus };
    const target = db.find((item) => item.id === taskId);

    if (!target || !body.status) {
      const payload: ApiResponse<null> = {
        code: 4040,
        data: null,
        message: 'Mock: task not found.',
      };
      return HttpResponse.json(payload, { status: 404 });
    }

    target.status = body.status;
    target.updatedAt = new Date().toLocaleString();

    const payload: ApiResponse<DemoTask> = {
      code: 0,
      data: { ...target, tags: [...target.tags] },
      message: 'ok',
    };
    return HttpResponse.json(payload);
  }),
];
