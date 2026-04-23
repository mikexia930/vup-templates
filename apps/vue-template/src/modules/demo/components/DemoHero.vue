<script setup lang="ts">
const { t } = useI18n();

const featureKeys = ['guide', 'module', 'request'] as const;
const scenarioKeys = ['admin', 'module', 'optional'] as const;
</script>

<template>
  <VCard shadow="never">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-center">
      <div class="flex items-center gap-3">
        <img
          src="@/assets/images/vue.svg"
          alt="Vue Logo"
          class="h-14 w-14 rounded-xl border border-slate-200 bg-slate-50 p-2"
        />
        <img
          src="@_shared/assets/images/vup.svg"
          alt="VUP Logo"
          class="h-14 w-14 rounded-xl border border-slate-200 bg-slate-50 p-2"
        />
      </div>

      <div class="flex-1">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.layout.badge') }}
        </h1>
        <p class="mt-2 leading-7 text-slate-600">{{ t('demo.layout.description') }}</p>

        <div class="mt-3 flex flex-wrap gap-4">
          <VTag v-for="featureKey in featureKeys" :key="featureKey" effect="plain" type="info">
            {{ t(`demo.layout.features.${featureKey}`) }}
          </VTag>
        </div>

        <ul class="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          <li
            v-for="scenarioKey in scenarioKeys"
            :key="scenarioKey"
            class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
          >
            {{ t(`demo.layout.scenarios.${scenarioKey}`) }}
          </li>
        </ul>
      </div>
    </div>
  </VCard>
</template>
