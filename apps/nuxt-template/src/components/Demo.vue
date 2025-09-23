<template>
  <div class="demo-container">
    <!-- Quick Start Section -->
    <div class="section-spacing">
      <h2 class="section-title">
        {{ t('quickstart.title') }}
      </h2>
      <div class="grid-layout">
        <div class="card-item">
          <div class="card-icon">🚀</div>
          <h3 class="card-title">{{ t('quickstart.dev.title') }}</h3>
          <p class="card-description">{{ t('quickstart.dev.description') }}</p>
          <code class="code-block">pnpm dev</code>
        </div>
        <div class="card-item">
          <div class="card-icon">🏗️</div>
          <h3 class="card-title">{{ t('quickstart.build.title') }}</h3>
          <p class="card-description">{{ t('quickstart.build.description') }}</p>
          <code class="code-block">pnpm build</code>
        </div>
        <div class="card-item">
          <div class="card-icon">🔍</div>
          <h3 class="card-title">{{ t('quickstart.lint.title') }}</h3>
          <p class="card-description">{{ t('quickstart.lint.description') }}</p>
          <code class="code-block">pnpm lint</code>
        </div>
        <div class="card-item">
          <div class="card-icon">✨</div>
          <h3 class="card-title">{{ t('quickstart.format.title') }}</h3>
          <p class="card-description">{{ t('quickstart.format.description') }}</p>
          <code class="code-block">pnpm format</code>
        </div>
      </div>
    </div>

    <!-- Tech Stack Section -->
    <div class="section-spacing">
      <h2 class="section-title">{{ t('techstack.title') }}</h2>
      <p class="section-description">
        {{ t('techstack.description') }}
      </p>
      <div class="tech-grid">
        <div class="tech-item">
          <div class="tech-icon">⚡</div>
          <div class="tech-content">
            <h3 class="tech-name">Nuxt 3</h3>
            <p class="tech-desc">{{ t('techstack.nuxt.description') }}</p>
            <a href="https://nuxt.com" target="_blank" class="tech-link">{{
              t('techstack.nuxt.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🟢</div>
          <div class="tech-content">
            <h3 class="tech-name">Vue 3</h3>
            <p class="tech-desc">{{ t('techstack.vue.description') }}</p>
            <a href="https://vuejs.org" target="_blank" class="tech-link">{{
              t('techstack.vue.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🔧</div>
          <div class="tech-content">
            <h3 class="tech-name">TypeScript</h3>
            <p class="tech-desc">{{ t('techstack.typescript.description') }}</p>
            <a href="https://www.typescriptlang.org" target="_blank" class="tech-link">{{
              t('techstack.typescript.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">⚡</div>
          <div class="tech-content">
            <h3 class="tech-name">Nitro</h3>
            <p class="tech-desc">{{ t('techstack.nitro.description') }}</p>
            <a href="https://nitro.unjs.io" target="_blank" class="tech-link">{{
              t('techstack.nitro.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">📦</div>
          <div class="tech-content">
            <h3 class="tech-name">pnpm</h3>
            <p class="tech-desc">{{ t('techstack.pnpm.description') }}</p>
            <a href="https://pnpm.io" target="_blank" class="tech-link">{{
              t('techstack.pnpm.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🔍</div>
          <div class="tech-content">
            <h3 class="tech-name">ESLint</h3>
            <p class="tech-desc">{{ t('techstack.eslint.description') }}</p>
            <a href="https://eslint.org" target="_blank" class="tech-link">{{
              t('techstack.eslint.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">✨</div>
          <div class="tech-content">
            <h3 class="tech-name">Prettier</h3>
            <p class="tech-desc">{{ t('techstack.prettier.description') }}</p>
            <a href="https://prettier.io" target="_blank" class="tech-link">{{
              t('techstack.prettier.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🎨</div>
          <div class="tech-content">
            <h3 class="tech-name">SCSS</h3>
            <p class="tech-desc">{{ t('techstack.scss.description') }}</p>
            <a href="https://sass-lang.com" target="_blank" class="tech-link">{{
              t('techstack.scss.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🎯</div>
          <div class="tech-content">
            <h3 class="tech-name">Tailwind CSS</h3>
            <p class="tech-desc">{{ t('techstack.tailwind.description') }}</p>
            <a href="https://tailwindcss.com" target="_blank" class="tech-link">{{
              t('techstack.tailwind.link')
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用 Nuxt i18n composables
const { t } = useI18n();
</script>

<style lang="scss">
/* 主容器 */
.demo-container {
  @apply max-w-6xl mx-auto p-8;
}

/* 章节间距 */
.section-spacing {
  @apply mb-16;
}

/* 章节标题 */
.section-title {
  @apply text-3xl font-bold text-center text-slate-800;
}

/* 章节描述 */
.section-description {
  @apply text-lg text-slate-600 text-center mb-12;
}

/* 网格布局 */
.grid-layout {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

/* 卡片项目 */
.card-item {
  @apply flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300;
}

/* 卡片图标 */
.card-icon {
  @apply text-4xl mb-4;
}

/* 卡片标题 */
.card-title {
  @apply text-xl font-semibold text-slate-900 mb-3;
}

/* 卡片描述 */
.card-description {
  @apply text-slate-600 mb-4;
}

/* 代码块 */
.code-block {
  @apply bg-slate-900 text-green-400 px-4 py-2 rounded-lg font-mono text-sm select-all;
}

/* 技术栈网格 */
.tech-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

/* 技术栈项目 */
.tech-item {
  @apply flex items-start space-x-4 p-6 bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300;
}

/* 技术栈图标 */
.tech-icon {
  @apply text-3xl flex-shrink-0;
}

/* 技术栈内容 */
.tech-content {
  @apply flex-1;
}

/* 技术栈名称 */
.tech-name {
  @apply text-lg font-semibold text-slate-900 mb-2 pt-0 mt-0;
}

/* 技术栈描述 */
.tech-desc {
  @apply text-slate-600 text-sm mb-3;
}

/* 技术栈链接 */
.tech-link {
  @apply text-blue-600 hover:text-blue-800 font-medium text-sm;
}
</style>
