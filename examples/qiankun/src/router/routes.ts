import type { RouteRecordRaw } from 'vue-router';
import type { ChildMode } from '@/qiankun/state';

export function createRoutes(mode: ChildMode): RouteRecordRaw[] {
  if (mode === 'auto') {
    return [
      {
        path: '/',
        name: 'qiankun-auto',
        component: () => import('@/views/AutoPage.vue'),
      },
    ];
  }

  if (mode === 'manual') {
    return [
      {
        path: '/',
        name: 'qiankun-manual',
        component: () => import('@/views/ManualPage.vue'),
      },
    ];
  }

  return [
    {
      path: '/',
      name: 'qiankun-intro',
      component: () => import('@/views/IntroPage.vue'),
    },
  ];
}
