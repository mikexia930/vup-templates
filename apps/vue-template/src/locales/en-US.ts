// 1. 全局共享文案
import common from './common/en-US';

// 2. 各模块文案（自动扫描，新增模块零改动）
const modules = import.meta.glob('../modules/*/locales/en-US.ts', {
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
