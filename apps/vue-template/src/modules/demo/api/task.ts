import request from '@/api/request';
import type { DemoTask, DemoTaskStatus } from '../types/task';

/**
 * 示例模块仍然走真实请求路径，方便保留应用层 request -> 模块 api 的组织方式。
 * 如需演示 mock / pwa / qiankun，请参考根目录 examples 下的专项示例工程。
 */

export async function listDemoTasks() {
  return request.get<DemoTask[]>('/api/template-demo/tasks');
}

export async function updateDemoTaskStatus(taskId: DemoTask['id'], status: DemoTaskStatus) {
  return request.patch<DemoTask>(`/api/template-demo/tasks/${taskId}/status`, {
    status,
  });
}
