<script setup lang="ts">
const { t } = useI18n();

const itemKeys = ['install', 'dev', 'build', 'lint'] as const;
</script>

<template>
  <section class="grid gap-4">
    <div>
      <h2 class="text-xl font-semibold tracking-tight text-slate-900">
        {{ t('demo.guide.quickStart.title') }}
      </h2>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        {{ t('demo.guide.quickStart.description') }}
      </p>
    </div>

    <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <VCard v-for="itemKey in itemKeys" :key="itemKey" shadow="never">
        <div class="text-base font-semibold text-slate-900">
          {{ t(`demo.guide.quickStart.items.${itemKey}.title`) }}
        </div>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          {{ t(`demo.guide.quickStart.items.${itemKey}.description`) }}
        </p>
        <VTag class="mt-3" effect="dark" type="info">
          {{ t(`demo.guide.quickStart.items.${itemKey}.command`) }}
        </VTag>
      </VCard>
    </div>
  </section>
</template>
