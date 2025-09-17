<template>
  <div>1-{{ t('hello') }}</div>
  <div>
    <!-- 测试 forms 插件 -->
    <form class="space-y-4">
      <input type="text" placeholder="测试输入框" class="form-input w-full" />
      <select class="form-select w-full">
        <option>选项1</option>
        <option>选项2</option>
      </select>
      <textarea placeholder="测试文本域" class="form-textarea w-full"></textarea>
      <button class="form-button bg-blue-500 text-white px-4 py-2">提交按钮</button>
    </form>
  </div>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

console.log('Index');
</script>
