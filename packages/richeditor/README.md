# @vup/richeditor

基于 WangEditor 的富文本编辑器封装。

WangEditor 官网：https://www.wangeditor.com/

## 安装

```bash
pnpm add @vup/richeditor
```

## 使用方式

```vue
<script setup lang="ts">
import { VRichEditor } from '@vup/richeditor';
</script>

<template>
  <VRichEditor v-model="content" />
</template>
```

## 注意事项

- 该包依赖 `@vup/ui`，并通过 `peerDependencies` 约束 WangEditor 版本。
- 具体 API 与扩展能力请参考 WangEditor 官方文档。
