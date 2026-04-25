<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';

const { t } = useI18n();

const featureItems = ['process', 'preload', 'router', 'module'] as const;
</script>

<template>
  <section id="features" class="grid gap-6 pt-16">
    <DemoSectionTitle
      :description="t('demo.features.description')"
      :title="t('demo.features.title')"
    />
    <div class="grid grid-cols-4 gap-4 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
      <article
        v-for="key in featureItems"
        :key="key"
        class="border-neutral-4 bg-neutral-0 grid gap-3 rounded-xl border p-6"
      >
        <h3 class="text-neutral-8 text-lg font-extrabold">
          {{ t(`demo.features.items.${key}.title`) }}
        </h3>
        <p class="leading-lg text-neutral-7 text-sm">
          {{ t(`demo.features.items.${key}.description`) }}
        </p>
      </article>
    </div>
  </section>
</template>
