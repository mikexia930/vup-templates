import type { UploadFile, NormalizedUploadOptions } from '../types/upload.types';

export interface StorageAdapter {
  save: (
    file: UploadFile,
    options: NormalizedUploadOptions
  ) => Promise<{ path: string; name: string }>;
  delete: (filePath: string, options: NormalizedUploadOptions) => Promise<void>;
}
