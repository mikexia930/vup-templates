import request from '@/api/request';
import type { DemoTask, DemoTaskStatus } from '../types/task';

/**
 * 默认走真实请求路径，保持应用侧 request -> 模块 api 的组织方式清晰。
 * 如需演示 mock 接入，请参考根目录 examples/mock。
 */
export async function listDemoTasks() {
  return request.get<DemoTask[]>('/api/template-demo/tasks');
}

export async function updateDemoTaskStatus(taskId: DemoTask['id'], status: DemoTaskStatus) {
  return request.patch<DemoTask>(`/api/template-demo/tasks/${taskId}/status`, { status });
}
