<script setup lang="ts">
// 使用 Nuxt i18n composables
const { t, locale } = useI18n();

// 语言切换函数
const switchLanguage = (lang: 'zh-CN' | 'en-US') => {
  // 使用 $i18n.setLocale 方法
  const { $i18n } = useNuxtApp();
  $i18n.setLocale(lang);
};
</script>

<template>
  <div class="nuxt-demo-container">
    <Head>
      <title>{{ t('page.title') }}</title>
      <meta name="description" :content="t('page.description')" />
    </Head>
    <!-- Success Message -->
    <div class="success-section">
      <div class="success-content">
        <div class="success-visual">
          <img src="/assets/images/nuxt.svg" alt="Nuxt Logo" class="nuxt-logo" />
          <img src="@_shared/assets/images/vup.svg" alt="VUP Logo" class="vup-logo" />
          <div class="speed-badge">×1.5</div>
        </div>
        <div class="success-text">
          <div class="speed-title">
            <span class="speed-left">VUP</span>
            <span class="speed-arrow"> -> </span>
            <span class="speed-right">1.5x</span>
          </div>
          <p class="success-description">{{ t('success.description') }}</p>
          <div class="action-buttons">
            <NuxtLink
              to="/demo"
              class="action-btn secondary"
              :class="[{ active: $route.path === '/demo' }]"
            >
              {{ t('success.examples') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Language Switcher -->
    <div class="language-switcher">
      <button
        :class="{ active: locale === 'en-US' }"
        class="lang-btn"
        @click="switchLanguage('en-US')"
      >
        English
      </button>
      <button
        :class="{ active: locale === 'zh-CN' }"
        class="lang-btn"
        @click="switchLanguage('zh-CN')"
      >
        中文
      </button>
    </div>

    <!-- Demo Component -->
    <Demo />
  </div>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';
.nuxt-demo-container {
  min-height: 100vh;
  background: #ffffff;
  color: #1a1a1a;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    sans-serif;
  line-height: 1.6;
}

// Success Section
.success-section {
  @apply py-20 px-4;
  @apply bg-gradient-to-br from-slate-50 to-blue-50;

  .success-content {
    @apply max-w-4xl mx-auto text-center;

    .success-visual {
      @apply flex items-center justify-center space-x-6 mb-12;
      @apply relative;

      .nuxt-logo,
      .vup-logo {
        @apply w-16 h-16;
        @apply drop-shadow-lg;
        @apply transition-transform duration-300 hover:scale-110;
      }

      .speed-badge {
        @apply absolute -top-3 -right-3;
        @apply bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full;
        @apply w-10 h-10 flex items-center justify-center;
        @apply font-bold text-sm shadow-lg;
        @apply animate-pulse;
      }
    }

    .success-text {
      .speed-title {
        @apply relative mb-6;
        @apply inline-block;
        @apply text-5xl font-bold;
        @apply leading-tight;
        @apply tracking-wide;
        @apply overflow-hidden;
        @apply rounded-2xl;
        @apply p-4;

        // 3:2 比例的背景分割 (60% : 40%)
        background: linear-gradient(to right, #10b981 0%, #10b981 60%, #e2e8f0 60%, #e2e8f0 100%);

        // 添加分割线
        &::before {
          content: '';
          @apply absolute top-0 bottom-0;
          @apply w-0.5;
          @apply bg-slate-400;
          @apply z-10;
          left: 60%;
          transform: translateX(-50%);
        }

        .speed-left {
          @apply text-white;
          @apply relative;
          @apply z-20;
          @apply pr-2;

          // 发光效果
          text-shadow:
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(16, 185, 129, 0.2);
        }

        .speed-arrow {
          @apply text-white;
          @apply relative;
          @apply z-20;
          @apply px-1;

          text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .speed-right {
          @apply text-slate-700;
          @apply relative;
          @apply z-20;
          @apply pl-2;
          @apply font-extrabold;

          // 强调 1.5x 效果
          text-shadow: 0 0 10px rgba(100, 116, 139, 0.3);
        }

        // 整体阴影效果
        box-shadow:
          0 10px 25px rgba(16, 185, 129, 0.15),
          0 4px 10px rgba(0, 0, 0, 0.1);

        // 悬停效果
        @apply transition-all duration-300;
        @apply hover:scale-105;
        @apply hover:shadow-xl;
      }

      .success-description {
        @apply text-2xl text-slate-600;
        @apply leading-relaxed;
      }

      .action-buttons {
        @apply flex gap-4 justify-center mt-8;

        .action-btn {
          @apply px-6 py-3 rounded-lg font-semibold text-lg;
          @apply transition-all duration-300 cursor-pointer;
          @apply border-2;

          &.primary {
            @apply bg-white text-slate-600 border-slate-300;
            @apply hover:bg-slate-50 hover:border-slate-400;
            @apply hover:shadow-lg hover:scale-105;

            &.active {
              @apply bg-blue-600 text-white border-blue-600;
              @apply shadow-lg;
            }
          }

          &.secondary {
            @apply bg-white text-slate-600 border-slate-300;
            @apply hover:bg-slate-50 hover:border-slate-400;
            @apply hover:shadow-lg hover:scale-105;

            &.active {
              @apply bg-emerald-600 text-white border-emerald-600;
              @apply shadow-lg;
            }
          }
        }
      }
    }
  }
}

// Language Switcher
.language-switcher {
  @apply fixed bottom-8 right-8;
  @apply flex bg-white rounded-2xl shadow-xl border border-slate-200;
  @apply p-2 backdrop-blur-sm;

  .lang-btn {
    @apply px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200;
    @apply text-slate-600 hover:text-slate-900 hover:bg-slate-50;

    &.active {
      @apply bg-gradient-to-r from-blue-500 to-indigo-500 text-white;
      @apply shadow-md;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .success-section {
    @apply py-12;

    .success-content {
      .success-visual {
        @apply space-x-2;

        .nuxt-logo,
        .vup-logo {
          @apply w-12 h-12;
        }
      }

      .success-text {
        .success-title {
          @apply text-3xl;
        }

        .action-buttons {
          @apply flex-col gap-3;

          .action-btn {
            @apply px-4 py-2 text-base;
          }
        }
      }
    }
  }

  .language-switcher {
    @apply bottom-4 right-4;
  }
}
</style>
