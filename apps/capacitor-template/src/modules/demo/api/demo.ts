import type { DemoTask, DemoTaskResponse } from './types';

const demoTasks: DemoTask[] = [
  { id: 1, name: '搭建移动端壳层', owner: 'Alice', status: '已完成' },
  { id: 2, name: '适配安全区与真机滚动', owner: 'Bob', status: '进行中' },
  { id: 3, name: '接入原生能力示例', owner: 'Carol', status: '待开始' },
  { id: 4, name: '同步 iOS / Android 工程', owner: 'Dave', status: '进行中' },
];

export function fetchDemoTasks(): Promise<DemoTaskResponse> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        duration: 286,
        items: demoTasks,
        status: '200 OK',
      });
    }, 850);
  });
}
