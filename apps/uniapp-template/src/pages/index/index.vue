<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { switchLanguage, getCurrentLocale } from '@/locales';
import { computed } from 'vue';

const { t } = useI18n();
const currentLocale = computed(() => getCurrentLocale());

// 技术栈链接配置
const techLinks = {
  uniapp: 'https://uniapp.dcloud.net.cn/',
  vue: 'https://cn.vuejs.org/',
  typescript: 'https://www.typescriptlang.org/',
  vite: 'https://vitejs.dev/',
};

// 处理技术栈链接点击
const openTechLink = (tech: keyof typeof techLinks) => {
  const url = techLinks[tech];

  // #ifdef H5
  window.open(url, '_blank');
  // #endif

  // #ifndef H5
  uni.showModal({
    title: t(`techstack.${tech}.title`),
    content: `${t(`techstack.${tech}.desc`)}\n\n文档链接：${url}`,
    showCancel: false,
    confirmText: '知道了',
  });
  // #endif
};

// 快速启动命令配置
const quickstartCommands = {
  dev: 'pnpm dev',
  build: 'pnpm build',
  lint: 'pnpm lint',
  format: 'pnpm format',
};

// 处理命令复制
const copyCommand = (command: keyof typeof quickstartCommands) => {
  const cmd = quickstartCommands[command];

  // #ifdef H5
  // 在H5平台复制到剪贴板
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(cmd)
      .then(() => {
        uni.showToast({
          title: '命令已复制',
          icon: 'success',
          duration: 2000,
        });
      })
      .catch(() => {
        uni.showToast({
          title: '复制失败',
          icon: 'none',
        });
      });
  } else {
    // 降级方案
    uni.showModal({
      title: t(`quickstart.${command}.title`),
      content: `命令：${cmd}\n\n请手动复制此命令`,
      showCancel: false,
      confirmText: '知道了',
    });
  }
  // #endif

  // #ifndef H5
  // 在其他平台显示命令
  uni.showModal({
    title: t(`quickstart.${command}.title`),
    content: `命令：${cmd}\n\n${t(`quickstart.${command}.desc`)}`,
    showCancel: false,
    confirmText: '知道了',
  });
  // #endif
};
</script>

<template>
  <view class="uniapp-demo-container">
    <!-- 成功消息区域 -->
    <view class="success-section">
      <view class="success-content">
        <!-- 视觉元素 -->
        <view class="success-visual">
          <image src="/static/logo.png" alt="UniApp Logo" class="uniapp-logo" mode="aspectFit" />
          <image
            src="@_shared/assets/images/vup.svg"
            alt="VUP Logo"
            class="vup-logo"
            mode="aspectFit"
          />
        </view>

        <!-- 文本内容 -->
        <view class="success-text">
          <view class="speed-title">
            <text class="speed-left">VUP</text>
            <text class="speed-arrow"> → </text>
            <text class="speed-right">1.5x</text>
          </view>
          <view>
            <text class="success-description">
              {{ t('success.description') }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 快速启动 -->
    <view class="quickstart-section">
      <view class="quickstart-title">
        <text>{{ t('quickstart.title') }}</text>
      </view>
      <view class="quickstart-grid">
        <view class="quickstart-item" @click="copyCommand('dev')">
          <view class="quickstart-icon">🚀</view>
          <text class="quickstart-title">{{ t('quickstart.dev.title') }}</text>
          <text class="quickstart-desc">{{ t('quickstart.dev.desc') }}</text>
          <view class="quickstart-command">
            <text class="command-text">{{ t('quickstart.dev.command') }}</text>
          </view>
        </view>
        <view class="quickstart-item" @click="copyCommand('build')">
          <view class="quickstart-icon">📦</view>
          <text class="quickstart-title">{{ t('quickstart.build.title') }}</text>
          <text class="quickstart-desc">{{ t('quickstart.build.desc') }}</text>
          <view class="quickstart-command">
            <text class="command-text">{{ t('quickstart.build.command') }}</text>
          </view>
        </view>
        <view class="quickstart-item" @click="copyCommand('lint')">
          <view class="quickstart-icon">🔍</view>
          <text class="quickstart-title">{{ t('quickstart.lint.title') }}</text>
          <text class="quickstart-desc">{{ t('quickstart.lint.desc') }}</text>
          <view class="quickstart-command">
            <text class="command-text">{{ t('quickstart.lint.command') }}</text>
          </view>
        </view>
        <view class="quickstart-item" @click="copyCommand('format')">
          <view class="quickstart-icon">✨</view>
          <text class="quickstart-title">{{ t('quickstart.format.title') }}</text>
          <text class="quickstart-desc">{{ t('quickstart.format.desc') }}</text>
          <view class="quickstart-command">
            <text class="command-text">{{ t('quickstart.format.command') }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 技术栈展示 -->
    <view class="techstack-section">
      <view class="techstack-title">
        <text>{{ t('techstack.title') }}</text>
      </view>
      <view class="techstack-desc">
        <text>{{ t('techstack.description') }}</text>
      </view>
      <view class="techstack-grid">
        <view class="techstack-item" @click="openTechLink('uniapp')">
          <view class="techstack-icon">📱</view>
          <text class="techstack-name">{{ t('techstack.uniapp.title') }}</text>
          <text class="techstack-desc">{{ t('techstack.uniapp.desc') }}</text>
          <text class="techstack-link">{{ t('techstack.uniapp.link') }}</text>
        </view>
        <view class="techstack-item" @click="openTechLink('vue')">
          <view class="techstack-icon">⚡</view>
          <text class="techstack-name">{{ t('techstack.vue.title') }}</text>
          <text class="techstack-desc">{{ t('techstack.vue.desc') }}</text>
          <text class="techstack-link">{{ t('techstack.vue.link') }}</text>
        </view>
        <view class="techstack-item" @click="openTechLink('typescript')">
          <view class="techstack-icon">🔧</view>
          <text class="techstack-name">{{ t('techstack.typescript.title') }}</text>
          <text class="techstack-desc">{{ t('techstack.typescript.desc') }}</text>
          <text class="techstack-link">{{ t('techstack.typescript.link') }}</text>
        </view>
        <view class="techstack-item" @click="openTechLink('vite')">
          <view class="techstack-icon">⚡</view>
          <text class="techstack-name">{{ t('techstack.vite.title') }}</text>
          <text class="techstack-desc">{{ t('techstack.vite.desc') }}</text>
          <text class="techstack-link">{{ t('techstack.vite.link') }}</text>
        </view>
      </view>
    </view>

    <!-- 语言切换器 -->
    <view class="language-switcher">
      <button
        @click="switchLanguage('zh-CN')"
        :class="{ active: currentLocale === 'zh-CN' }"
        class="lang-btn"
      >
        中文
      </button>
      <button
        @click="switchLanguage('en-US')"
        :class="{ active: currentLocale === 'en-US' }"
        class="lang-btn"
      >
        English
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.test-area {
  @apply text-3xl underline text-red-500;
}
.uniapp-demo-container {
  min-height: 100vh;
  background: #ffffff;
  color: #1a1a1a;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    sans-serif;
  line-height: 1.6;
}

// 成功区域
.success-section {
  padding: 80rpx 32rpx;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);

  .success-content {
    max-width: 1200rpx;
    margin: 0 auto;
    text-align: center;

    .success-visual {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 48rpx;
      margin-bottom: 96rpx;
      position: relative;

      .uniapp-logo,
      .vup-logo {
        width: 160rpx;
        height: 160rpx;
        filter: drop-shadow(0 8rpx 16rpx rgba(0, 0, 0, 0.1));
        transition: transform 0.3s ease;

        &:active {
          transform: scale(1.1);
        }
      }
    }

    .success-text {
      .speed-title {
        position: relative;
        margin-bottom: 48rpx;
        display: inline-block;
        font-size: 80rpx;
        font-weight: bold;
        line-height: 1.2;
        letter-spacing: 2rpx;
        overflow: hidden;
        border-radius: 32rpx;
        padding: 32rpx;

        // 3:2 比例的背景分割 (60% : 40%)
        background: linear-gradient(to right, #10b981 0%, #10b981 60%, #e2e8f0 60%, #e2e8f0 100%);

        // 添加分割线
        &::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2rpx;
          background: #94a3b8;
          z-index: 10;
          left: 60%;
          transform: translateX(-50%);
        }

        .speed-left {
          color: white;
          position: relative;
          z-index: 20;
          padding-right: 16rpx;

          // 发光效果
          text-shadow:
            0 0 40rpx rgba(255, 255, 255, 0.3),
            0 0 80rpx rgba(16, 185, 129, 0.2);
        }

        .speed-arrow {
          color: white;
          position: relative;
          z-index: 20;
          padding: 0 8rpx;
          text-shadow: 0 0 20rpx rgba(255, 255, 255, 0.2);
        }

        .speed-right {
          color: #475569;
          position: relative;
          z-index: 20;
          padding-left: 16rpx;
          font-weight: 800;
          text-shadow: 0 0 20rpx rgba(100, 116, 139, 0.3);
        }

        // 整体阴影效果
        box-shadow:
          0 20rpx 50rpx rgba(16, 185, 129, 0.15),
          0 8rpx 20rpx rgba(0, 0, 0, 0.1);

        // 点击效果
        transition: all 0.3s ease;

        &:active {
          transform: scale(1.05);
          box-shadow:
            0 25rpx 60rpx rgba(16, 185, 129, 0.2),
            0 10rpx 25rpx rgba(0, 0, 0, 0.15);
        }
      }

      .success-description {
        font-size: 32rpx;
        color: #64748b;
        line-height: 1.6;
      }
    }
  }
}

// 快速启动区域
.quickstart-section {
  padding: 80rpx 32rpx;
  background: #f8fafc;

  .quickstart-title {
    text-align: center;
    margin-bottom: 64rpx;

    text {
      font-size: 48rpx;
      font-weight: bold;
      color: #1e293b;
    }
  }

  .quickstart-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32rpx;
    max-width: 1200rpx;
    margin: 0 auto;

    .quickstart-item {
      background: white;
      border-radius: 24rpx;
      padding: 48rpx 32rpx;
      text-align: center;
      transition: all 0.3s ease;
      border: 2rpx solid transparent;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      cursor: pointer;

      &:active {
        background: #f8fafc;
        border-color: #e2e8f0;
        transform: translateY(-4rpx);
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
      }

      .quickstart-icon {
        font-size: 64rpx;
        margin-bottom: 24rpx;
        display: block;
      }

      .quickstart-title {
        display: block;
        font-size: 32rpx;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 16rpx;
      }

      .quickstart-desc {
        display: block;
        font-size: 24rpx;
        color: #64748b;
        line-height: 1.4;
        margin-bottom: 20rpx;
      }

      .quickstart-command {
        background: #f1f5f9;
        border-radius: 12rpx;
        padding: 16rpx 24rpx;
        border: 1rpx solid #e2e8f0;
        transition: all 0.2s ease;

        .command-text {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 22rpx;
          color: #475569;
          font-weight: 500;
          letter-spacing: 0.5rpx;
        }
      }

      &:active .quickstart-command {
        background: #e2e8f0;
        border-color: #cbd5e1;
      }
    }
  }
}

// 技术栈区域
.techstack-section {
  padding: 80rpx 32rpx;
  background: #ffffff;

  .techstack-title {
    text-align: center;
    margin-bottom: 32rpx;

    text {
      font-size: 48rpx;
      font-weight: bold;
      color: #1e293b;
    }
  }

  .techstack-desc {
    text-align: center;
    margin-bottom: 64rpx;

    text {
      font-size: 28rpx;
      color: #64748b;
      line-height: 1.6;
    }
  }

  .techstack-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32rpx;
    max-width: 1200rpx;
    margin: 0 auto;

    .techstack-item {
      background: #f8fafc;
      border-radius: 24rpx;
      padding: 48rpx 32rpx;
      text-align: center;
      transition: all 0.3s ease;
      border: 2rpx solid transparent;
      cursor: pointer;

      &:active {
        background: #f1f5f9;
        border-color: #e2e8f0;
        transform: translateY(-4rpx);
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
      }

      .techstack-icon {
        font-size: 64rpx;
        margin-bottom: 24rpx;
        display: block;
      }

      .techstack-name {
        display: block;
        font-size: 32rpx;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 16rpx;
      }

      .techstack-desc {
        display: block;
        font-size: 24rpx;
        color: #64748b;
        line-height: 1.4;
        margin-bottom: 16rpx;
      }

      .techstack-link {
        display: block;
        font-size: 22rpx;
        color: #3b82f6;
        font-weight: 500;
        text-decoration: underline;
        transition: color 0.2s ease;

        &:hover {
          color: #1d4ed8;
        }
      }
    }
  }
}

// 语言切换器
.language-switcher {
  position: fixed;
  bottom: 64rpx;
  right: 64rpx;
  display: flex;
  background: white;
  border-radius: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  border: 2rpx solid #e2e8f0;
  padding: 8rpx;
  backdrop-filter: blur(8rpx);

  .lang-btn {
    padding: 16rpx 32rpx;
    font-size: 24rpx;
    font-weight: 600;
    border-radius: 24rpx;
    transition: all 0.2s ease;
    color: #64748b;
    background: transparent;
    border: none;

    &:active {
      color: #1e293b;
      background: #f1f5f9;
    }

    &.active {
      background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
      color: white;
      box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.3);
    }
  }
}

// 响应式设计
@media screen and (max-width: 750rpx) {
  .success-section {
    padding: 60rpx 24rpx;

    .success-content {
      .success-visual {
        margin-bottom: 64rpx;
        gap: 24rpx;

        .uniapp-logo,
        .vup-logo {
          width: 120rpx;
          height: 120rpx;
        }
      }

      .success-text {
        .speed-title {
          font-size: 60rpx;
          padding: 24rpx;
        }

        .success-description {
          font-size: 28rpx;
        }
      }
    }
  }

  .quickstart-section {
    padding: 60rpx 24rpx;

    .quickstart-grid {
      grid-template-columns: 1fr;
      gap: 24rpx;

      .quickstart-item {
        padding: 40rpx 24rpx;
      }
    }
  }

  .techstack-section {
    padding: 60rpx 24rpx;

    .techstack-grid {
      grid-template-columns: 1fr;
      gap: 24rpx;

      .techstack-item {
        padding: 40rpx 24rpx;
      }
    }
  }

  .language-switcher {
    bottom: 32rpx;
    right: 32rpx;
  }
}
</style>
