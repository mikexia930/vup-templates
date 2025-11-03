<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

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
      <h1>{{ t('empty.title') }}</h1>
      <p>{{ t('empty.description') }}</p>
      <div class="empty-actions">
        <router-link to="/" class="back-button">
          {{ t('empty.backHome') }}
        </router-link>
        <button class="back-button secondary" @click="goBack">
          {{ t('empty.goBack') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';
.empty-page {
  @apply flex items-center justify-center min-h-full p-8;

  .empty-content {
    @apply text-center text-gray-900;

    .empty-icon {
      @apply text-6xl mb-4 opacity-60;
    }

    h1 {
      @apply text-3xl font-semibold mb-4 text-gray-900;
    }

    p {
      @apply text-lg mb-8 text-gray-600 max-w-md mx-auto;
    }

    .empty-actions {
      @apply flex gap-4 justify-center flex-wrap;

      .back-button {
        @apply px-6 py-3 rounded-lg font-medium no-underline;
        @apply transition-all duration-200 focus:outline-none focus:ring-2;

        &:not(.secondary) {
          @apply bg-blue-600 text-white hover:bg-blue-700;
          @apply focus:ring-blue-500;
        }

        &.secondary {
          @apply bg-gray-100 text-gray-700 border border-gray-300;
          @apply hover:bg-gray-200 focus:ring-gray-500;
        }
      }
    }
  }
}
</style>
