<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from 'vue';

import { EditorMode } from './types';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    mode?: EditorMode;
    excludeKeys?: string[];
  }>(),
  {
    mode: EditorMode.DEFAULT,
    excludeKeys: () => [],
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// --- 编辑器 ---
const Editor = shallowRef();
const Toolbar = shallowRef();
const isReady = ref(false);

onMounted(async () => {
  // @ts-expect-error 第三方组件类型错误
  await import('@wangeditor/editor/dist/css/style.css');
  // @ts-expect-error 第三方组件类型错误
  const wangEditor = await import('@wangeditor/editor-for-vue');

  Editor.value = wangEditor.Editor;
  Toolbar.value = wangEditor.Toolbar;

  await nextTick();
  isReady.value = true;
});

// 内容 HTML
const editorRef = shallowRef();

const toolbarConfig = {
  excludeKeys: props.excludeKeys,
};

const editorConfig = {
  placeholder: '',
  MENU_CONF: {
    uploadImage: {},
    uploadVideo: {},
  },
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor;
  const htmlValue = props.modelValue || '';
  if (htmlValue && typeof htmlValue === 'string') {
    try {
      editor.setHtml(htmlValue);
    } catch (error) {
      try {
        editor.dangerouslyInsertHtml(htmlValue);
      } catch (error2) {
        console.error('HTML DANGEROUSLY INSERT ERROR!', error2);
      }
    }
  }
};

const handleChange = (editor: any) => {
  if (!editor) return;
  try {
    const html = editor.getHtml();
    if (typeof html === 'string') {
      emit('update:modelValue', html);
    }
  } catch (error) {
    console.error('HTML GET ERROR!', error);
  }
};
</script>

<template>
  <div v-if="isReady">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>
