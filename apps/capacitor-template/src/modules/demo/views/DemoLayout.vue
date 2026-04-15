<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();

const tabs = [
  { name: 'demo-guide', to: '/demo/guide', labelKey: 'guide' },
  { name: 'demo-example', to: '/demo/example', labelKey: 'example' },
] as const;

const activeTab = computed(() => (route.name === 'demo-example' ? 'demo-example' : 'demo-guide'));

function switchLanguage(language: 'en_US' | 'zh_CN') {
  locale.value = language;
}

function handleTabChange(value: string | number) {
  const target = tabs.find((tab) => tab.name === value);
  if (target && target.to !== route.path) router.push(target.to);
}
</script>

<template>
  <VMPage class="demo-mobile-layout">
    <VMHeader translucent class="ion-no-border demo-mobile-layout__header">
      <VMToolbar class="demo-mobile-layout__toolbar">
        <VMTitle>{{ t('demo.layout.title') }}</VMTitle>
      </VMToolbar>
    </VMHeader>

    <VMContent fullscreen class="demo-mobile-layout__content">
      <div class="demo-mobile-layout__container">
        <section class="demo-mobile-layout__intro-section">
          <div class="demo-mobile-layout__locale-actions">
            <VMButton
              :fill="locale === 'en_US' ? 'solid' : 'outline'"
              size="small"
              @click="switchLanguage('en_US')"
            >
              EN
            </VMButton>
            <VMButton
              :fill="locale === 'zh_CN' ? 'solid' : 'outline'"
              size="small"
              @click="switchLanguage('zh_CN')"
            >
              中文
            </VMButton>
          </div>

          <VMCard class="demo-mobile-layout__intro" mode="ios">
            <VMCardContent class="demo-mobile-layout__intro-content">
              <p class="text-sm text-slate-600">{{ t('demo.layout.subtitle') }}</p>
            </VMCardContent>
          </VMCard>
        </section>

        <section class="demo-mobile-layout__content-section">
          <VMSegment :model-value="activeTab" @update:model-value="handleTabChange">
            <VMSegmentButton v-for="tab in tabs" :key="tab.name" :value="tab.name">
              <VMLabel>{{ t(`demo.layout.tabs.${tab.labelKey}`) }}</VMLabel>
            </VMSegmentButton>
          </VMSegment>

          <div class="demo-mobile-layout__router-view">
            <router-view />
          </div>
        </section>
      </div>
    </VMContent>
  </VMPage>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';

.demo-mobile-layout__toolbar {
  @apply pt-1;
  padding-top: calc(var(--ion-safe-area-top, 0px) * 0.25);
}

.demo-mobile-layout__header {
  backdrop-filter: saturate(150%) blur(12px);
}

.demo-mobile-layout__locale-actions {
  @apply flex items-center gap-2;
}

.demo-mobile-layout__content {
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: calc(var(--ion-safe-area-bottom, 0px) + 12px);
}

.demo-mobile-layout__container {
  @apply mx-auto grid max-w-3xl gap-3;
}

.demo-mobile-layout__intro-section {
  @apply grid gap-3;
}

.demo-mobile-layout__content-section {
  @apply grid gap-3;
}

.demo-mobile-layout__router-view {
  @apply grid gap-3;
}

.demo-mobile-layout__intro {
  @apply rounded-2xl;
  border-radius: var(--vm-card-radius);
}

.demo-mobile-layout__intro-content {
  @apply py-3;
}
</style>
