import { createI18n } from 'vue-i18n';

import enUS from './en-US';
import zhCN from './zh-CN';

export default createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  allowComposition: true,
  globalInjection: true,
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
});
