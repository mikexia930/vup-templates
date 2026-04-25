<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import { createI18n } from '../locales';

const { lang } = useData();
const { t } = createI18n(lang.value);

const quickStartItems = [
  { command: 'pnpm dev', key: 'dev', symbol: '▶' },
  { command: 'pnpm build', key: 'build', symbol: '◆' },
  { command: 'pnpm preview', key: 'preview', symbol: '◉' },
];

const capabilityItems = [
  { key: 'markdown', symbol: 'MD' },
  { key: 'frontmatter', symbol: 'FM' },
  { key: 'i18n', symbol: '中' },
  { key: 'theme', symbol: 'UI' },
  { key: 'static', symbol: 'SSG' },
  { key: 'search', symbol: '⌕' },
];

const structureRows = computed(() => [
  {
    layer: t('structure.rows.content.layer'),
    path: 'src/index.md · src/docs.md',
    responsibility: t('structure.rows.content.responsibility'),
  },
  {
    layer: t('structure.rows.locale.layer'),
    path: 'src/en/',
    responsibility: t('structure.rows.locale.responsibility'),
  },
  {
    layer: t('structure.rows.config.layer'),
    path: '.vitepress/config.mts',
    responsibility: t('structure.rows.config.responsibility'),
  },
  {
    layer: t('structure.rows.theme.layer'),
    path: '.vitepress/theme/',
    responsibility: t('structure.rows.theme.responsibility'),
  },
]);
</script>

<template>
  <div
    class="vitepress-demo mx-auto w-[min(1120px,calc(100%_-_48px))] py-[64px] max-[720px]:w-[calc(100%_-_32px)]"
  >
    <section class="mb-[64px]">
      <div class="mb-[26px]">
        <h2 class="leading-sm text-neutral-9 text-[28px] font-extrabold">
          {{ t('quickstart.title') }}
        </h2>
        <p class="leading-lg text-neutral-6 mt-[8px] text-[16px]">
          {{ t('quickstart.description') }}
        </p>
      </div>

      <div class="grid grid-cols-3 gap-[16px] max-[860px]:grid-cols-1">
        <article
          v-for="item in quickStartItems"
          :key="item.key"
          class="border-neutral-3 rounded-md border bg-white p-[22px]"
        >
          <div
            class="bg-primary-0 text-primary-6 grid size-[42px] place-items-center rounded-md text-sm font-bold"
          >
            {{ item.symbol }}
          </div>
          <h3 class="text-neutral-9 mt-[14px] text-[16px] font-bold">
            {{ t(`quickstart.${item.key}.title`) }}
          </h3>
          <p class="leading-lg text-neutral-6 mt-[8px] text-sm">
            {{ t(`quickstart.${item.key}.description`) }}
          </p>
          <code
            class="bg-neutral-8 text-primary-0 mt-[16px] block rounded-md px-[10px] py-[9px] text-xs"
          >
            {{ item.command }}
          </code>
        </article>
      </div>
    </section>

    <section class="mb-[64px]">
      <div class="mb-[26px]">
        <h2 class="leading-sm text-neutral-9 text-[28px] font-extrabold">
          {{ t('capabilities.title') }}
        </h2>
        <p class="leading-lg text-neutral-6 mt-[8px] text-[16px]">
          {{ t('capabilities.description') }}
        </p>
      </div>

      <div class="grid grid-cols-3 gap-[16px] max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
        <article
          v-for="item in capabilityItems"
          :key="item.key"
          class="border-neutral-3 rounded-md border bg-white p-[18px]"
        >
          <div class="flex items-center gap-[12px]">
            <span
              class="bg-primary-0 text-primary-6 grid size-[38px] place-items-center rounded-md text-xs font-bold"
            >
              {{ item.symbol }}
            </span>
            <h3 class="text-neutral-9 text-[16px] font-bold">
              {{ t(`capabilities.items.${item.key}.title`) }}
            </h3>
          </div>
          <p class="leading-lg text-neutral-6 mt-[12px] text-sm">
            {{ t(`capabilities.items.${item.key}.description`) }}
          </p>
        </article>
      </div>
    </section>

    <section>
      <div class="mb-[26px]">
        <h2 class="leading-sm text-neutral-9 text-[28px] font-extrabold">
          {{ t('structure.title') }}
        </h2>
        <p class="leading-lg text-neutral-6 mt-[8px] text-[16px]">
          {{ t('structure.description') }}
        </p>
      </div>

      <div class="border-neutral-3 overflow-hidden rounded-xl border bg-white">
        <div
          class="bg-neutral-1 text-neutral-6 grid grid-cols-[0.8fr_1fr_1.4fr] px-[18px] py-[12px] text-sm font-bold max-[760px]:hidden"
        >
          <span>{{ t('structure.table.layer') }}</span>
          <span>{{ t('structure.table.path') }}</span>
          <span>{{ t('structure.table.responsibility') }}</span>
        </div>
        <div
          v-for="row in structureRows"
          :key="row.path"
          class="border-neutral-3 grid grid-cols-[0.8fr_1fr_1.4fr] gap-[16px] border-t px-[18px] py-[14px] text-sm max-[760px]:grid-cols-1"
        >
          <strong class="text-neutral-9">{{ row.layer }}</strong>
          <code class="text-primary-6 [overflow-wrap:anywhere]">{{ row.path }}</code>
          <span class="leading-lg text-neutral-6">{{ row.responsibility }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
