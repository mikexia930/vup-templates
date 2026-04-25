<script setup lang="ts">
import { copyText, showInfo } from '../common/platform-actions';

const { t } = useI18n();

function copyStartCommand() {
  copyText('pnpm dev', t('demo.actions.copySuccess'), t('demo.actions.copyFallback'));
}

function showDocs() {
  showInfo(t('demo.docs.title'), t('demo.docs.content'), t('demo.actions.confirm'));
}
</script>

<template>
  <view class="demo-hero">
    <view class="demo-hero__badge">
      <text class="demo-hero__dot"></text>
      <text>{{ t('demo.hero.badge') }}</text>
    </view>
    <text class="demo-hero__title">{{ t('demo.hero.title') }}</text>
    <text class="demo-hero__desc">{{ t('demo.hero.description') }}</text>
    <view class="demo-hero__actions">
      <button
        class="demo-hero__primary"
        hover-class="demo-hero__primary--active"
        @click="copyStartCommand"
      >
        {{ t('demo.actions.copyStart') }}
      </button>
      <button
        class="demo-hero__secondary"
        hover-class="demo-hero__secondary--active"
        @click="showDocs"
      >
        {{ t('demo.actions.docs') }}
      </button>
    </view>
    <view class="demo-hero__terminal">
      <view class="demo-hero__lights">
        <text class="demo-hero__light demo-hero__light--red"></text>
        <text class="demo-hero__light demo-hero__light--yellow"></text>
        <text class="demo-hero__light demo-hero__light--green"></text>
      </view>
      <text class="demo-hero__code">$ pnpm dev</text>
      <text class="demo-hero__muted">UNI ready in 320ms</text>
      <text class="demo-hero__success">Local: http://localhost:9308/</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo-hero {
  display: flex;
  flex-direction: column;
  margin: 28rpx 28rpx 0;
  padding: 44rpx 36rpx;
  background: linear-gradient(145deg, #f0f5ff 0%, #e6f4ff 58%, #ffffff 100%);
  border: 2rpx solid #d6e4ff;
  border-radius: 34rpx;
  box-shadow: 0 18rpx 44rpx rgba(22, 119, 255, 0.1);
}

.demo-hero__badge {
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 12rpx;
  padding: 12rpx 22rpx;
  color: #0958d9;
  font-size: 24rpx;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999rpx;
}

.demo-hero__dot {
  width: 16rpx;
  height: 16rpx;
  background: #52c41a;
  border-radius: 999rpx;
}

.demo-hero__title {
  display: block;
  margin-top: 42rpx;
  color: #101828;
  font-size: 60rpx;
  font-weight: 900;
  line-height: 1.08;
}

.demo-hero__desc {
  display: block;
  margin-top: 28rpx;
  color: #475467;
  font-size: 30rpx;
  line-height: 1.65;
}

.demo-hero__actions {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-top: 42rpx;
}

.demo-hero__primary,
.demo-hero__secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 88rpx;
  margin: 0;
  border-radius: 20rpx;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 88rpx;
}

.demo-hero__primary {
  color: #ffffff;
  background: #1677ff;
  box-shadow: 0 14rpx 26rpx rgba(22, 119, 255, 0.24);
}

.demo-hero__primary--active {
  background: #0958d9;
}

.demo-hero__secondary {
  color: #101828;
  background: #ffffff;
  border: 2rpx solid #d6e4ff;
}

.demo-hero__secondary--active {
  background: #f0f5ff;
}

.demo-hero__terminal {
  margin-top: 46rpx;
  overflow: hidden;
  padding: 0 34rpx 34rpx;
  background: #1f2937;
  border-radius: 30rpx;
}

.demo-hero__lights {
  display: flex;
  gap: 14rpx;
  margin: 0 -34rpx 30rpx;
  padding: 24rpx 34rpx;
  background: #111827;
}

.demo-hero__light {
  width: 20rpx;
  height: 20rpx;
  border-radius: 999rpx;
}

.demo-hero__light--red {
  background: #ff4d4f;
}

.demo-hero__light--yellow {
  background: #faad14;
}

.demo-hero__light--green {
  background: #52c41a;
}

.demo-hero__code,
.demo-hero__muted,
.demo-hero__success {
  display: block;
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 24rpx;
  line-height: 1.9;
}

.demo-hero__code {
  color: #f9fafb;
}

.demo-hero__muted {
  color: #98a2b3;
}

.demo-hero__success {
  color: #73d13d;
}
</style>
