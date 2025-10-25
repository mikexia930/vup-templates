<script setup lang="ts">
import { storeDemo } from './stores/demo';

const { t } = useI18n();
const demoStore = storeDemo();

// 响应式数据演示
const localMessage = ref('');
const messages = ref<string[]>([]);

const addMessage = () => {
  if (localMessage.value.trim()) {
    messages.value.push(localMessage.value.trim());
    localMessage.value = '';
  }
};
</script>

<template>
  <div class="demo-page">
    <!-- Demo Header -->
    <div class="demo-header">
      <h2 class="demo-title">{{ t('demo.title') }}</h2>
      <p class="demo-description">{{ t('demo.description') }}</p>
    </div>

    <!-- Demo Sections -->
    <div class="demo-sections">
      <!-- Pinia 状态管理演示 -->
      <div class="demo-card">
        <div class="card-header">
          <div class="card-icon">🏪</div>
          <h3 class="card-title">{{ t('content.pinia.title') }}</h3>
        </div>
        <div class="card-content">
          <div class="counter-display">
            <div class="counter-item">
              <span class="label">{{ t('content.pinia.count') }}:</span>
              <span class="value">{{ demoStore.count }}</span>
            </div>
            <div class="counter-item">
              <span class="label">{{ t('content.pinia.double') }}:</span>
              <span class="value">{{ demoStore.doubleCount }}</span>
            </div>
            <div class="counter-item">
              <span class="label">{{ t('content.pinia.lastUpdated') }}:</span>
              <span class="value">{{ demoStore.lastUpdated || t('content.pinia.never') }}</span>
            </div>
          </div>

          <div class="counter-actions">
            <button class="demo-btn primary" @click="demoStore.increment">
              {{ t('content.pinia.increment') }}
            </button>
            <button class="demo-btn secondary" @click="demoStore.decrement">
              {{ t('content.pinia.decrement') }}
            </button>
            <button class="demo-btn danger" @click="demoStore.reset">
              {{ t('content.pinia.reset') }}
            </button>
          </div>
        </div>
      </div>

      <!-- 响应式数据演示 -->
      <div class="demo-card">
        <div class="card-header">
          <div class="card-icon">⚡</div>
          <h3 class="card-title">{{ t('content.reactivity.title') }}</h3>
        </div>
        <div class="card-content">
          <p class="demo-description">{{ t('content.reactivity.description') }}</p>
          <div class="input-group">
            <input
              v-model="localMessage"
              :placeholder="t('content.reactivity.placeholder')"
              class="message-input"
            />
            <button class="demo-btn primary" @click="addMessage">
              {{ t('content.reactivity.add') }}
            </button>
          </div>
          <div class="messages-list">
            <div v-for="(message, index) in messages" :key="index" class="message-item">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-page {
  @apply py-16 px-4;
  @apply bg-gradient-to-br from-slate-50 to-blue-50;
  min-height: calc(100vh - 60px);

  .demo-header {
    @apply text-center mb-12 max-w-6xl mx-auto;

    .demo-title {
      @apply text-3xl font-bold text-slate-900 mb-4;
    }

    .demo-description {
      @apply text-lg text-slate-600;
    }
  }

  .demo-sections {
    @apply max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8;
  }

  .demo-card {
    @apply bg-white rounded-2xl shadow-lg border border-slate-200;
    @apply transition-all duration-300 hover:shadow-xl hover:scale-105;
    @apply overflow-hidden;

    .card-header {
      @apply flex items-center space-x-4 p-6 border-b border-slate-200;
      @apply bg-gradient-to-r from-slate-50 to-blue-50;

      .card-icon {
        @apply text-3xl;
      }

      .card-title {
        @apply text-xl font-semibold text-slate-900;
      }
    }

    .card-content {
      @apply p-6;

      .demo-description {
        @apply text-slate-600 mb-4;
      }
    }
  }

  .counter-display {
    @apply mb-6;

    .counter-item {
      @apply flex justify-between items-center py-3 border-b border-slate-200 last:border-b-0;

      .label {
        @apply font-medium text-slate-700;
      }

      .value {
        @apply font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm;
      }
    }
  }

  .counter-actions {
    @apply flex gap-3 justify-center flex-wrap;
  }

  .input-group {
    @apply flex gap-3 mb-6;

    .message-input {
      @apply flex-1 px-4 py-3 border border-slate-300 rounded-lg;
      @apply bg-white text-slate-900 placeholder-slate-500;
      @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
      @apply transition-all duration-200;
    }
  }

  .messages-list {
    @apply max-h-48 overflow-y-auto space-y-3;

    .message-item {
      @apply bg-gradient-to-r from-blue-50 to-indigo-50;
      @apply border border-blue-200 rounded-lg p-4 text-blue-800;
      @apply transition-all duration-200 hover:shadow-md;
    }
  }

  .demo-btn {
    @apply px-5 py-2 rounded-lg font-medium cursor-pointer;
    @apply transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;

    &.primary {
      @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
    }

    &.secondary {
      @apply bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500;
    }

    &.danger {
      @apply bg-red-500 text-white hover:bg-red-600 focus:ring-red-500;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .demo-sections {
    @apply grid-cols-1;
  }

  .demo-page {
    @apply py-8;
  }
}
</style>
