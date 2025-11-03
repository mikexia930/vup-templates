<script setup lang="ts">
import { loadMicroApp } from 'qiankun';

let _microApp: any = null;
onMounted(() => {
  nextTick(() => {
    _microApp = loadMicroApp({
      name: 'vue-template',
      entry: 'http://localhost:9301',
      container: '#manual-app-container',
      props: {
        name: 'vue-template-manual',
        baseRoute: '/manual/vue',
        container: '#manual-app-container',
      },
    });
  });
});
</script>

<template>
  <section class="p-6 space-y-4">
    <header>
      <h1 class="text-xl font-semibold">手动加载示例</h1>
    </header>

    <div
      id="manual-app-container"
      class="min-h-[400px] rounded border border-dashed border-gray-300 bg-white"
    ></div>
  </section>
</template>
