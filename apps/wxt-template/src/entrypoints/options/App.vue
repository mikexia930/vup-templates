<script setup lang="ts">
import { ref, onMounted } from 'vue';

const settings = ref({
  enableNotifications: true,
  enableAutoUpdate: true,
  themeColor: 'blue',
});

const saveSettings = () => {
  chrome.storage.sync.set({ settings: settings.value }, () => {
    alert('设置已保存！');
  });
};

const loadSettings = () => {
  chrome.storage.sync.get(['settings'], (result) => {
    if (result.settings) {
      settings.value = { ...settings.value, ...result.settings };
    }
  });
};

const resetSettings = () => {
  settings.value = {
    enableNotifications: true,
    enableAutoUpdate: true,
    themeColor: 'blue',
  };
};

onMounted(() => {
  loadSettings();
});
</script>

<template>
  <div class="options-container">
    <div class="options-header">
      <h1>VUP 1.5x 扩展设置</h1>
      <p>配置您的浏览器扩展</p>
    </div>

    <div class="options-content">
      <div class="settings-section">
        <h2>基本设置</h2>
        <div class="setting-item">
          <label>
            <input v-model="settings.enableNotifications" type="checkbox" />
            启用通知
          </label>
        </div>
        <div class="setting-item">
          <label>
            <input v-model="settings.enableAutoUpdate" type="checkbox" />
            自动更新
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h2>外观设置</h2>
        <div class="setting-item">
          <label>
            主题颜色
            <select v-model="settings.themeColor">
              <option value="blue">蓝色</option>
              <option value="green">绿色</option>
              <option value="purple">紫色</option>
            </select>
          </label>
        </div>
      </div>

      <div class="settings-actions">
        <button class="save-btn" @click="saveSettings">保存设置</button>
        <button class="reset-btn" @click="resetSettings">重置</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@reference "tailwindcss";
.options-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.options-header {
  text-align: center;
  margin-bottom: 40px;
}

.options-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.options-header p {
  color: #666;
}

.options-content {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.settings-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.settings-section:last-of-type {
  border-bottom: none;
}

.settings-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 18px;
}

.setting-item {
  margin-bottom: 15px;
}

.setting-item label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #555;
  cursor: pointer;
}

.setting-item input[type='checkbox'] {
  width: 18px;
  height: 18px;
}

.setting-item select {
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.settings-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.save-btn,
.reset-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.save-btn {
  background: #007bff;
  color: white;
}

.save-btn:hover {
  background: #0056b3;
}

.reset-btn {
  background: #6c757d;
  color: white;
}

.reset-btn:hover {
  background: #545b62;
}
</style>
