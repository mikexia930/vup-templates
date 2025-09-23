import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN';
import enUS from './en-US';

// 获取系统语言
const getSystemLocale = () => {
  // #ifdef H5
  const h5Lang = navigator.language || 'en-US';
  return h5Lang.startsWith('zh') ? 'zh-CN' : 'en-US';
  // #endif

  // #ifndef H5
  const systemInfo = uni.getSystemInfoSync();
  const uniLang = systemInfo.language || 'zh-CN';
  return uniLang.startsWith('zh') ? 'zh-CN' : 'en-US';
  // #endif
};

// 从本地存储获取用户设置的语言
const getStoredLocale = () => {
  try {
    // #ifdef H5
    return localStorage.getItem('locale') || getSystemLocale();
    // #endif

    // #ifndef H5
    return uni.getStorageSync('locale') || getSystemLocale();
    // #endif
  } catch (error) {
    return getSystemLocale();
  }
};

// 保存语言设置到本地存储
export const setStoredLocale = (locale: string) => {
  try {
    // #ifdef H5
    localStorage.setItem('locale', locale);
    // #endif

    // #ifndef H5
    uni.setStorageSync('locale', locale);
    // #endif
  } catch (error) {
    console.warn('Failed to save locale:', error);
  }
};

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getStoredLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
});

// 语言切换函数
export const switchLanguage = (locale: string) => {
  i18n.global.locale.value = locale;
  setStoredLocale(locale);
};

// 获取当前语言
export const getCurrentLocale = () => {
  return i18n.global.locale.value;
};

export default i18n;
