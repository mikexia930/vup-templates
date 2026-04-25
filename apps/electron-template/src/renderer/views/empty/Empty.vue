<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="empty-page">
    <div class="empty-content">
      <div class="empty-icon">📄</div>
      <h1>{{ t('common.empty.title') }}</h1>
      <p>{{ t('common.empty.description') }}</p>
      <div class="empty-actions">
        <router-link to="/" class="back-button">
          {{ t('common.empty.backHome') }}
        </router-link>
        <button class="back-button secondary" @click="goBack">
          {{ t('common.empty.goBack') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';
.empty-page {
  @apply flex min-h-full items-center justify-center p-8;

  .empty-content {
    @apply text-center text-gray-900;

    .empty-icon {
      @apply mb-4 text-6xl opacity-60;
    }

    h1 {
      @apply mb-4 text-3xl font-semibold text-gray-900;
    }

    p {
      @apply mx-auto mb-8 max-w-md text-lg text-gray-600;
    }

    .empty-actions {
      @apply flex flex-wrap justify-center gap-4;

      .back-button {
        @apply rounded-lg px-6 py-3 font-medium no-underline;
        @apply transition-all duration-200 focus:ring-2 focus:outline-none;

        &:not(.secondary) {
          @apply bg-blue-600 text-white hover:bg-blue-700;
          @apply focus:ring-blue-500;
        }

        &.secondary {
          @apply border border-gray-300 bg-gray-100 text-gray-700;
          @apply hover:bg-gray-200 focus:ring-gray-500;
        }
      }
    }
  }
}
</style>
