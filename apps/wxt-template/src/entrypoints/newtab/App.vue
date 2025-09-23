<template>
  <div class="newtab-container">
    <!-- 成功消息 -->
    <div class="success-section">
      <div class="success-content">
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
          <div class="action-buttons">
            <button @click="openPopup" class="action-btn primary">打开扩展</button>
            <button @click="openOptions" class="action-btn secondary">扩展设置</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能展示 -->
    <div class="features-section">
      <h2 class="section-title">扩展功能</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>快速开发</h3>
          <p>基于 WXT 框架，快速构建浏览器扩展</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>热重载</h3>
          <p>开发时支持热重载，提升开发效率</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>现代 UI</h3>
          <p>基于 Vue 3 + Tailwind CSS 的现代界面</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔧</div>
          <h3>类型安全</h3>
          <p>完整的 TypeScript 类型支持</p>
        </div>
      </div>
    </div>

    <!-- 技术栈展示 -->
    <div class="tech-stack-section">
      <h2 class="section-title">技术栈</h2>
      <div class="tech-grid">
        <div class="tech-item">
          <div class="tech-icon">🔧</div>
          <div class="tech-content">
            <h3>WXT</h3>
            <p>现代化的浏览器扩展开发框架</p>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">⚡</div>
          <div class="tech-content">
            <h3>Vue 3</h3>
            <p>渐进式 JavaScript 框架</p>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🎯</div>
          <div class="tech-content">
            <h3>TypeScript</h3>
            <p>JavaScript 的超集，提供类型安全</p>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🎨</div>
          <div class="tech-content">
            <h3>Tailwind CSS</h3>
            <p>实用优先的 CSS 框架</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 打开扩展弹窗
const openPopup = () => {
  chrome.action.openPopup?.();
};

// 打开扩展设置页面
const openOptions = () => {
  chrome.runtime.openOptionsPage?.();
};
</script>

<style scoped>
.newtab-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    sans-serif;
}

/* 成功区域 */
.success-section {
  @apply py-20 px-4;
}

.success-content {
  @apply max-w-4xl mx-auto text-center;
}

.success-visual {
  @apply flex items-center justify-center space-x-6 mb-12;
  @apply relative;
}

.wxt-logo,
.vup-logo {
  @apply w-16 h-16;
  @apply drop-shadow-lg;
  @apply transition-transform duration-300 hover:scale-110;
}

.speed-badge {
  @apply absolute -top-3 -right-3;
  @apply bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full;
  @apply w-10 h-10 flex items-center justify-center;
  @apply text-sm font-bold;
  @apply shadow-md;
}

.speed-title {
  @apply text-6xl font-extrabold mb-6;
  @apply flex items-center justify-center;
}

.speed-left {
  @apply text-blue-300;
}

.speed-arrow {
  @apply text-white mx-4;
}

.speed-right {
  @apply text-emerald-300;
}

.success-description {
  @apply text-xl text-blue-100 mb-8;
}

.action-buttons {
  @apply flex justify-center space-x-4;
}

.action-btn {
  @apply px-8 py-3 rounded-full text-lg font-semibold;
  @apply transition-all duration-300;
  @apply shadow-md;
}

.action-btn.primary {
  @apply bg-white text-blue-600 hover:bg-blue-50;
}

.action-btn.secondary {
  @apply bg-emerald-500 text-white hover:bg-emerald-600;
}

/* 功能展示区域 */
.features-section {
  @apply py-16 px-4 bg-white bg-opacity-10;
}

.section-title {
  @apply text-3xl font-bold text-center mb-12;
}

.features-grid {
  @apply max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.feature-card {
  @apply bg-white bg-opacity-20 rounded-2xl p-6 text-center;
  @apply backdrop-blur-sm;
  @apply transition-transform duration-300 hover:scale-105;
}

.feature-icon {
  @apply text-4xl mb-4;
}

.feature-card h3 {
  @apply text-xl font-semibold mb-3;
}

.feature-card p {
  @apply text-blue-100;
}

/* 技术栈区域 */
.tech-stack-section {
  @apply py-16 px-4;
}

.tech-grid {
  @apply max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.tech-item {
  @apply flex items-start space-x-4 p-6 bg-white bg-opacity-20 rounded-xl;
  @apply backdrop-blur-sm;
  @apply transition-transform duration-300 hover:scale-105;
}

.tech-icon {
  @apply text-3xl flex-shrink-0;
}

.tech-content h3 {
  @apply text-lg font-semibold mb-2;
}

.tech-content p {
  @apply text-blue-100 text-sm;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .speed-title {
    @apply text-4xl;
  }

  .success-description {
    @apply text-lg;
  }

  .action-buttons {
    @apply flex-col space-x-0 space-y-4;
  }

  .success-visual {
    @apply space-x-2;
  }

  .wxt-logo,
  .vup-logo {
    @apply w-12 h-12;
  }
}
</style>
