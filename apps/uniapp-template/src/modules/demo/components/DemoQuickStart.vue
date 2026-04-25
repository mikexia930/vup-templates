<script setup lang="ts">
import { demoCommands } from '../common/demo-data';
import { copyText } from '../common/platform-actions';

const { t } = useI18n();

function copyCommand(command: string) {
  copyText(command, t('demo.actions.copySuccess'), t('demo.actions.copyFallback'));
}
</script>

<template>
  <view class="demo-section">
    <view class="demo-section__heading">
      <text class="demo-section__mark"></text>
      <view>
        <text class="demo-section__title">{{ t('demo.quickstart.title') }}</text>
        <text class="demo-section__desc">{{ t('demo.quickstart.description') }}</text>
      </view>
    </view>
    <view class="demo-command-list">
      <view
        v-for="item in demoCommands"
        :key="item.key"
        class="demo-command-card"
        @click="copyCommand(item.command)"
      >
        <view class="demo-command-card__body">
          <text class="demo-command-card__title">{{ t(item.titleKey) }}</text>
          <text class="demo-command-card__desc">{{ t(item.descKey) }}</text>
        </view>
        <text class="demo-command-card__code">{{ item.command }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo-section {
  padding: 40rpx 28rpx 0;
}

.demo-section__heading {
  display: flex;
  gap: 18rpx;
  align-items: flex-start;
  margin-bottom: 24rpx;
}

.demo-section__mark {
  width: 8rpx;
  height: 42rpx;
  margin-top: 6rpx;
  background: #1677ff;
  border-radius: 999rpx;
}

.demo-section__title,
.demo-section__desc {
  display: block;
}

.demo-section__title {
  color: #101828;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.demo-section__desc {
  margin-top: 10rpx;
  color: #667085;
  font-size: 26rpx;
  line-height: 1.45;
}

.demo-command-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx;
}

.demo-command-card {
  box-sizing: border-box;
  width: 48.5%;
  padding: 26rpx;
  background: #ffffff;
  border: 2rpx solid #d6e4ff;
  border-radius: 24rpx;
  box-shadow: 0 10rpx 24rpx rgba(16, 24, 40, 0.06);
}

.demo-command-card:active {
  background: #f0f5ff;
}

.demo-command-card__title,
.demo-command-card__desc,
.demo-command-card__code {
  display: block;
}

.demo-command-card__title {
  color: #101828;
  font-size: 28rpx;
  font-weight: 800;
}

.demo-command-card__desc {
  min-height: 68rpx;
  margin-top: 14rpx;
  color: #667085;
  font-size: 23rpx;
  line-height: 1.45;
}

.demo-command-card__code {
  overflow: hidden;
  margin-top: 22rpx;
  padding: 16rpx 18rpx;
  color: #ffffff;
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 21rpx;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #1f2937;
  border-radius: 14rpx;
}
</style>
