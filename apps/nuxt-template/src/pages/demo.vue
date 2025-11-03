<script setup lang="ts">
// 使用 Nuxt i18n composables
const { t } = useI18n();

// 计数器状态
const count = ref(0);
const lastUpdated = ref<string | null>(null);

// 计算属性
const double = computed(() => count.value * 2);

// 计数器方法
const increment = () => {
  count.value++;
  lastUpdated.value = new Date().toLocaleTimeString();
};

const decrement = () => {
  count.value--;
  lastUpdated.value = new Date().toLocaleTimeString();
};

const reset = () => {
  count.value = 0;
  lastUpdated.value = new Date().toLocaleTimeString();
};

// 消息列表状态
const newMessage = ref('');
const messages = ref<string[]>([]);

// 添加消息
const addMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push(newMessage.value.trim());
    newMessage.value = '';
  }
};
</script>

<template>
  <div class="docs-page">
    <div class="container">
      <h1 class="page-title">{{ t('content.title') }}</h1>
      <p class="page-description">{{ t('content.description') }}</p>

      <div class="docs-content">
        <!-- Route Information -->
        <div class="section">
          <h2 class="section-title">{{ t('content.route.title') }}</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">{{ t('content.route.param') }}:</span>
              <span class="info-value">{{ $route.params.id || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ t('content.route.path') }}:</span>
              <span class="info-value">{{ $route.path }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ t('content.route.name') }}:</span>
              <span class="info-value">{{ $route.name }}</span>
            </div>
          </div>
        </div>

        <!-- Store Demo -->
        <div class="section">
          <h2 class="section-title">{{ t('content.store.title') }}</h2>
          <div class="store-demo">
            <div class="counter-display">
              <div class="counter-item">
                <span class="counter-label">{{ t('content.store.count') }}:</span>
                <span class="counter-value">{{ count }}</span>
              </div>
              <div class="counter-item">
                <span class="counter-label">{{ t('content.store.double') }}:</span>
                <span class="counter-value">{{ double }}</span>
              </div>
              <div class="counter-item">
                <span class="counter-label">{{ t('content.store.lastUpdated') }}:</span>
                <span class="counter-value">{{ lastUpdated || t('content.store.never') }}</span>
              </div>
            </div>
            <div class="counter-actions">
              <button class="btn btn-primary" @click="increment">
                {{ t('content.store.increment') }}
              </button>
              <button class="btn btn-secondary" @click="decrement">
                {{ t('content.store.decrement') }}
              </button>
              <button class="btn btn-danger" @click="reset">
                {{ t('content.store.reset') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Reactivity Demo -->
        <div class="section">
          <h2 class="section-title">{{ t('content.reactivity.title') }}</h2>
          <p class="section-description">{{ t('content.reactivity.description') }}</p>
          <div class="reactivity-demo">
            <div class="input-group">
              <input
                v-model="newMessage"
                :placeholder="t('content.reactivity.placeholder')"
                class="message-input"
                @keyup.enter="addMessage"
              />
              <button class="btn btn-primary" @click="addMessage">
                {{ t('content.reactivity.add') }}
              </button>
            </div>
            <div class="message-list">
              <div v-for="(message, index) in messages" :key="index" class="message-item">
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';
.docs-page {
  min-height: 100vh;
  background: #ffffff;
  color: #1a1a1a;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    sans-serif;
  line-height: 1.6;
}

.container {
  @apply max-w-4xl mx-auto px-4 py-8;
}

.page-title {
  @apply text-4xl font-bold text-center text-slate-800 mb-4;
}

.page-description {
  @apply text-xl text-slate-600 text-center mb-12;
}

.docs-content {
  @apply space-y-12;
}

.section {
  @apply bg-white rounded-xl border border-slate-200 p-8 shadow-sm;
}

.section-title {
  @apply text-2xl font-bold text-slate-800 mb-6;
}

.section-description {
  @apply text-slate-600 mb-6;
}

.info-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.info-item {
  @apply flex flex-col space-y-2;
}

.info-label {
  @apply text-sm font-medium text-slate-500;
}

.info-value {
  @apply text-lg font-mono text-slate-800 bg-slate-100 px-3 py-2 rounded;
}

.store-demo {
  @apply space-y-6;
}

.counter-display {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.counter-item {
  @apply flex flex-col space-y-2;
}

.counter-label {
  @apply text-sm font-medium text-slate-500;
}

.counter-value {
  @apply text-2xl font-bold text-slate-800 bg-slate-100 px-4 py-3 rounded text-center;
}

.counter-actions {
  @apply flex flex-wrap gap-3 justify-center;
}

.reactivity-demo {
  @apply space-y-4;
}

.input-group {
  @apply flex gap-3;
}

.message-input {
  @apply flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.message-list {
  @apply space-y-2 max-h-64 overflow-y-auto;
}

.message-item {
  @apply bg-slate-100 px-4 py-2 rounded-lg text-slate-800;
}

.btn {
  @apply px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg;
}

.btn-secondary {
  @apply bg-slate-600 text-white hover:bg-slate-700 hover:shadow-lg;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700 hover:shadow-lg;
}
</style>
