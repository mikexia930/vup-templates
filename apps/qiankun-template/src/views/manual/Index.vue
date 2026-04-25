<script setup lang="ts">
import { loadMicroApp } from 'qiankun';
import { manualMicroApp } from '@/micro/config';
import { addLifecycleLog, useQiankunHostState } from '@/micro/state';

const { broadcastHostState } = useQiankunHostState();
let microApp: any = null;

onMounted(() => {
  nextTick(() => {
    // 手动模式由页面决定何时加载，适合“不是路由即应用”的场景。
    addLifecycleLog('loadMicroApp', manualMicroApp.name, 'manual mount requested');
    microApp = loadMicroApp(manualMicroApp);
    microApp?.mountPromise?.then(() => {
      addLifecycleLog('afterMount', manualMicroApp.name, 'manual child app mounted');
    });
  });
});

onUnmounted(() => {
  if (!microApp) return;
  // 手动挂载必须手动卸载，否则子应用事件、计时器和 DOM 容器可能残留。
  addLifecycleLog('beforeUnmount', manualMicroApp.name, 'manual route leaves');
  microApp.unmount();
  microApp.unmountPromise?.then(() => {
    addLifecycleLog('afterUnmount', manualMicroApp.name, 'manual container released');
  });
  microApp = null;
});
</script>

<template>
  <section class="border-neutral-3 rounded-xl border bg-white p-[22px] shadow-sm">
    <header class="flex flex-wrap items-start justify-between gap-[16px]">
      <div>
        <p class="text-primary-6 text-sm font-bold">Manual Mode</p>
        <h2 class="leading-sm text-neutral-9 mt-[4px] text-[28px] font-extrabold">手动控制加载</h2>
        <p class="leading-lg text-neutral-6 mt-[8px] max-w-[620px] text-[15px]">
          这个页面使用
          <code class="bg-neutral-1 text-primary-6 rounded px-[5px] py-[2px]">loadMicroApp()</code>
          直接挂载子应用，离开页面时主动调用
          <code class="bg-neutral-1 text-primary-6 rounded px-[5px] py-[2px]">unmount()</code>
          释放容器。
        </p>
      </div>
      <button
        class="border-primary-5 text-primary-6 hover:bg-primary-0 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border bg-white px-[14px] text-sm font-bold transition"
        type="button"
        @click="broadcastHostState('manual page')"
      >
        广播状态
      </button>
    </header>

    <div class="mt-[22px] grid grid-cols-3 gap-[12px] max-[760px]:grid-cols-1">
      <div class="bg-neutral-1 rounded-md p-[14px]">
        <p class="text-neutral-5 text-xs font-bold uppercase">entry</p>
        <p class="text-neutral-9 mt-[6px] text-sm font-bold [overflow-wrap:anywhere]">
          {{ manualMicroApp.entry }}
        </p>
      </div>
      <div class="bg-neutral-1 rounded-md p-[14px]">
        <p class="text-neutral-5 text-xs font-bold uppercase">control</p>
        <p class="text-neutral-9 mt-[6px] text-sm font-bold">loadMicroApp()</p>
      </div>
      <div class="bg-neutral-1 rounded-md p-[14px]">
        <p class="text-neutral-5 text-xs font-bold uppercase">container</p>
        <p class="text-neutral-9 mt-[6px] text-sm font-bold">{{ manualMicroApp.container }}</p>
      </div>
    </div>

    <div
      id="manual-app-container"
      class="border-neutral-4 bg-neutral-1 mt-[22px] min-h-[420px] overflow-hidden rounded-md border border-dashed"
    ></div>
  </section>
</template>
