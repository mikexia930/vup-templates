import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';

import { UPLOAD_OPTIONS, UPLOAD_REPOSITORY, UPLOAD_STORAGE } from './tokens';
import type { StorageAdapter } from './adapters/storage.adapter';
import type {
  NormalizedUploadOptions,
  UploadFile,
  UploadListResult,
  UploadModuleOptions,
  UploadResult,
} from './types/upload.types';
import type { BaseUploadEntity } from './entities/base.entity';
import type { UploadListQueryDto } from './dto/query.dto';
import { Buffer } from 'node:buffer';

const DEFAULT_OPTIONS: NormalizedUploadOptions = {
  uploadDir: 'uploads',
  baseUrl: '',
  maxSize: 10 * 1024 * 1024,
  allowedTypes: [],
  allowedSuffixes: [],
  scene: 'default',
};

@Injectable()
export class UploadService {
  constructor(
    @Inject(UPLOAD_OPTIONS) private readonly options: UploadModuleOptions,
    @Inject(UPLOAD_REPOSITORY) private readonly repository: Repository<BaseUploadEntity>,
    @Inject(UPLOAD_STORAGE) private readonly storage: StorageAdapter
  ) {}

  async upload(file: UploadFile, scene?: string): Promise<UploadResult> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const options = this.normalizeOptions(this.options, scene);
    this.validateFile(file, options);

    const { path, name } = await this.storage.save(file, options);
    const suffix = this.getSuffix(file.originalname);
    const url = options.baseUrl ? `${options.baseUrl.replace(/\/$/, '')}/${path}` : path;

    const originalName = this.normalizeOriginalName(file.originalname);
    const entity = this.repository.create({
      scene: options.scene,
      path,
      name,
      originalName,
      size: file.size,
      mimeType: file.mimetype,
      suffix,
    });
    const saved = await this.repository.save(entity);
    return this.toResult(saved, url);
  }

  async delete(id: string): Promise<void> {
    const parsedId = this.parseId(id);
    const item = await this.repository.findOne({ where: { id: parsedId } });
    if (!item) {
      throw new NotFoundException('Upload item not found');
    }

    const options = this.normalizeOptions(this.options, item.scene);
    await this.storage.delete(item.path, options);
    await this.repository.delete({ id: parsedId });
  }

  async get(id: string): Promise<UploadResult> {
    const parsedId = this.parseId(id);
    const item = await this.repository.findOne({ where: { id: parsedId } });
    if (!item) {
      throw new NotFoundException('Upload item not found');
    }
    return this.toResult(item);
  }

  async list(query: UploadListQueryDto = {}): Promise<UploadListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const size = Math.max(1, Number(query.size ?? 10));
    const scene = query.scene ? this.normalizeScene(query.scene) : undefined;
    const where = scene ? { scene } : {};
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * size,
      take: size,
    });
    const list = items.map((item) => this.toResult(item));
    return {
      list,
      total,
      page,
      size,
    };
  }

  private normalizeOptions(options: UploadModuleOptions, scene?: string): NormalizedUploadOptions {
    const normalizedScene = this.normalizeScene(scene);
    const globalOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    const sceneOptions = options.scenes?.[normalizedScene] ?? {};
    return {
      ...globalOptions,
      ...sceneOptions,
      allowedTypes: this.normalizeStringArray(
        sceneOptions.allowedTypes ?? globalOptions.allowedTypes ?? DEFAULT_OPTIONS.allowedTypes
      ),
      allowedSuffixes: this.normalizeStringArray(
        sceneOptions.allowedSuffixes ??
          globalOptions.allowedSuffixes ??
          DEFAULT_OPTIONS.allowedSuffixes
      ),
      scene: normalizedScene,
    };
  }

  private normalizeStringArray(value?: string[]): string[] {
    if (!value || value.length === 0) {
      return [];
    }
    return value.filter(Boolean);
  }

  private normalizeScene(scene?: string): string {
    const raw = (scene ?? '').trim();
    if (!raw) {
      return DEFAULT_OPTIONS.scene;
    }
    const sanitized = raw.replace(/[^\w-]/g, '_');
    return sanitized || DEFAULT_OPTIONS.scene;
  }

  private validateFile(file: UploadFile, options: NormalizedUploadOptions) {
    if (options.maxSize && file.size > options.maxSize) {
      throw new BadRequestException('File size exceeds limit');
    }

    if (options.allowedTypes.length > 0 && !options.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type is not allowed');
    }

    if (options.allowedSuffixes.length > 0) {
      const suffix = this.getSuffix(file.originalname);
      const normalized = options.allowedSuffixes.map((item) =>
        item.replace(/^\./, '').toLowerCase()
      );
      if (!normalized.includes(suffix)) {
        throw new BadRequestException('File suffix is not allowed');
      }
    }
  }

  private getSuffix(name: string): string {
    const index = name.lastIndexOf('.');
    return index >= 0 ? name.slice(index + 1).toLowerCase() : '';
  }

  private normalizeOriginalName(name: string): string {
    try {
      const decoded = Buffer.from(name, 'latin1').toString('utf8');
      return decoded || name;
    } catch {
      return name;
    }
  }

  private toResult(item: BaseUploadEntity, urlOverride?: string): UploadResult {
    const options = this.normalizeOptions(this.options, item.scene);
    const url =
      urlOverride ??
      (options.baseUrl ? `${options.baseUrl.replace(/\/$/, '')}/${item.path}` : item.path);
    return {
      id: item.id,
      scene: item.scene,
      path: item.path,
      url,
      name: item.name,
      originalName: item.originalName,
      size: Number(item.size),
      mimeType: item.mimeType,
      suffix: item.suffix,
      createdAt: item.createdAt instanceof Date ? item.createdAt.getTime() : Date.now(),
    };
  }

  private parseId(id: string): number {
    const parsed = Number(id);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      throw new BadRequestException('Invalid upload id');
    }
    return parsed;
  }
}
