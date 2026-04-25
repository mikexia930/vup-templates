<script setup lang="ts">
import { demoStructure } from '../common/demo-data';

const { t } = useI18n();
</script>

<template>
  <view class="demo-section">
    <view class="demo-section__heading">
      <text class="demo-section__mark"></text>
      <view>
        <text class="demo-section__title">{{ t('demo.structure.title') }}</text>
        <text class="demo-section__desc">{{ t('demo.structure.description') }}</text>
      </view>
    </view>
    <view class="demo-structure">
      <view v-for="item in demoStructure" :key="item.path" class="demo-structure__row">
        <text class="demo-structure__path">{{ item.path }}</text>
        <text class="demo-structure__desc">{{ t(item.descKey) }}</text>
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

.demo-structure {
  overflow: hidden;
  background: #ffffff;
  border: 2rpx solid #d6e4ff;
  border-radius: 26rpx;
  box-shadow: 0 12rpx 28rpx rgba(16, 24, 40, 0.06);
}

.demo-structure__row {
  padding: 24rpx 28rpx;
  border-bottom: 1rpx solid #f0f5ff;
}

.demo-structure__row:last-child {
  border-bottom: 0;
}

.demo-structure__path,
.demo-structure__desc {
  display: block;
}

.demo-structure__path {
  color: #0958d9;
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 23rpx;
  font-weight: 700;
  line-height: 1.45;
}

.demo-structure__desc {
  margin-top: 8rpx;
  color: #667085;
  font-size: 23rpx;
  line-height: 1.45;
}
</style>
