<script setup lang="ts"></script>

<template>
  <div class="flex gap-4 border-b border-gray-200 p-4">
    <a href="/auto/" class="text-green-500">自动加载</a>
    <a href="/manual/" class="text-green-500">手动加载</a>
  </div>
  <router-view />
</template>
