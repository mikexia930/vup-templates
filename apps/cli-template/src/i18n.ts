import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

const __dirname = dirname(fileURLToPath(import.meta.url));

const initI18n = async () => {
  // 获取语言设置，支持多种格式
  let language = process.env.LANG || process.env.LANGUAGE || 'zh-CN';

  // 处理语言代码格式
  if (language.includes('.')) {
    language = language.split('.')[0] || 'zh-CN';
  }

  // 映射语言代码
  const languageMap: Record<string, string> = {
    zh: 'zh-CN',
    'zh-CN': 'zh-CN',
    zh_CN: 'zh-CN',
    en: 'en-US',
    'en-US': 'en-US',
    en_US: 'en-US',
  };

  const finalLanguage = languageMap[language] || 'zh-CN';

  try {
    await i18next.use(Backend).init({
      lng: finalLanguage,
      fallbackLng: 'en-US',
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
