import { createRouter, createWebHistory } from 'vue-router';

import { createRoutes } from './routes';
import type { ChildMode } from '@/qiankun/state';

export default (baseRoute: string = '/', mode: ChildMode = 'standalone') =>
  createRouter({
    history: createWebHistory(baseRoute),
    routes: createRoutes(mode),
  });
