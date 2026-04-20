import request from '@/api/request';
import type { DemoTask, DemoTaskStatus } from '../types/task';

/**
 * 默认走真实请求路径，开发环境可通过 MSW 拦截返回 mock 数据。
 *
 * 推荐开关：
 * VITE_ENABLE_MOCK=true  -> 启动 @vup/mock worker，拦截 /api/template-demo/*
 * VITE_ENABLE_MOCK=false -> 直连真实后端
 */

interface ListDemoTasksOptions {
  forceError?: boolean;
}

export async function listDemoTasks(options: ListDemoTasksOptions = {}) {
  return request.get<DemoTask[]>('/api/template-demo/tasks', {
    params: {
      forceError: options.forceError ? '1' : undefined,
    },
  });
}

export async function updateDemoTaskStatus(taskId: DemoTask['id'], status: DemoTaskStatus) {
  return request.patch<DemoTask>(`/api/template-demo/tasks/${taskId}/status`, {
    status,
  });
}
