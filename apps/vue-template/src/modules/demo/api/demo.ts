import type { DemoTask, DemoTaskResponse } from './types';

const demoTasks: DemoTask[] = [
  { id: 1, name: '搭建项目脚手架', owner: 'Alice', status: '已完成' },
  { id: 2, name: '实现用户认证模块', owner: 'Bob', status: '进行中' },
  { id: 3, name: '对接支付接口', owner: 'Carol', status: '待开始' },
  { id: 4, name: '编写单元测试', owner: 'Dave', status: '进行中' },
];

export function fetchDemoTasks(): Promise<DemoTaskResponse> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        duration: 328,
        items: demoTasks,
        status: '200 OK',
      });
    }, 900);
  });
}
