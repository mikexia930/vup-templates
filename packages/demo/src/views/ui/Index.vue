<script setup lang="ts">
import { VMenu } from '@vup/ui';
import type { VMenuProps } from '@vup/ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const menus: VMenuProps['menus'] = [
  {
    key: 'base',
    label: '基础组件',
    icon: 'Plus',
    children: [
      {
        key: 'button',
        label: 'Button',
        path: { name: 'button' },
      },
      {
        key: 'message',
        label: 'Message',
        path: { name: 'message' },
      },
      {
        key: 'modal',
        label: 'Modal',
        path: { name: 'modal' },
      },
      {
        key: 'messageBox',
        label: 'MessageBox',
        path: { name: 'messageBox' },
      },
      {
        key: 'drawer',
        label: 'Drawer',
        path: { name: 'drawer' },
      },
      {
        key: 'input',
        label: 'Input',
        path: { name: 'input' },
      },
      {
        key: 'text',
        label: 'Text',
        path: { name: 'text' },
      },
      {
        key: 'scrollbar',
        label: 'Scrollbar',
        path: { name: 'scrollbar' },
      },
      {
        key: 'select',
        label: 'Select',
        path: { name: 'select' },
      },
      {
        key: 'radio',
        label: 'Radio',
        path: { name: 'radio' },
      },
      {
        key: 'checkbox',
        label: 'Checkbox',
        path: { name: 'checkbox' },
      },
      {
        key: 'popover',
        label: 'Popover',
        path: { name: 'popover' },
      },
      {
        key: 'tooltip',
        label: 'Tooltip',
        path: { name: 'tooltip' },
      },
      {
        key: 'notification',
        label: 'Notification',
        path: { name: 'notification' },
      },
      {
        key: 'popconfirm',
        label: 'Popconfirm',
        path: { name: 'popconfirm' },
      },
      {
        key: 'loading',
        label: 'Loading',
        path: { name: 'loading' },
      },
    ],
  },
  {
    key: 'custom',
    label: '自定义组件',
    icon: 'Plus',
    children: [
      {
        key: 'richeditor',
        label: 'RichEditor',
        path: { name: 'richeditor' },
      },
      {
        key: 'fileManager',
        label: 'FileManager',
        path: { name: 'fileManager' },
      },
    ],
  },
];

const handleSelect = (key: string) => {
  const item =
    menus.find((menu) => menu.key === key) ||
    menus.flatMap((menu) => menu.children || []).find((child) => child.key === key);
  if (item?.path) {
    router.push(item.path);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      style="height: 60px"
      class="bg-neutral-5 flex items-center justify-between box-border px-12 py-4"
    >
      <div class="text-neutral-7 text-sm">UI</div>
      <div class="text-neutral-7 text-sm">
        <VButton type="primary" @click="router.push('/')">
          <span>Back</span>
        </VButton>
      </div>
    </div>
    <div class="flex gap-4">
      <div style="width: 200px">
        <VMenu
          default-active="2"
          class="el-menu-vertical-demo"
          :menus="menus"
          @select="handleSelect"
        />
      </div>
      <div class="flex-1 box-border p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
