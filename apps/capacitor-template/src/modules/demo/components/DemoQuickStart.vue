<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';

const { t } = useI18n();

const quickStartItems = ['dev', 'ios', 'android', 'sync'] as const;
</script>

<template>
  <section class="grid gap-[28px] pt-[80px] max-[560px]:gap-[14px] max-[560px]:pt-[36px]">
    <DemoSectionTitle
      :description="t('demo.quickstart.description')"
      :title="t('demo.quickstart.title')"
    />

    <div
      class="mx-auto grid w-[min(100%,1200px)] grid-cols-4 gap-[18px] px-[24px] max-[960px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:gap-[10px] max-[560px]:px-[16px]"
    >
      <article
        v-for="key in quickStartItems"
        :key="key"
        class="border-neutral-3 m-0 grid min-w-0 gap-[7px] rounded-xl border bg-white p-[24px] shadow-sm max-[560px]:p-[14px]"
      >
        <h3 class="text-neutral-9 m-0 text-[20px] font-extrabold max-[560px]:text-[16px]">
          {{ t(`demo.quickstart.items.${key}.title`) }}
        </h3>
        <p class="leading-sm text-neutral-6 m-0 text-[15px] max-[560px]:text-[13px]">
          {{ t(`demo.quickstart.items.${key}.description`) }}
        </p>
        <code
          class="bg-neutral-8 text-neutral-1 overflow-x-auto rounded-md px-[16px] py-[14px] text-[14px] [overflow-wrap:anywhere] max-[560px]:px-[10px] max-[560px]:py-[8px] max-[560px]:text-[12px]"
        >
          {{ t(`demo.quickstart.items.${key}.command`) }}
        </code>
      </article>
    </div>
  </section>
</template>
