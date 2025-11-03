<script setup lang="ts"></script>

<template>
  <div class="flex gap-4 p-4 border-b border-gray-200">
    <a href="/auto/vue" class="text-green-500">自动加载</a>
    <a href="/manual/vue" class="text-green-500">手动加载</a>
  </div>
  <router-view />
</template>
