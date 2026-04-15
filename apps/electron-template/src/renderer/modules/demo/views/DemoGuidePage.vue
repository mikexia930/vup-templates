<script setup lang="ts">
const { t } = useI18n();

const commands = [
  { key: 'dev', value: 'pnpm dev' },
  { key: 'build', value: 'pnpm build' },
  { key: 'make', value: 'pnpm make' },
  { key: 'lint', value: 'pnpm lint' },
] as const;

const firstEditItems = [
  { descriptionKey: 'main', path: 'src/renderer/main.ts' },
  { descriptionKey: 'router', path: 'src/renderer/router/routes.ts' },
  { descriptionKey: 'module', path: 'src/renderer/modules/demo/' },
  { descriptionKey: 'locales', path: 'src/renderer/locales/' },
  { descriptionKey: 'request', path: 'src/renderer/api/request.ts' },
] as const;

const readOrderKeys = ['step1', 'step2', 'step3', 'step4', 'step5'] as const;
</script>

<template>
  <div class="grid gap-4">
    <VCard shadow="never">
      <div class="mb-4">
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.guide.quickStart.title') }}
        </h2>
      </div>

      <ul class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <li
          v-for="item in commands"
          :key="item.key"
          class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
        >
          <p class="text-sm text-slate-600">
            {{ t(`demo.guide.quickStart.items.${item.key}.description`) }}
          </p>
          <code
            class="mt-2 block rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-green-400"
          >
            {{ item.value }}
          </code>
        </li>
      </ul>
    </VCard>

    <VCard shadow="never">
      <div class="mb-4">
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.guide.firstEdit.title') }}
        </h2>
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
