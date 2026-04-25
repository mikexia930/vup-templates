<script setup lang="ts">
const rows = [
  {
    layer: '全局共享',
    path: 'src/common',
    responsibility: '多个 entrypoint 共用的 storage、message 类型和扩展状态。',
  },
  {
    layer: '展示模块',
    path: 'src/entrypoints/newtab/modules/demo',
    responsibility: 'newtab 展示页自己的视图和组件。',
  },
  {
    layer: '轻量入口',
    path: 'popup / options',
    responsibility: '短生命周期面板和设置页，不承载复杂演示逻辑。',
  },
  {
    layer: '平台入口',
    path: 'background.ts / content.ts',
    responsibility: '保留最小 WXT 入口和注释，按业务需要扩展。',
  },
];
</script>

<template>
  <section class="pb-[72px]">
    <div class="mx-auto w-[min(1120px,calc(100%_-_48px))] max-[680px]:w-[calc(100%_-_32px)]">
      <div class="mb-[28px]">
        <h2 class="leading-sm text-neutral-9 text-[28px] font-extrabold">目录边界</h2>
        <p class="leading-lg text-neutral-6 mt-[8px] text-[16px]">
          只把真正共享的能力抽到全局；展示页自己的内容留在 newtab 模块内。
        </p>
      </div>

      <div class="border-neutral-3 overflow-hidden rounded-xl border bg-white">
        <div
          class="bg-neutral-1 text-neutral-6 grid grid-cols-[0.8fr_1fr_1.4fr] px-[18px] py-[12px] text-sm font-bold max-[760px]:hidden"
        >
          <span>层级</span>
          <span>路径</span>
          <span>职责</span>
        </div>
        <div
          v-for="row in rows"
          :key="row.path"
          class="border-neutral-3 grid grid-cols-[0.8fr_1fr_1.4fr] gap-[16px] border-t px-[18px] py-[14px] text-sm max-[760px]:grid-cols-1"
        >
          <strong class="text-neutral-9">{{ row.layer }}</strong>
          <code class="text-primary-6 [overflow-wrap:anywhere]">{{ row.path }}</code>
          <span class="leading-lg text-neutral-6">{{ row.responsibility }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
