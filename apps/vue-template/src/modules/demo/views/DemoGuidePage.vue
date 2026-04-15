<script setup lang="ts">
import DemoQuickStart from '../components/DemoQuickStart.vue';
import DemoStructureGuide from '../components/DemoStructureGuide.vue';

const { t } = useI18n();

const firstEditItems = [
  { descriptionKey: 'main', path: 'src/main.ts' },
  { descriptionKey: 'router', path: 'src/router/routes.ts' },
  { descriptionKey: 'module', path: 'src/modules/demo/' },
  { descriptionKey: 'locales', path: 'src/locales/' },
  { descriptionKey: 'request', path: 'src/api/request.ts' },
] as const;

const readOrderKeys = ['step1', 'step2', 'step3', 'step4', 'step5'] as const;
const cleanupKeys = ['legacy', 'locales', 'request', 'structure'] as const;
</script>

<template>
  <div class="grid gap-4">
    <VCard shadow="never">
      <DemoQuickStart />
    </VCard>

    <VCard shadow="never">
      <div class="mb-4">
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.guide.firstEdit.title') }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          {{ t('demo.guide.firstEdit.description') }}
        </p>
      </div>

      <ul class="grid gap-3 lg:grid-cols-2">
        <li
          v-for="item in firstEditItems"
          :key="item.path"
          class="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
        >
          <code class="block rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-green-400">
            {{ item.path }}
          </code>
          <p class="mt-2 text-sm leading-relaxed break-words whitespace-normal text-slate-600">
            {{ t(`demo.guide.firstEdit.items.${item.descriptionKey}`) }}
          </p>
        </li>
      </ul>
    </VCard>

    <VCard shadow="never">
      <DemoStructureGuide />
    </VCard>

    <div class="grid gap-4 xl:grid-cols-2">
      <VCard shadow="never">
        <div class="mb-4">
          <h2 class="text-xl font-semibold tracking-tight text-slate-900">
            {{ t('demo.guide.readOrder.title') }}
          </h2>
        </div>

        <ol class="demo-list">
          <li v-for="readOrderKey in readOrderKeys" :key="readOrderKey">
            {{ t(`demo.guide.readOrder.items.${readOrderKey}`) }}
          </li>
        </ol>
      </VCard>

      <VCard shadow="never">
        <div class="mb-4">
          <h2 class="text-xl font-semibold tracking-tight text-slate-900">
            {{ t('demo.guide.cleanup.title') }}
          </h2>
        </div>

        <ul class="demo-list">
          <li v-for="cleanupKey in cleanupKeys" :key="cleanupKey">
            {{ t(`demo.guide.cleanup.items.${cleanupKey}`) }}
          </li>
        </ul>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';

.demo-list {
  @apply grid gap-2 text-sm leading-relaxed text-slate-600;
}

.demo-list li {
  @apply rounded-lg border border-slate-200 bg-slate-50 px-3 py-2;
}
</style>
