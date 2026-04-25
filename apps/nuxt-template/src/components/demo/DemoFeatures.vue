<script setup lang="ts">
const { t } = useI18n();

const featureItems = [
  { key: 'routing', symbol: '↗' },
  { key: 'i18n', symbol: '◎' },
  { key: 'pinia', symbol: '↻' },
  { key: 'api', symbol: '↔' },
  { key: 'mock', symbol: '□' },
  { key: 'modules', symbol: '◫' },
] as const;
</script>

<template>
  <section id="features" class="bg-neutral-2 py-[76px]">
    <div class="mx-auto w-[min(1120px,calc(100%_-_48px))] max-[680px]:w-[calc(100%_-_32px)]">
      <DemoSectionTitle
        :description="t('demo.features.description')"
        :title="t('demo.features.title')"
      />

      <div class="grid grid-cols-3 gap-[16px] max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
        <article
          v-for="item in featureItems"
          :key="item.key"
          class="border-neutral-3 rounded-md border bg-white p-[22px]"
        >
          <div
            class="bg-primary-0 text-primary-6 grid size-[42px] place-items-center rounded-md font-bold"
          >
            {{ item.symbol }}
          </div>
          <h3 class="text-neutral-9 mt-[14px] text-[16px] font-bold">
            {{ t(`demo.features.titles.${item.key}`) }}
          </h3>
          <p class="leading-lg text-neutral-6 mt-[8px] text-sm">
            {{ t(`demo.features.items.${item.key}`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
