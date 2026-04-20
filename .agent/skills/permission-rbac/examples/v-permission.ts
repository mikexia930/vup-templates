// 范例：apps/<app>/src/directives/permission.ts
//
// 按钮级权限指令：无权限时移除 DOM 元素
//
// 用法：
//   <el-button v-permission="'user:delete'">删除</el-button>
//   <el-button v-permission="['user:create', 'user:edit']">编辑</el-button>
//
// 注册方式（在 main.ts）：
//   import { vPermission } from '@/directives/permission';
//   app.directive('permission', vPermission);

import type { Directive } from 'vue';
import { usePermissionStore } from '@/stores/permission';

export const vPermission: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const permissionStore = usePermissionStore();
    const codes = Array.isArray(binding.value) ? binding.value : [binding.value];

    // 任一权限码命中即放行
    const hasAny = codes.some((code) => permissionStore.hasPermission(code));

    if (!hasAny) {
      el.parentNode?.removeChild(el);
    }
  },
};
