<script setup lang="ts">
import { computed } from 'vue';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

const modeLabel = computed(() =>
  qiankunWindow.__POWERED_BY_QIANKUN__ ? 'Mounted by host app' : 'Running standalone'
);
</script>

<template>
  <main
    class="from-primary-0 to-neutral-1 grid min-h-screen place-items-center bg-linear-to-b p-[24px]"
  >
    <section
      class="border-neutral-3 w-[min(760px,100%)] rounded-xl border bg-white p-[28px] shadow-sm"
    >
      <p class="text-primary-6 text-sm font-bold">Example / qiankun</p>
      <h1 class="leading-xs text-neutral-9 mt-[8px] text-[36px] font-extrabold">
        qiankun sub-app example
      </h1>
      <p class="leading-lg text-neutral-6 mt-[16px] text-[16px]">
        This standalone page verifies that the child app can run by itself. When mounted by the host
        template, the same app renders the auto or manual child route based on qiankun props.
      </p>

      <dl class="mt-[24px] grid gap-[12px] text-sm">
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <dt class="text-neutral-5 text-xs font-bold uppercase">mode</dt>
          <dd class="text-neutral-9 mt-[6px] font-bold">{{ modeLabel }}</dd>
        </div>
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <dt class="text-neutral-5 text-xs font-bold uppercase">purpose</dt>
          <dd class="text-neutral-6 mt-[6px]">
            Verify standalone startup and qiankun child lifecycle compatibility.
          </dd>
        </div>
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <dt class="text-neutral-5 text-xs font-bold uppercase">host routes</dt>
          <dd class="text-neutral-6 mt-[6px]">
            Mounted routes are selected by host props: auto or manual.
          </dd>
        </div>
      </dl>
    </section>
  </main>
</template>
