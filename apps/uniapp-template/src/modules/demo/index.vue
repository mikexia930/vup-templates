<script setup lang="ts">
import DemoCapabilityPanel from './components/DemoCapabilityPanel.vue';
import DemoHero from './components/DemoHero.vue';
import DemoLanguageDrawer from './components/DemoLanguageDrawer.vue';
import DemoQuickStart from './components/DemoQuickStart.vue';
import DemoStructure from './components/DemoStructure.vue';
import DemoTopBar from './components/DemoTopBar.vue';
</script>

<template>
  <view class="demo-page">
    <DemoTopBar />
    <DemoHero />
    <DemoQuickStart />
    <DemoCapabilityPanel />
    <DemoStructure />
    <DemoLanguageDrawer />
  </view>
</template>

<style lang="scss" scoped>
.demo-page {
  min-height: 100vh;
  padding-bottom: 150rpx;
  background: #f4f8ff;
  color: #101828;
}
</style>
