<script setup lang="ts">
import { demoCapabilities } from '../common/demo-data';
import { showInfo } from '../common/platform-actions';
import { useDemoTemplateStore } from '../stores/useDemoTemplateStore';

const { t } = useI18n();
const store = useDemoTemplateStore();
const activeTab = ref<'i18n' | 'state' | 'request'>('i18n');

const runtimeTabs = [
  { key: 'i18n', labelKey: 'demo.runtime.tabs.i18n' },
  { key: 'state', labelKey: 'demo.runtime.tabs.state' },
  { key: 'request', labelKey: 'demo.runtime.tabs.request' },
] as const;

const runtimeTitle = computed(() => t(`demo.runtime.panels.${activeTab.value}.title`));
const runtimeDescription = computed(() => t(`demo.runtime.panels.${activeTab.value}.description`));

function runPlatformApi() {
  uni.showModal({
    title: t('demo.platform.title'),
    content: t('demo.platform.content'),
    confirmText: t('demo.actions.confirm'),
    showCancel: false,
  });
}

async function loadInfo() {
  await store.loadInfo();
  if (store.info) {
    showInfo(
      t('demo.request.successTitle'),
      `${store.info.name} ${store.info.version}`,
      t('demo.actions.confirm')
    );
  }
}
</script>

<template>
  <view class="demo-section">
    <view class="demo-section__heading">
      <text class="demo-section__mark"></text>
      <view>
        <text class="demo-section__title">{{ t('demo.capabilities.title') }}</text>
        <text class="demo-section__desc">{{ t('demo.capabilities.description') }}</text>
      </view>
    </view>

    <view class="demo-capability-list">
      <view
        v-for="item in demoCapabilities"
        :key="item.key"
        class="demo-capability-card"
        :class="`demo-capability-card--${item.accent}`"
      >
        <text class="demo-capability-card__title">{{ t(item.titleKey) }}</text>
        <text class="demo-capability-card__desc">{{ t(item.descKey) }}</text>
      </view>
    </view>

    <view class="demo-runtime">
      <view class="demo-runtime__tabs">
        <text
          v-for="tab in runtimeTabs"
          :key="tab.key"
          class="demo-runtime__tab"
          :class="{ 'demo-runtime__tab--active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ t(tab.labelKey) }}
        </text>
      </view>
      <text class="demo-runtime__title">{{ runtimeTitle }}</text>
      <text class="demo-runtime__desc">{{ runtimeDescription }}</text>
      <view v-if="activeTab === 'i18n'" class="demo-runtime__meta">
        <text>{{ t('demo.runtime.i18nMeta') }}</text>
      </view>
      <view v-if="activeTab === 'state'" class="demo-runtime__meta">
        <text>{{
          store.isReady ? t('demo.runtime.stateReady') : t('demo.runtime.stateIdle')
        }}</text>
      </view>
      <view v-if="activeTab === 'request'" class="demo-runtime__meta">
        <text>{{ t('demo.runtime.requestMeta') }}</text>
      </view>
      <view v-if="store.info" class="demo-runtime__result">
        <text class="demo-runtime__result-title">{{ store.info.name }}</text>
        <text class="demo-runtime__result-desc">{{ store.info.description }}</text>
        <view class="demo-runtime__tags">
          <text v-for="platform in store.platforms" :key="platform" class="demo-runtime__tag">
            {{ platform }}
          </text>
        </view>
      </view>
      <view v-if="activeTab !== 'i18n'" class="demo-runtime__actions">
        <button
          class="demo-runtime__button"
          :loading="store.isLoading"
          hover-class="demo-runtime__button--active"
          @click="loadInfo"
        >
          {{ t('demo.request.button') }}
        </button>
        <button class="demo-runtime__button demo-runtime__button--ghost" @click="runPlatformApi">
          {{ t('demo.platform.button') }}
        </button>
      </view>
      <text v-if="store.errorMessage" class="demo-runtime__error">{{ store.errorMessage }}</text>
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

.demo-capability-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.demo-capability-card {
  padding: 28rpx 30rpx;
  background: #ffffff;
  border: 2rpx solid #d6e4ff;
  border-left-width: 8rpx;
  border-radius: 24rpx;
  box-shadow: 0 10rpx 24rpx rgba(16, 24, 40, 0.05);
}

.demo-capability-card--primary {
  border-left-color: #1677ff;
}

.demo-capability-card--success {
  border-left-color: #52c41a;
}

.demo-capability-card--warning {
  border-left-color: #faad14;
}

.demo-capability-card__title,
.demo-capability-card__desc {
  display: block;
}

.demo-capability-card__title {
  color: #101828;
  font-size: 28rpx;
  font-weight: 800;
}

.demo-capability-card__desc {
  margin-top: 12rpx;
  color: #667085;
  font-size: 24rpx;
  line-height: 1.55;
}

.demo-runtime {
  margin-top: 22rpx;
  padding: 28rpx;
  background: #ffffff;
  border: 2rpx solid #d6e4ff;
  border-radius: 26rpx;
  box-shadow: 0 12rpx 28rpx rgba(16, 24, 40, 0.06);
}

.demo-runtime__tabs {
  display: flex;
  padding: 8rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
}

.demo-runtime__tab {
  flex: 1;
  height: 64rpx;
  color: #8c8c8c;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 64rpx;
  text-align: center;
  border-radius: 16rpx;
}

.demo-runtime__tab--active {
  color: #0958d9;
  background: #ffffff;
  box-shadow: 0 8rpx 18rpx rgba(16, 24, 40, 0.08);
}

.demo-runtime__title,
.demo-runtime__desc,
.demo-runtime__meta,
.demo-runtime__result-title,
.demo-runtime__result-desc,
.demo-runtime__error {
  display: block;
}

.demo-runtime__title {
  margin-top: 28rpx;
  color: #101828;
  font-size: 30rpx;
  font-weight: 900;
}

.demo-runtime__desc {
  margin-top: 14rpx;
  color: #667085;
  font-size: 25rpx;
  line-height: 1.5;
}

.demo-runtime__actions {
  display: flex;
  gap: 18rpx;
  margin-top: 26rpx;
}

.demo-runtime__meta {
  margin-top: 20rpx;
  padding: 18rpx 20rpx;
  color: #475467;
  font-size: 23rpx;
  line-height: 1.45;
  background: #f4f8ff;
  border-radius: 16rpx;
}

.demo-runtime__result {
  margin-top: 20rpx;
  padding: 22rpx;
  background: #ffffff;
  border: 2rpx solid #d6e4ff;
  border-radius: 18rpx;
}

.demo-runtime__result-title {
  color: #101828;
  font-size: 26rpx;
  font-weight: 900;
}

.demo-runtime__result-desc {
  margin-top: 8rpx;
  color: #667085;
  font-size: 22rpx;
  line-height: 1.45;
}

.demo-runtime__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 16rpx;
}

.demo-runtime__tag {
  padding: 7rpx 12rpx;
  color: #0958d9;
  font-size: 20rpx;
  font-weight: 800;
  background: #e6f4ff;
  border-radius: 999rpx;
}

.demo-runtime__button {
  flex: 1;
  height: 74rpx;
  margin: 0;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 74rpx;
  background: #1677ff;
  border-radius: 18rpx;
}

.demo-runtime__button--ghost {
  color: #0958d9;
  background: #e6f4ff;
}

.demo-runtime__button--active {
  background: #0958d9;
}

.demo-runtime__error {
  margin-top: 18rpx;
  color: #cf1322;
  font-size: 23rpx;
  line-height: 1.45;
}
</style>
