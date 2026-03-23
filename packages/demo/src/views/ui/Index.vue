<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSelect = (key: string) => {
  router.push({ name: key });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      style="height: 60px"
      class="bg-neutral-5 box-border flex items-center justify-between px-12 py-4"
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
        <VMenu @select="handleSelect">
          <VSubMenu index="custom">
            <template #title>自定义组件</template>
            <VMenuItem index="richeditor">RichEditor</VMenuItem>
            <VMenuItem index="fileManager">FileManager</VMenuItem>
          </VSubMenu>
        </VMenu>
      </div>
      <div class="box-border flex-1 p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
