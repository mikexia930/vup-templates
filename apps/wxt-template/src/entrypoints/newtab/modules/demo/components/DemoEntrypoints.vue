<script setup lang="ts">
const entrypoints = [
  {
    name: 'popup',
    path: 'src/entrypoints/popup',
    responsibility: '点击扩展图标时打开，适合短流程和快速操作。',
    symbol: 'P',
  },
  {
    name: 'options',
    path: 'src/entrypoints/options',
    responsibility: '扩展设置页，适合持久配置和账号类操作。',
    symbol: 'O',
  },
  {
    name: 'newtab',
    path: 'src/entrypoints/newtab',
    responsibility: '新标签页替换入口，本模板用它承载展示页。',
    symbol: 'N',
  },
  {
    name: 'background',
    path: 'src/entrypoints/background.ts',
    responsibility: 'Manifest V3 service worker，适合后台监听和消息中转。',
    symbol: 'B',
  },
  {
    name: 'content',
    path: 'src/entrypoints/content.ts',
    responsibility: '注入到匹配网页的脚本，默认只给出低权限示例。',
    symbol: 'C',
  },
  {
    name: 'common',
    path: 'src/common',
    responsibility: '仅放跨 entrypoint 共享能力，例如 browser.storage 封装。',
    symbol: 'S',
  },
];
</script>

<template>
  <section class="py-[68px]">
    <div class="mx-auto w-[min(1120px,calc(100%_-_48px))] max-[680px]:w-[calc(100%_-_32px)]">
      <div class="mb-[28px]">
        <h2 class="leading-sm text-neutral-9 text-[28px] font-extrabold">Entrypoints</h2>
        <p class="leading-lg text-neutral-6 mt-[8px] text-[16px]">
          WXT 通过 entrypoints 区分扩展运行环境。每个入口内存独立，跨入口共享才进入 src/common。
        </p>
      </div>

      <div class="grid grid-cols-3 gap-[16px] max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
        <article
          v-for="item in entrypoints"
          :key="item.name"
          class="border-neutral-3 rounded-md border bg-white p-[18px]"
        >
          <div class="flex items-center gap-[12px]">
            <span
              class="bg-primary-0 text-primary-6 grid size-[38px] place-items-center rounded-md text-xs font-bold"
            >
              {{ item.symbol }}
            </span>
            <h3 class="text-neutral-9 text-[16px] font-bold">{{ item.name }}</h3>
          </div>
          <code
            class="bg-neutral-1 text-primary-6 mt-[14px] block rounded-md px-[10px] py-[8px] text-xs [overflow-wrap:anywhere]"
          >
            {{ item.path }}
          </code>
          <p class="leading-lg text-neutral-6 mt-[12px] text-sm">{{ item.responsibility }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
