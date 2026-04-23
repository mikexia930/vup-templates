<script setup lang="ts">
import { computed } from 'vue';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

const modeLabel = computed(() =>
  qiankunWindow.__POWERED_BY_QIANKUN__ ? 'Mounted by host app' : 'Running standalone'
);
</script>

<template>
  <main class="page">
    <section class="card">
      <p class="eyebrow">Example / qiankun</p>
      <h1>qiankun sub-app example</h1>
      <p class="lead">
        This example keeps only the child-app lifecycle needed by <code>vite-plugin-qiankun</code>
        and removes unrelated mock or PWA behavior.
      </p>

      <ul class="facts">
        <li><strong>Mode:</strong> {{ modeLabel }}</li>
        <li><strong>Purpose:</strong> verify child mount / unmount integration</li>
        <li><strong>Route shape:</strong> one intro page only</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  background:
    radial-gradient(circle at top right, rgba(16, 185, 129, 0.16), transparent 28%),
    linear-gradient(180deg, #ecfdf5 0%, #f8fafc 100%);
}

.card {
  width: min(760px, 100%);
  padding: 32px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #059669;
}

h1 {
  margin: 0;
  font-size: 36px;
  line-height: 1.1;
  color: #0f172a;
}

.lead {
  margin: 16px 0 0;
  color: #334155;
  line-height: 1.7;
}

.facts {
  margin: 24px 0 0;
  padding-left: 20px;
  color: #0f172a;
  line-height: 1.8;
}
</style>
