import { createWriteStream } from 'node:fs';
import { mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

import type { StorageAdapter } from './storage.adapter';
import type { NormalizedUploadOptions, UploadFile } from '../types/upload.types';

export class LocalStorageAdapter implements StorageAdapter {
  async save(
    file: UploadFile,
    options: NormalizedUploadOptions
  ): Promise<{ path: string; name: string }> {
    const scene = options.scene || 'default';
    const date = this.formatDate(new Date());
    const ext = path.extname(file.originalname || '').toLowerCase();
    const name = `${randomUUID().replace(/-/g, '')}${ext}`;
    const relativePath = path.posix.join(scene, date, name);
    const fullPath = path.resolve(options.uploadDir, relativePath);
    await mkdir(path.dirname(fullPath), { recursive: true });

    if (file.buffer && file.buffer.length > 0) {
      await writeFile(fullPath, file.buffer);
    } else if (file.path) {
      await rename(file.path, fullPath);
    } else if (file.stream) {
      await pipeline(file.stream, createWriteStream(fullPath));
    } else {
      throw new Error('Upload file data is empty');
    }

    return { path: relativePath, name };
  }

  async delete(filePath: string, options: NormalizedUploadOptions): Promise<void> {
    const fullPath = path.resolve(options.uploadDir, filePath);
    try {
      await unlink(fullPath);
    } catch (error) {
      if (this.isFileNotFound(error)) {
        return;
      }
      throw error;
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private isFileNotFound(error: unknown): boolean {
    return Boolean(
      error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT'
    );
  }
}
