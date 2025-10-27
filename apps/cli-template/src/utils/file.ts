import fs from 'fs-extra';
import path from 'node:path';

export default class FileManager {
  static async ensureDir(dirPath: string): Promise<void> {
    await fs.ensureDir(dirPath);
  }

  static async writeFile(filePath: string, content: string): Promise<void> {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf-8');
  }

  static async exists(filePath: string): Promise<boolean> {
    return fs.pathExists(filePath);
  }

  static async copy(src: string, dest: string): Promise<void> {
    await fs.copy(src, dest);
  }

  static async remove(filePath: string): Promise<void> {
    await fs.remove(filePath);
  }

  static join(...paths: string[]): string {
    return path.join(...paths);
  }

  static resolve(...paths: string[]): string {
    return path.resolve(...paths);
  }

  static basename(filePath: string): string {
    return path.basename(filePath);
  }

  static async readFile(filePath: string): Promise<string> {
    return fs.readFile(filePath, 'utf-8');
  }

  static async readdir(filePath: string): Promise<string[]> {
    return fs.readdir(filePath);
  }

  static async stat(filePath: string): Promise<fs.Stats> {
    return fs.stat(filePath);
  }
}
