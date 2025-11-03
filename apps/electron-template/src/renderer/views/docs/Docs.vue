<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <h1 class="text-3xl underline">Hello world!</h1>
  <div class="quick-start-section">
    <div class="quick-start-container">
      <h2 class="section-title">
        {{ t('quickstart.title') }}
      </h2>
      <div class="commands-grid">
        <div class="command-item">
          <div class="command-icon">🚀</div>
          <div class="command-content">
            <h3>{{ t('quickstart.dev.title') }}</h3>
            <p>{{ t('quickstart.dev.description') }}</p>
            <code class="command-code">pnpm dev</code>
          </div>
        </div>
        <div class="command-item">
          <div class="command-icon">📦</div>
          <div class="command-content">
            <h3>{{ t('quickstart.build.title') }}</h3>
            <p>{{ t('quickstart.build.description') }}</p>
            <code class="command-code">pnpm build</code>
          </div>
        </div>
        <div class="command-item">
          <div class="command-icon">🔨</div>
          <div class="command-content">
            <h3>{{ t('quickstart.make.title') }}</h3>
            <p>{{ t('quickstart.make.description') }}</p>
            <code class="command-code">pnpm make</code>
          </div>
        </div>
        <div class="command-item">
          <div class="command-icon">🔍</div>
          <div class="command-content">
            <h3>{{ t('quickstart.lint.title') }}</h3>
            <p>{{ t('quickstart.lint.description') }}</p>
            <code class="command-code">pnpm lint</code>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tech Stack -->
  <div class="tech-stack-section">
    <div class="tech-stack-container">
      <h2 class="section-title">
        {{ t('techstack.title') }}
      </h2>
      <p class="section-description">
        {{ t('techstack.description') }}
      </p>
      <div class="tech-grid">
        <div class="tech-item">
          <div class="tech-icon">⚡</div>
          <div class="tech-content">
            <h3>Electron</h3>
            <p>{{ t('techstack.electron.description') }}</p>
            <a href="https://www.electronjs.org" target="_blank" class="tech-link">{{
              t('techstack.electron.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">💚</div>
          <div class="tech-content">
            <h3>Vue 3</h3>
            <p>{{ t('techstack.vue.description') }}</p>
            <a href="https://vuejs.org" target="_blank" class="tech-link">{{
              t('techstack.vue.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🔷</div>
          <div class="tech-content">
            <h3>TypeScript</h3>
            <p>{{ t('techstack.typescript.description') }}</p>
            <a href="https://www.typescriptlang.org" target="_blank" class="tech-link">{{
              t('techstack.typescript.link')
            }}</a>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">⚡</div>
          <div class="tech-content">
            <h3>Vite</h3>
            <p>{{ t('techstack.vite.description') }}</p>
            <a href="https://vitejs.dev" target="_blank" class="tech-link">{{
              t('techstack.vite.link')
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@reference 'tailwindcss';
.quick-start-section {
  @apply py-16 px-4;
  @apply bg-white;

  .quick-start-container {
    @apply max-w-6xl mx-auto;

    .section-title {
      @apply text-3xl font-bold text-slate-900 text-center mb-12;
    }

    .commands-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8;

      .command-item {
        @apply flex flex-col items-center text-center p-8;
        @apply bg-slate-50 rounded-2xl border border-slate-200;
        @apply transition-all duration-300 hover:shadow-lg hover:scale-105;
        @apply h-full;

        .command-icon {
          @apply text-4xl mb-4;
        }

        .command-content {
          @apply flex flex-col justify-between h-full;

          h3 {
            @apply text-xl font-semibold text-slate-900 mb-3;
          }

          p {
            @apply text-slate-600 mb-4 flex-grow;
          }

          .command-code {
            @apply bg-slate-900 text-green-400 px-4 py-2 rounded-lg;
            @apply font-mono text-sm;
            @apply select-all;
            @apply mt-auto;
          }
        }
      }
    }
  }
}

// Tech Stack Section
.tech-stack-section {
  @apply py-16 px-4;
  @apply bg-gradient-to-br from-slate-50 to-blue-50;

  .tech-stack-container {
    @apply max-w-6xl mx-auto;

    .section-title {
      @apply text-3xl font-bold text-slate-900 text-center mb-4;
    }

    .section-description {
      @apply text-lg text-slate-600 text-center mb-12;
    }

    .tech-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;

      .tech-item {
        @apply flex items-start space-x-4 p-6;
        @apply bg-white rounded-xl border border-slate-200;
        @apply transition-all duration-300 hover:shadow-lg hover:scale-105;
        @apply h-full;

        .tech-icon {
          @apply text-3xl flex-shrink-0;
        }

        .tech-content {
          @apply flex-1 flex flex-col justify-between;

          h3 {
            @apply text-lg font-semibold text-slate-900 mb-2;
          }

          p {
            @apply text-slate-600 text-sm mb-3 flex-grow;
          }

          .tech-link {
            @apply text-blue-600 hover:text-blue-800 font-medium;
            @apply transition-colors duration-200;
            @apply text-sm;
            @apply mt-auto;
          }
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .commands-grid {
    @apply grid-cols-1;
  }

  .tech-grid {
    @apply grid-cols-1;
  }
}
</style>
