import chalk from 'chalk';

export default class Logger {
  static info(message: string) {
    console.log(chalk.blue('ℹ', message));
  }

  static error(message: string) {
    console.log(chalk.red('✗', message));
  }

  static success(message: string) {
    console.log(chalk.green('✓', message));
  }

  static warning(message: string) {
    console.log(chalk.yellow('⚠', message));
  }

  static step(message: string): void {
    console.log(chalk.cyan('→', message));
  }
}
