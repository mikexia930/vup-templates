import type { EntityTarget } from 'typeorm';
import type { BaseUploadEntity } from '../entities/base.entity';

export type UploadFile = Express.Multer.File;

export interface UploadCoreOptions {
  uploadDir: string;
  baseUrl: string;
  maxSize: number;
  allowedTypes: string[];
  allowedSuffixes: string[];
}

export interface UploadModuleOptions extends Partial<UploadCoreOptions> {
  entity?: EntityTarget<BaseUploadEntity>;
  scenes?: Record<string, Partial<UploadCoreOptions>>;
}

export interface NormalizedUploadOptions extends UploadCoreOptions {
  scene: string;
}

export interface UploadResult {
  id: number;
  scene: string;
  path: string;
  url: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  suffix: string;
  createdAt: number;
}

export interface UploadListResult {
  list: UploadResult[];
  total: number;
  page: number;
  size: number;
}
