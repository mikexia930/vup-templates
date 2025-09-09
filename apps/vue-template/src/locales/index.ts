import { createI18n } from 'vue-i18n';

import en_US from './en_US';
import zh_CN from './zh_CN';

export default createI18n({
  legacy: false,
  locale: 'zh_CN',
  fallbackLocale: 'zh_CN',
  allowComposition: true,
  messages: {
    zh_CN,
    en_US,
  },
});
