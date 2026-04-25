<script setup lang="ts">
import { getCurrentLocale, switchLanguage } from '@/locales';

const { t } = useI18n();
const currentLocale = computed(() => getCurrentLocale());

function setLocale(locale: 'zh-CN' | 'en-US') {
  switchLanguage(locale);
  uni.showToast({
    title: t('demo.language.changed'),
    icon: 'success',
    duration: 1200,
  });
}
</script>

<template>
  <view class="demo-language">
    <view>
      <text class="demo-language__title">{{ t('demo.language.title') }}</text>
      <text class="demo-language__desc">{{ t('demo.language.description') }}</text>
    </view>
    <view class="demo-language__switch">
      <button
        class="demo-language__button"
        :class="{ 'demo-language__button--active': currentLocale === 'zh-CN' }"
        @click="setLocale('zh-CN')"
      >
        中文
      </button>
      <button
        class="demo-language__button"
        :class="{ 'demo-language__button--active': currentLocale === 'en-US' }"
        @click="setLocale('en-US')"
      >
        EN
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo-language {
  position: fixed;
  right: 24rpx;
  bottom: 24rpx;
  left: 24rpx;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  padding: 22rpx 24rpx;
  background: rgba(255, 255, 255, 0.96);
  border: 2rpx solid #d6e4ff;
  border-radius: 28rpx;
  box-shadow: 0 16rpx 44rpx rgba(16, 24, 40, 0.12);
}

.demo-language__title,
.demo-language__desc {
  display: block;
}

.demo-language__title {
  color: #101828;
  font-size: 25rpx;
  font-weight: 900;
}

.demo-language__desc {
  margin-top: 6rpx;
  color: #667085;
  font-size: 21rpx;
}

.demo-language__switch {
  display: flex;
  gap: 10rpx;
  flex: 0 0 auto;
  padding: 8rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
}

.demo-language__button {
  width: 84rpx;
  height: 58rpx;
  margin: 0;
  color: #8c8c8c;
  font-size: 22rpx;
  font-weight: 900;
  line-height: 58rpx;
  background: transparent;
  border-radius: 16rpx;
}

.demo-language__button--active {
  color: #ffffff;
  background: #1677ff;
}
</style>
