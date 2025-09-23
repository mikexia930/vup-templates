<template>
  <div class="popup-container">
    <!-- 成功消息 -->
    <div class="success-section">
      <div class="success-visual">
        <img src="/wxt.svg" alt="WXT Logo" class="wxt-logo" />
        <img src="@_shared/assets/images/vup.svg" alt="VUP Logo" class="vup-logo" />
        <div class="speed-badge">×1.5</div>
      </div>
      <div class="success-text">
        <div class="speed-title">
          <span class="speed-left">VUP</span>
          <span class="speed-arrow"> -> </span>
          <span class="speed-right">1.5x</span>
        </div>
        <p class="success-description">跳过复杂配置，专注于浏览器扩展开发。</p>
      </div>
    </div>

    <!-- 功能按钮 -->
    <div class="action-buttons">
      <button @click="openNewTab" class="action-btn primary">打开新标签页</button>
      <button @click="openOptions" class="action-btn secondary">扩展设置</button>
    </div>

    <!-- 快速功能 -->
    <div class="quick-actions">
      <h3>快速功能</h3>
      <div class="quick-buttons">
        <button @click="toggleFeature" class="quick-btn">
          {{ isFeatureEnabled ? '禁用' : '启用' }} 功能
        </button>
        <button @click="showInfo" class="quick-btn">查看信息</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const isFeatureEnabled = ref(false);

// 打开新标签页
const openNewTab = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('/newtab.html') });
};

// 打开扩展设置页面
const openOptions = () => {
  chrome.runtime.openOptionsPage?.();
};

// 切换功能
const toggleFeature = () => {
  isFeatureEnabled.value = !isFeatureEnabled.value;
  chrome.storage.sync.set({ featureEnabled: isFeatureEnabled.value });
};

// 显示信息
const showInfo = () => {
  alert('VUP 1.5x 扩展 - 基于 WXT + Vue 3 开发');
};

// 加载设置
const loadSettings = () => {
  chrome.storage.sync.get(['featureEnabled'], (result) => {
    isFeatureEnabled.value = result.featureEnabled || false;
  });
};

onMounted(() => {
  loadSettings();
});
</script>

<style scoped>
.popup-container {
  width: 400px;
  min-height: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding: 20px;
}

.success-section {
  text-align: center;
  margin-bottom: 30px;
}

.success-visual {
  @apply flex items-center justify-center space-x-4 mb-6;
  @apply relative;
}

.wxt-logo,
.vup-logo {
  @apply w-12 h-12;
  @apply drop-shadow-lg;
  @apply transition-transform duration-300 hover:scale-110;
}

.speed-badge {
  @apply absolute -top-2 -right-2;
  @apply bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full;
  @apply w-8 h-8 flex items-center justify-center;
  @apply text-xs font-bold;
  @apply shadow-md;
}

.speed-title {
  @apply text-3xl font-extrabold mb-4;
  @apply flex items-center justify-center;
}

.speed-left {
  @apply text-blue-300;
}

.speed-arrow {
  @apply text-white mx-2;
}

.speed-right {
  @apply text-emerald-300;
}

.success-description {
  @apply text-sm text-blue-100;
}

.action-buttons {
  @apply flex flex-col space-y-3 mb-6;
}

.action-btn {
  @apply px-6 py-3 rounded-full text-sm font-semibold;
  @apply transition-all duration-300;
  @apply shadow-md;
}

.action-btn.primary {
  @apply bg-white text-blue-600 hover:bg-blue-50;
}

.action-btn.secondary {
  @apply bg-emerald-500 text-white hover:bg-emerald-600;
}

.quick-actions {
  @apply bg-white bg-opacity-20 rounded-xl p-4;
  @apply backdrop-blur-sm;
}

.quick-actions h3 {
  @apply text-sm font-semibold mb-3 text-center;
}

.quick-buttons {
  @apply flex flex-col space-y-2;
}

.quick-btn {
  @apply px-4 py-2 rounded-lg text-xs font-medium;
  @apply bg-white bg-opacity-30 text-white;
  @apply transition-all duration-300 hover:bg-opacity-40;
}
</style>
