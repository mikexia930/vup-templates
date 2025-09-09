---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'My Awesome Project'
  text: 'A VitePress Site'
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

## Tailwind CSS 集成示例

<div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg mb-8">
  <h2 class="text-3xl font-bold mb-4">🎉 Tailwind CSS 已成功集成！</h2>
  <p class="text-lg opacity-90">现在您可以在 VitePress 中使用所有 Tailwind CSS 的工具类了。</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h3 class="text-xl font-semibold mb-3 text-gray-800">响应式网格</h3>
    <p class="text-gray-600">使用 <code class="bg-gray-100 px-2 py-1 rounded text-sm">grid-cols-1 md:grid-cols-2</code> 创建响应式布局</p>
  </div>
  
  <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h3 class="text-xl font-semibold mb-3 text-gray-800">实用工具类</h3>
    <p class="text-gray-600">快速应用间距、颜色、字体大小等样式</p>
  </div>
</div>

<div class="flex flex-wrap gap-4 justify-center">
  <span class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">蓝色标签</span>
  <span class="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">绿色标签</span>
  <span class="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">紫色标签</span>
</div>

## Tailwind 组件演示

<TailwindDemo />
