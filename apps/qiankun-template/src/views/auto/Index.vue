<script setup lang="ts">
import { autoMicroApp } from '@/micro/config';
import { useQiankunHostState } from '@/micro/state';

const { broadcastHostState } = useQiankunHostState();
</script>

<template>
  <!-- 这个 div 里的 #auto-app-container 是 qiankun 自动加载模式的真实挂载点。 -->
  <section class="border-neutral-3 rounded-xl border bg-white p-[22px] shadow-sm">
    <header class="flex flex-wrap items-start justify-between gap-[16px]">
      <div>
        <p class="text-primary-6 text-sm font-bold">Auto Mode</p>
        <h2 class="leading-sm text-neutral-9 mt-[4px] text-[28px] font-extrabold">路由自动加载</h2>
        <p class="leading-lg text-neutral-6 mt-[8px] max-w-[620px] text-[15px]">
          访问
          <code class="bg-neutral-1 text-primary-6 rounded px-[5px] py-[2px]">/auto/</code>
          时，qiankun 根据
          <code class="bg-neutral-1 text-primary-6 rounded px-[5px] py-[2px]">activeRule</code>
          自动拉取 examples/qiankun 并挂载到下面的容器。
        </p>
      </div>
      <button
        class="border-primary-5 text-primary-6 hover:bg-primary-0 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border bg-white px-[14px] text-sm font-bold transition"
        type="button"
        @click="broadcastHostState('auto page')"
      >
        广播状态
      </button>
    </header>

    <div class="mt-[22px] grid grid-cols-3 gap-[12px] max-[760px]:grid-cols-1">
      <div class="bg-neutral-1 rounded-md p-[14px]">
        <p class="text-neutral-5 text-xs font-bold uppercase">entry</p>
        <p class="text-neutral-9 mt-[6px] text-sm font-bold [overflow-wrap:anywhere]">
          {{ autoMicroApp.entry }}
        </p>
      </div>
      <div class="bg-neutral-1 rounded-md p-[14px]">
        <p class="text-neutral-5 text-xs font-bold uppercase">activeRule</p>
        <p class="text-neutral-9 mt-[6px] text-sm font-bold">{{ autoMicroApp.activeRule }}</p>
      </div>
      <div class="bg-neutral-1 rounded-md p-[14px]">
        <p class="text-neutral-5 text-xs font-bold uppercase">container</p>
        <p class="text-neutral-9 mt-[6px] text-sm font-bold">{{ autoMicroApp.container }}</p>
      </div>
    </div>

    <div
      id="auto-app-container"
      class="border-neutral-4 bg-neutral-1 mt-[22px] min-h-[420px] overflow-hidden rounded-md border border-dashed"
    ></div>
  </section>
</template>
