<script setup lang="ts">
import { VMessage, VButton } from '@vup/ui';

const handleSuccess = () => {
  VMessage.success('This is a success message');
};

const handleWarning = () => {
  VMessage.warning('This is a warning message');
};

const handleError = () => {
  VMessage.error('This is a error message');
};

const handleInfo = () => {
  VMessage.info('This is a info message');
};
</script>

<template>
  <div>
    <VButton type="success" @click="handleSuccess">Success </VButton>
    <VButton type="warning" @click="handleWarning">Warning </VButton>
    <VButton type="danger" @click="handleError">Error </VButton>
    <VButton type="info" @click="handleInfo">Info </VButton>
  </div>
</template>
