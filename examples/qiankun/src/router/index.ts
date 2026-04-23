import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

export default (baseRoute: string = '/') =>
  createRouter({
    history: createWebHistory(baseRoute),
    routes,
  });
