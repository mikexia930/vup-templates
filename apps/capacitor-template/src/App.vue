<template>
  <VMApp>
    <VMRouterOutlet />
  </VMApp>
</template>

<style lang="scss">
:root {
  /* 移动端默认浅色 token（先打底，便于后续扩展主题） */
  --vm-page-bg: #f8fafc;
  --vm-card-radius: 16px;
  --vm-press-opacity: 0.82;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* 预留暗色 token，当前仅做变量定义，不强制切换业务配色 */
    --vm-page-bg: #0f172a;
  }
}

ion-content {
  --background: var(--vm-page-bg);
}

ion-button {
  --opacity: 1;
}

ion-button.ion-activated {
  opacity: var(--vm-press-opacity);
}
</style>
