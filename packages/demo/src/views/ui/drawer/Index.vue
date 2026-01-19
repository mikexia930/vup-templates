<script setup lang="ts">
import { VDrawer, VButton } from '@vup/ui';
import { ref } from 'vue';

const drawerVisible = ref(false);

const handleClick = () => {
  drawerVisible.value = true;
};
</script>

<template>
  <div>
    <VButton @click="handleClick">Open</VButton>
  </div>
  <VDrawer v-model="drawerVisible" title="Drawer" width="500"></VDrawer>
</template>
