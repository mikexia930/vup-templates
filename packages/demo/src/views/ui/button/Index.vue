<script setup lang="ts">
import { VButton } from '@vup/ui';
</script>

<template>
  <div class="flex gap-2">
    <VButton>Default</VButton>
    <VButton type="primary">Primary</VButton>
    <VButton type="success">Success</VButton>
    <VButton type="warning">Warning</VButton>
    <VButton type="danger">Danger</VButton>
    <VButton type="info">Info</VButton>
    <VButton type="text">Text</VButton>
    <VButton type="link">Link</VButton>
  </div>
</template>
