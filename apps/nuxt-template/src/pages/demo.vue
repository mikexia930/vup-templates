<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();

const tabs = [
  {
    name: 'demo-guide___en-US',
    fallbackName: 'demo-guide___zh-CN',
    to: '/demo/guide',
    labelKey: 'guide',
  },
  {
    name: 'demo-example___en-US',
    fallbackName: 'demo-example___zh-CN',
    to: '/demo/example',
    labelKey: 'example',
  },
] as const;

function switchLanguage(language: 'en-US' | 'zh-CN') {
  const { $i18n } = useNuxtApp();
  $i18n.setLocale(language);
}

function isActiveTab(tab: (typeof tabs)[number]) {
  return route.name === tab.name || route.name === tab.fallbackName;
}

function goTab(tabPath: string) {
  router.push(tabPath);
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8">
    <div class="mx-auto flex max-w-6xl flex-col gap-4">
      <ElCard shadow="never">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.layout.title') }}
        </h1>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          {{ t('demo.layout.description') }}
        </p>
      </ElCard>

      <ElCard shadow="never">
        <div
          class="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex flex-wrap gap-2">
            <ElButton
              v-for="tab in tabs"
              :key="tab.to"
              :type="isActiveTab(tab) ? 'primary' : 'default'"
              plain
              @click="goTab(tab.to)"
            >
              {{ t(`demo.layout.tabs.${tab.labelKey}`) }}
            </ElButton>
          </div>

          <div class="flex gap-2">
            <ElButton
              :plain="locale !== 'en-US'"
              :type="locale === 'en-US' ? 'primary' : 'default'"
              @click="switchLanguage('en-US')"
            >
              English
            </ElButton>
            <ElButton
              :plain="locale !== 'zh-CN'"
              :type="locale === 'zh-CN' ? 'primary' : 'default'"
              @click="switchLanguage('zh-CN')"
            >
              中文
            </ElButton>
          </div>
        </div>

        <NuxtPage />
      </ElCard>
    </div>
  </div>
</template>
