import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { join } from 'path';

const initI18n = async () => {
  // 获取语言设置，支持多种格式
  let language = process.env.LANG || process.env.LANGUAGE || 'zh_CN';

  // 处理语言代码格式
  if (language.includes('.')) {
    language = language.split('.')[0] || 'zh_CN';
  }

  // 映射语言代码
  const languageMap: Record<string, string> = {
    zh: 'zh_CN',
    'zh-CN': 'zh_CN',
    zh_CN: 'zh_CN',
    en: 'en_US',
    'en-US': 'en_US',
    en_US: 'en_US',
  };

  const finalLanguage = languageMap[language] || 'zh_CN';

  try {
    await i18next.use(Backend).init({
      lng: finalLanguage,
      fallbackLng: 'en_US',
      ns: ['common'],
      defaultNS: 'common',
      backend: {
        loadPath: join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
      },
      interpolation: {
        escapeValue: false,
      },
      debug: false,
    });
  } catch (error) {
    console.error('i18n initialization error:', error);
    throw error;
  }
};

export { initI18n };
export default i18next;
