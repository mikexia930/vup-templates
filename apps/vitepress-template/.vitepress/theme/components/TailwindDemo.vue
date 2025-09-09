<template>
  <div class="tailwind-demo">
    <div class="max-w-4xl mx-auto p-8">
      <h2 class="text-3xl font-bold text-center mb-8 text-gradient text-red-800">
        Tailwind CSS 在 VitePress 中的使用示例
      </h2>
      
      <!-- 卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="card hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-white text-xl">🎨</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">响应式设计</h3>
          <p class="text-gray-600">使用 Tailwind 的响应式工具类轻松创建适配不同屏幕的布局</p>
        </div>
        
        <div class="card hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-white text-xl">⚡</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">快速开发</h3>
          <p class="text-gray-600">通过实用优先的 CSS 框架快速构建现代化的用户界面</p>
        </div>
        
        <div class="card hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-white text-xl">🔧</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">高度可定制</h3>
          <p class="text-gray-600">轻松扩展和自定义 Tailwind 的默认主题配置</p>
        </div>
      </div>
      
      <!-- 按钮示例 -->
      <div class="flex flex-wrap gap-4 justify-center mb-8">
        <button class="btn-primary">主要按钮</button>
        <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
          次要按钮
        </button>
        <button class="border-2 border-vp-brand text-vp-brand px-4 py-2 rounded-lg hover:bg-vp-brand hover:text-white transition-colors">
          边框按钮
        </button>
      </div>
      
      <!-- 代码示例 -->
      <div class="bg-gray-900 text-gray-100 p-6 rounded-lg mb-8">
        <h4 class="text-lg font-semibold mb-4 text-green-400">使用示例：</h4>
        <pre class="text-sm"><code>&lt;div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"&gt;
  &lt;h3 class="text-xl font-bold text-gray-800"&gt;标题&lt;/h3&gt;
  &lt;span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"&gt;
    标签
  &lt;/span&gt;
&lt;/div&gt;</code></pre>
      </div>
      
      <!-- 状态指示器 -->
      <div class="flex items-center justify-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-600">成功</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span class="text-sm text-gray-600">警告</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-red-500 rounded-full"></div>
          <span class="text-sm text-gray-600">错误</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加组件逻辑
</script>

<style scoped>
/* 如果需要，可以在这里添加额外的样式 */
</style>
