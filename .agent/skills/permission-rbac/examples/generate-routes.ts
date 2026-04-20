// 范例：apps/<app>/src/router/generateRoutes.ts
//
// 将后端菜单树转为 vue-router 路由配置
//
// 关键设计：
//   - 用 import.meta.glob 动态映射组件（无需 switch/case）
//   - 递归处理 children
//   - menus.component 存相对路径（如 'modules/user/views/index'）
//     前端拼成 '/src/modules/user/views/index.vue' 查找

import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from '@/modules/auth/api/permission';

// 预加载所有页面组件（vite 构建时静态分析）
const viewModules = import.meta.glob<{ default: any }>('@/modules/**/views/**/*.vue');

function resolveComponent(componentPath: string) {
  const key = `/src/${componentPath}.vue`;
  const matched = viewModules[key];

  if (!matched) {
    console.warn(`[generateRoutes] 组件未找到: ${key}`);
    return undefined;
  }

  return matched;
}

export function generateRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  return menus
    .sort((a, b) => a.sort - b.sort)
    .map((menu) => {
      const route: RouteRecordRaw = {
        path: menu.path,
        name: menu.name,
        component: resolveComponent(menu.component),
        meta: {
          title: menu.name,
          icon: menu.icon,
          hidden: menu.hidden,
        },
      };

      if (menu.children?.length) {
        route.children = generateRoutes(menu.children);
      }

      return route;
    });
}
