<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';

const { t } = useI18n();

const featureItems = ['capacitor', 'safeArea', 'ui', 'module'] as const;
</script>

<template>
  <section class="grid gap-[28px] pt-[80px] max-[560px]:gap-[14px] max-[560px]:pt-[36px]">
    <DemoSectionTitle
      :description="t('demo.features.description')"
      :title="t('demo.features.title')"
    />

    <div
      class="mx-auto grid w-[min(100%,1200px)] grid-cols-4 gap-[18px] px-[24px] max-[960px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:gap-[10px] max-[560px]:px-[16px]"
    >
      <article
        v-for="key in featureItems"
        :key="key"
        class="border-neutral-3 m-0 grid gap-[7px] rounded-xl border bg-white p-[24px] shadow-sm max-[560px]:p-[14px]"
      >
        <h3 class="text-neutral-9 m-0 text-[20px] font-extrabold max-[560px]:text-[16px]">
          {{ t(`demo.features.titles.${key}`) }}
        </h3>
        <p class="leading-md text-neutral-6 m-0 text-[15px] max-[560px]:text-[13px]">
          {{ t(`demo.features.items.${key}`) }}
        </p>
      </article>
    </div>
  </section>
</template>
