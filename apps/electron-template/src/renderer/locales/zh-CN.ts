import common from './common/zh-CN';

const modules = import.meta.glob('../modules/*/locales/zh-CN.ts', {
  eager: true,
  import: 'default',
}) as Record<string, Record<string, any>>;

const moduleMessages: Record<string, any> = {};
for (const path in modules) {
  const name = path.match(/modules\/([^/]+)\/locales/)?.[1];
  if (name) moduleMessages[name] = modules[path];
}

export default {
  common,
  ...moduleMessages,
};
