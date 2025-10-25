<script setup lang="ts"></script>

<template>
  <section class="p-6 space-y-4">
    <header>
      <h1 class="text-xl font-semibold">自动加载示例</h1>
      <p class="text-sm text-gray-500">
        访问 <code>/auto/vue</code> 时会根据 activeRule 自动挂载子应用；切换到其它路由时自动卸载。
      </p>
    </header>
    <div
      id="auto-app-container"
      class="min-h-[400px] rounded border border-dashed border-gray-300 bg-white"
    >
      <!-- qiankun 会自动在这里创建 Shadow DOM 和 #app 容器 -->
    </div>
  </section>
</template>
