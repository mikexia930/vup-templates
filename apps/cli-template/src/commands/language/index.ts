import prompts from 'prompts';
import i18next from '../../i18n';
import Logger from '../../utils/logger';

const LANGUAGES = [
  { title: 'English', value: 'en_US' },
  { title: '中文', value: 'zh_CN' },
];
/**
 * 处理语言切换
 * @returns 操作类型和新的语言
 */
async function handleSelectLanguage(): Promise<string> {
  const response = await prompts({
    type: 'select',
    name: 'lang',
    message: i18next.t('action.select'),
    choices: LANGUAGES,
  });
  return response.lang;
}

// 显示可用语言
function showAvailableLanguages() {
  const availableLanguages = LANGUAGES.map((lang) => lang.title).join(', ');
  Logger.info(`${i18next.t('language.current')}: ${i18next.language}`);
  Logger.info(`${i18next.t('language.available')}: ${availableLanguages}`);
}

export default async function languageCommand(options: { current?: boolean; reset?: boolean }) {
  if (options.current) {
    showAvailableLanguages();
  } else if (options.reset) {
    const selectedLang = await handleSelectLanguage();
    if (selectedLang) {
      try {
        // 等待语言切换完成
        await i18next.changeLanguage(selectedLang);
        await i18next.reloadResources(selectedLang);
        Logger.success(`${i18next.t('language.success', { lang: selectedLang })}`);
      } catch (error) {
        Logger.error(
          `${i18next.t('language.failed', { message: error instanceof Error ? error.message : String(error) })}`
        );
      }
    }
  } else {
    showAvailableLanguages();
  }
}
