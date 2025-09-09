<template>
  <div>
    <div>params: {{ id }}</div>
    <div>count: {{ content.count }}</div>
    <button @click="content.increment">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { storeContent } from './stores/content';
const route = useRoute();
const { id } = route.params;
const content = storeContent();
console.log(content);
</script>
