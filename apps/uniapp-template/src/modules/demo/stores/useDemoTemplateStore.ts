/**
 * Demo 模块示例 store
 *
 * 演示标准模式：state + computed + action + loading/error 状态。
 * 实际项目按业务复制此结构即可。
 *
 * 注意：defineStore / ref / computed 已通过 unplugin-auto-import 自动注入，无需 import。
 */
import { fetchTemplateInfo, submitTemplateFeedback } from '../api/template';
import type { TemplateFeedback, TemplateInfo } from '../types/template';

export const useDemoTemplateStore = defineStore('demo-template', () => {
  // ---------- state ----------
  const info = ref<TemplateInfo | null>(null);
  const isLoading = ref(false);
  const isSubmitting = ref(false);
  const errorMessage = ref('');
  const hasLoaded = ref(false);

  // ---------- computed ----------
  const platforms = computed(() => info.value?.platforms ?? []);
  const isReady = computed(() => hasLoaded.value && info.value !== null);

  // ---------- actions ----------
  async function loadInfo() {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      info.value = await fetchTemplateInfo();
      hasLoaded.value = true;
    } catch (error) {
      info.value = null;
      errorMessage.value = error instanceof Error ? error.message : '模板信息加载失败';
    } finally {
      isLoading.value = false;
    }
  }

  async function submitFeedback(payload: TemplateFeedback) {
    if (isSubmitting.value) return null;

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      const result = await submitTemplateFeedback(payload);
      return result;
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '反馈提交失败';
      return null;
    } finally {
      isSubmitting.value = false;
    }
  }

  function reset() {
    info.value = null;
    errorMessage.value = '';
    hasLoaded.value = false;
  }

  return {
    // state
    info,
    isLoading,
    isSubmitting,
    errorMessage,
    hasLoaded,
    // computed
    platforms,
    isReady,
    // actions
    loadInfo,
    submitFeedback,
    reset,
  };
});
