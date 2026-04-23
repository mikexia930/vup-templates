<script setup lang="ts">
import { computed } from 'vue';

const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  Boolean((navigator as Navigator & { standalone?: boolean }).standalone);

const modeLabel = computed(() => (isStandalone ? 'Standalone / installed mode' : 'Browser tab'));
</script>

<template>
  <main class="page">
    <section class="card">
      <p class="eyebrow">Example / PWA</p>
      <h1>PWA example</h1>
      <p class="lead">
        This example keeps the setup focused on <code>@vup/pwa</code>: build output generation and
        runtime registration in production.
      </p>

      <ul class="facts">
        <li>
          <strong>Build output:</strong> generates <code>manifest.webmanifest</code> and
          <code>sw.js</code>
        </li>
        <li><strong>Runtime:</strong> registers the service worker in production only</li>
        <li><strong>Current mode:</strong> {{ modeLabel }}</li>
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
    radial-gradient(circle at top, rgba(14, 165, 233, 0.16), transparent 30%),
    linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
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
  color: #0284c7;
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
