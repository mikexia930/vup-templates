#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';
import languageCommand from './commands/language';
import i18next, { initI18n } from './i18n';
import Logger from './utils/logger';

async function main() {
  // 初始化 i18n
  await initI18n();

  const program = new Command();

  // 自定义错误处理
  program.exitOverride((err) => {
    if (err.code === 'commander.missingArgument') {
      // 从错误消息中提取参数名
      const match = err.message.match(/missing required argument '(\w+)'/);
      const argName = match ? match[1] : 'name';
      Logger.error(i18next.t('error.missingArgument', { arg: argName }));
      process.exit(1);
    } else if (err.code === 'commander.unknownCommand') {
      const cmd = err.message.split(' ')[1] || 'unknown';
      Logger.error(i18next.t('error.unknownCommand', { cmd }));
      process.exit(1);
    } else if (err.code === 'commander.unknownOption') {
      const option = err.message.split(' ')[1] || 'unknown';
      Logger.error(i18next.t('error.unknownOption', { option }));
      process.exit(1);
    } else if (err.code === 'commander.version' || err.code === 'commander.helpDisplayed') {
      // 版本输出和帮助输出是正常的，不需要显示错误
      process.exit(0);
    } else {
      Logger.error(err.message);
      process.exit(1);
    }
  });

  // 版本号
  program.version(version, '-v, --version').description(i18next.t('version.description'));

  // 语言设置
  program
    .command('language')
    .description(i18next.t('language.description'))
    .option('-c, --current', i18next.t('language.options.current'))
    .option('-r, --reset', i18next.t('language.options.reset'))
    .action(languageCommand);

  program.parse();
}

main().catch((error) => {
  console.error('Main function error:', error);
  console.error('Error stack:', error.stack);
});
