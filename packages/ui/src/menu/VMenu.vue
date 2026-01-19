<script setup lang="ts">
import { ElMenu, ElSubMenu } from 'element-plus';
import type { SubMenuProps } from 'element-plus';
import VMenuGroup from './VMenuGroup.vue';
import VMenuItem from './VMenuItem.vue';
import VMenuItemContent from './VMenuItemContent.vue';
import type { VMenuProps } from './types';

const props = withDefaults(defineProps<VMenuProps>(), {
  menus: () => [],
});
</script>

<template>
  <ElMenu v-bind="$attrs">
    <template v-for="menu in menus" :key="menu.key">
      <ElSubMenu
        v-if="menu.children"
        :index="menu.key as unknown as SubMenuProps['index']"
        :title="menu.label"
      >
        <template #title>
          <slot :name="menu.key" :menu="menu">
            <VMenuItemContent :icon="menu.icon" :label="menu.label" />
          </slot>
        </template>
        <template v-for="child in menu.children" :key="`${menu.key}-${child.key}`">
          <VMenuGroup v-if="menu.group" :group="menu.group" />
          <VMenuItem v-else :item="child" />
        </template>
      </ElSubMenu>
      <VMenuGroup v-else-if="menu.group" :group="menu.group" />
      <VMenuItem v-else :item="menu" />
    </template>
  </ElMenu>
</template>

<style scoped></style>
