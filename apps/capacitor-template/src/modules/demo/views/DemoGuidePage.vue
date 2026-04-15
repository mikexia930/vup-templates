<script setup lang="ts">
const { t } = useI18n();

const quickStartKeys = ['dev', 'ios', 'android', 'sync'] as const;
</script>

<template>
  <div class="demo-guide-page">
    <VMCard class="demo-guide-page__card" mode="ios">
      <VMCardHeader>
        <VMCardTitle>{{ t('demo.guide.title') }}</VMCardTitle>
        <VMCardSubtitle>{{ t('demo.guide.intro') }}</VMCardSubtitle>
      </VMCardHeader>
      <VMCardContent>
        <VMList inset lines="full">
          <VMItem v-for="key in quickStartKeys" :key="key" button detail="false" mode="ios">
            <VMLabel>
              <h3 class="font-medium">{{ t(`demo.guide.quickStart.items.${key}`) }}</h3>
            </VMLabel>
          </VMItem>
        </VMList>
      </VMCardContent>
    </VMCard>

    <VMCard class="demo-guide-page__card" mode="ios">
      <VMCardHeader>
        <VMCardTitle>{{ t('demo.guide.structure.title') }}</VMCardTitle>
      </VMCardHeader>
      <VMCardContent>
        <pre
          class="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs leading-relaxed text-slate-100"
          >{{ t('demo.guide.structure.tree') }}</pre
        >
      </VMCardContent>
    </VMCard>
  </div>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';

.demo-guide-page {
  @apply grid gap-3;
}

.demo-guide-page__card {
  @apply rounded-2xl;
  border-radius: var(--vm-card-radius);
}

.demo-guide-page__card :deep(ion-card-header) {
  padding: 14px 16px 8px;
}

.demo-guide-page__card :deep(ion-card-content) {
  padding: 8px 12px 14px;
}

.demo-guide-page__card :deep(ion-list) {
  margin: 0;
  padding: 0;
}
</style>
