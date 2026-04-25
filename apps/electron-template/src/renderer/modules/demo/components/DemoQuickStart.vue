<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';

const { t } = useI18n();

const quickStartItems = ['dev', 'build', 'make', 'package'] as const;
</script>

<template>
  <section id="quickstart" class="grid gap-6 pt-16">
    <DemoSectionTitle
      :description="t('demo.quickstart.description')"
      :title="t('demo.quickstart.title')"
    />
    <div class="grid grid-cols-4 gap-4 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
      <article
        v-for="key in quickStartItems"
        :key="key"
        class="border-neutral-4 bg-neutral-0 shadow-neutral-3/40 grid gap-3 rounded-xl border p-5 shadow-sm"
      >
        <h3 class="text-neutral-8 text-lg font-extrabold">
          {{ t(`demo.quickstart.items.${key}.title`) }}
        </h3>
        <p class="leading-md text-neutral-7 text-sm">
          {{ t(`demo.quickstart.items.${key}.description`) }}
        </p>
        <code
          class="bg-neutral-8 text-neutral-2 rounded-lg px-3 py-2 text-xs [overflow-wrap:anywhere]"
          >{{ t(`demo.quickstart.items.${key}.command`) }}</code
        >
      </article>
    </div>
  </section>
</template>
