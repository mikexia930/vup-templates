// 导入多语言 JSON 文件
import zhCN from './zh-CN.json';
import enUS from './en-US.json';

// 多语言内容定义
export const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// 多语言工具函数
export function createI18n(lang: string) {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages[lang as keyof typeof messages] || messages['zh-CN'];
    for (const k of keys) {
      value = value?.[k as keyof typeof value];
    }
    return value || key;
  };

  return { t };
}
