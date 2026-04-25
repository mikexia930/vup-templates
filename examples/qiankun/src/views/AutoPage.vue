<script setup lang="ts">
import { useQiankunRuntime } from '@/qiankun/state';

const { modeLabel, reportToHost, runtime } = useQiankunRuntime();
</script>

<template>
  <main class="from-primary-0 to-neutral-1 min-h-[420px] bg-linear-to-b p-[24px]">
    <section class="border-neutral-3 rounded-md border bg-white p-[22px] shadow-sm">
      <p class="text-primary-6 text-sm font-bold">Auto child route</p>
      <h1 class="leading-sm text-neutral-9 mt-[6px] text-[28px] font-extrabold">自动加载子页面</h1>
      <p class="leading-lg text-neutral-6 mt-[10px] max-w-[640px] text-[15px]">
        当前页面由基座的
        <code class="bg-neutral-1 text-primary-6 rounded px-[5px] py-[2px]">activeRule</code>
        命中后挂载，子应用内部根据基座传入的 mode 渲染自动加载页。
      </p>

      <div class="mt-[20px] grid grid-cols-3 gap-[12px] max-[720px]:grid-cols-1">
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <p class="text-neutral-5 text-xs font-bold uppercase">mode</p>
          <p class="text-neutral-9 mt-[6px] text-sm font-bold">{{ modeLabel }}</p>
        </div>
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <p class="text-neutral-5 text-xs font-bold uppercase">baseRoute</p>
          <p class="text-neutral-9 mt-[6px] text-sm font-bold">{{ runtime.baseRoute }}</p>
        </div>
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <p class="text-neutral-5 text-xs font-bold uppercase">host signal</p>
          <p class="text-primary-6 mt-[6px] text-sm font-bold">
            #{{ runtime.hostState.signal ?? '-' }}
          </p>
        </div>
      </div>

      <div class="border-neutral-3 mt-[20px] rounded-md border p-[16px]">
        <p class="text-neutral-9 text-sm font-bold">收到的基座状态</p>
        <dl class="text-neutral-6 mt-[12px] grid gap-[8px] text-sm">
          <div class="flex justify-between gap-[16px]">
            <dt>用户</dt>
            <dd class="text-neutral-9 font-bold">{{ runtime.hostState.userName ?? '未下发' }}</dd>
          </div>
          <div class="flex justify-between gap-[16px]">
            <dt>更新时间</dt>
            <dd class="text-neutral-9 font-bold">{{ runtime.hostState.updatedAt ?? '-' }}</dd>
          </div>
        </dl>
      </div>

      <button
        class="bg-primary-5 hover:bg-primary-6 mt-[20px] inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border-0 px-[16px] text-sm font-bold text-white transition"
        type="button"
        @click="reportToHost('auto')"
      >
        上报自动页交互
      </button>
    </section>
  </main>
</template>
