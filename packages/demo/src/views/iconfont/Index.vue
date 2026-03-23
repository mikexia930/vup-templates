<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      style="height: 60px"
      class="bg-neutral-5 box-border flex items-center justify-between px-12 py-4"
    >
      <div class="text-neutral-7 text-sm">IconFont</div>
      <div class="text-neutral-7 text-sm">
        <el-button type="primary" @click="router.push('/')">
          <span>Back</span>
        </el-button>
      </div>
    </div>
    <div class="box-border p-4">
      <VIconFont icon="shuidi" />
    </div>
  </div>
</template>
