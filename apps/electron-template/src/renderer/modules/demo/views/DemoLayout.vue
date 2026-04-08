<script setup lang="ts">
const route = useRoute();
const { locale, t } = useI18n();

const tabs = [
  { name: 'demo-guide', to: '/demo/guide', labelKey: 'guide' },
  { name: 'demo-example', to: '/demo/example', labelKey: 'example' },
] as const;

const currentLocale = computed(() => locale.value);

function switchLanguage(language: 'en_US' | 'zh_CN') {
  locale.value = language;
}

function isActiveRoute(routeName: string) {
  return route.name === routeName;
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8">
    <div class="mx-auto flex max-w-6xl flex-col gap-4">
      <VCard shadow="never">
        <div class="grid gap-3">
          <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
            {{ t('demo.layout.title') }}
          </h1>
          <p class="text-sm leading-relaxed text-slate-600">
            {{ t('demo.layout.description') }}
          </p>
        </div>
      </VCard>

      <VCard shadow="never">
        <div
          class="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <nav aria-label="Demo pages" class="flex flex-wrap gap-2">
            <router-link v-for="tab in tabs" :key="tab.name" :to="tab.to">
              <VButton :type="isActiveRoute(tab.name) ? 'primary' : 'default'" plain>
                {{ t(`demo.layout.tabs.${tab.labelKey}`) }}
              </VButton>
            </router-link>
          </nav>

          <div class="flex gap-2">
            <VButton
              :plain="currentLocale !== 'en_US'"
              :type="currentLocale === 'en_US' ? 'primary' : 'default'"
              @click="switchLanguage('en_US')"
            >
              English
            </VButton>
            <VButton
              :plain="currentLocale !== 'zh_CN'"
              :type="currentLocale === 'zh_CN' ? 'primary' : 'default'"
              @click="switchLanguage('zh_CN')"
            >
              中文
            </VButton>
          </div>
        </div>

        <router-view />
      </VCard>
    </div>
  </div>
</template>
