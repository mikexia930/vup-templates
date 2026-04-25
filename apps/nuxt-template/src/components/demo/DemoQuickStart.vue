<script setup lang="ts">
const { t } = useI18n();

const quickStartItems = [
  { command: 'pnpm dev', key: 'dev', symbol: '▣' },
  { command: 'pnpm build', key: 'build', symbol: '◆' },
  { command: 'pnpm generate', key: 'generate', symbol: '◇' },
  { command: 'pnpm lint', key: 'lint', symbol: '⌕' },
] as const;
</script>

<template>
  <section id="quickstart" class="py-[76px]">
    <div class="mx-auto w-[min(1120px,calc(100%_-_48px))] max-[680px]:w-[calc(100%_-_32px)]">
      <DemoSectionTitle
        :description="t('demo.quickstart.description')"
        :title="t('demo.quickstart.title')"
      />

      <div class="grid grid-cols-4 gap-[16px] max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
        <article
          v-for="item in quickStartItems"
          :key="item.command"
          class="border-neutral-3 rounded-md border bg-white p-[22px]"
        >
          <div
            class="bg-primary-0 text-primary-6 grid size-[42px] place-items-center rounded-md font-bold"
          >
            {{ item.symbol }}
          </div>
          <h3 class="text-neutral-9 mt-[14px] text-[16px] font-bold">
            {{ t(`demo.quickstart.items.${item.key}.title`) }}
          </h3>
          <p class="leading-lg text-neutral-6 mt-[8px] text-sm">
            {{ t(`demo.quickstart.items.${item.key}.description`) }}
          </p>
          <code
            class="bg-neutral-8 text-primary-0 mt-[16px] block rounded-md px-[10px] py-[9px] text-xs [overflow-wrap:anywhere]"
          >
            {{ item.command }}
          </code>
        </article>
      </div>
    </div>
  </section>
</template>
