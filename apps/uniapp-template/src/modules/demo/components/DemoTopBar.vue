<script setup lang="ts">
const { t } = useI18n();

const isDrawerOpen = ref(false);

function openDrawer() {
  isDrawerOpen.value = true;
}

function closeDrawer() {
  isDrawerOpen.value = false;
}

function showDrawerItem(titleKey: string, contentKey: string) {
  uni.showModal({
    title: t(titleKey),
    content: t(contentKey),
    confirmText: t('demo.actions.confirm'),
    showCancel: false,
  });
}
</script>

<template>
  <view class="demo-topbar">
    <view class="demo-topbar__menu" @click="openDrawer">
      <text class="demo-topbar__line"></text>
      <text class="demo-topbar__line"></text>
      <text class="demo-topbar__line"></text>
    </view>
    <view class="demo-topbar__brand">
      <view class="demo-topbar__logo">
        <text>U</text>
      </view>
      <view>
        <text class="demo-topbar__title">{{ t('demo.header.title') }}</text>
        <text class="demo-topbar__subtitle">{{ t('demo.header.subtitle') }}</text>
      </view>
    </view>
    <text class="demo-topbar__version">v2.0.0</text>
  </view>

  <view v-if="isDrawerOpen" class="demo-drawer">
    <view class="demo-drawer__mask" @click="closeDrawer"></view>
    <view class="demo-drawer__panel">
      <view class="demo-drawer__header">
        <text class="demo-drawer__title">{{ t('demo.drawer.title') }}</text>
        <text class="demo-drawer__close" @click="closeDrawer">×</text>
      </view>
      <view class="demo-drawer__list">
        <view
          class="demo-drawer__item"
          @click="showDrawerItem('demo.drawer.routes.title', 'demo.drawer.routes.content')"
        >
          <text class="demo-drawer__item-title">{{ t('demo.drawer.routes.title') }}</text>
          <text class="demo-drawer__item-desc">{{ t('demo.drawer.routes.desc') }}</text>
        </view>
        <view
          class="demo-drawer__item"
          @click="showDrawerItem('demo.drawer.modules.title', 'demo.drawer.modules.content')"
        >
          <text class="demo-drawer__item-title">{{ t('demo.drawer.modules.title') }}</text>
          <text class="demo-drawer__item-desc">{{ t('demo.drawer.modules.desc') }}</text>
        </view>
        <view
          class="demo-drawer__item"
          @click="showDrawerItem('demo.drawer.platform.title', 'demo.drawer.platform.content')"
        >
          <text class="demo-drawer__item-title">{{ t('demo.drawer.platform.title') }}</text>
          <text class="demo-drawer__item-desc">{{ t('demo.drawer.platform.desc') }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo-topbar {
  display: flex;
  align-items: center;
  gap: 24rpx;
  min-height: 120rpx;
  padding: 26rpx 32rpx;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1rpx solid #d6e4ff;
}

.demo-drawer {
  position: fixed;
  inset: 0;
  z-index: 80;
}

.demo-drawer__mask {
  position: absolute;
  inset: 0;
  background: rgba(16, 24, 40, 0.34);
}

.demo-drawer__panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 520rpx;
  box-sizing: border-box;
  padding: 40rpx 28rpx;
  background: #ffffff;
  box-shadow: 18rpx 0 42rpx rgba(16, 24, 40, 0.14);
}

.demo-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-drawer__title {
  color: #101828;
  font-size: 34rpx;
  font-weight: 900;
}

.demo-drawer__close {
  width: 58rpx;
  height: 58rpx;
  color: #667085;
  font-size: 44rpx;
  line-height: 54rpx;
  text-align: center;
  background: #f5f5f5;
  border-radius: 18rpx;
}

.demo-drawer__list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 34rpx;
}

.demo-drawer__item {
  padding: 24rpx;
  background: #f4f8ff;
  border: 2rpx solid #d6e4ff;
  border-radius: 22rpx;
}

.demo-drawer__item:active {
  background: #e6f4ff;
}

.demo-drawer__item-title,
.demo-drawer__item-desc {
  display: block;
}

.demo-drawer__item-title {
  color: #101828;
  font-size: 28rpx;
  font-weight: 900;
}

.demo-drawer__item-desc {
  margin-top: 10rpx;
  color: #667085;
  font-size: 23rpx;
  line-height: 1.45;
}

.demo-topbar__menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  flex: 0 0 70rpx;
  width: 70rpx;
  height: 70rpx;
  background: #ffffff;
  border: 2rpx solid #d6e4ff;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 20rpx rgba(22, 119, 255, 0.08);
}

.demo-topbar__line {
  width: 32rpx;
  height: 4rpx;
  background: #101828;
  border-radius: 999rpx;
}

.demo-topbar__brand {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex: 1;
  min-width: 0;
}

.demo-topbar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 54rpx;
  width: 54rpx;
  height: 54rpx;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 800;
  background: #1677ff;
  border-radius: 14rpx;
}

.demo-topbar__title,
.demo-topbar__subtitle {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-topbar__title {
  color: #101828;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1.2;
}

.demo-topbar__subtitle {
  margin-top: 8rpx;
  color: #667085;
  font-size: 22rpx;
}

.demo-topbar__version {
  flex: 0 0 auto;
  padding: 10rpx 18rpx;
  color: #1677ff;
  font-size: 22rpx;
  font-weight: 800;
  background: #e6f4ff;
  border-radius: 999rpx;
}
</style>
