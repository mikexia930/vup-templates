import { createI18n } from 'vue-i18n';

import en_US from './en_US';
import zh_CN from './zh_CN';

export default createI18n({
  legacy: false,
  locale: 'en_US',
  fallbackLocale: 'en_US',
  allowComposition: true,
  globalInjection: true,
  messages: {
    en_US,
    zh_CN,
  },
});
