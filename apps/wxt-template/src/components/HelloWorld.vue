<script lang="ts" setup>
defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">1-Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">
    Click on the <span class="read-the-docs2">WXT</span> and
    <span class="read-the-docs2">Vue</span> logos to learn more
  </p>
</template>

<style lang="scss" scoped>
.read-the-docs {
  @apply text-red-800;

  .read-the-docs2 {
    @apply text-blue-800;
  }
}
</style>
