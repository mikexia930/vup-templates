import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { LocalStorageAdapter } from './adapters/local.adapter';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadFileEntity } from './entities/upload.entity';
import { UPLOAD_OPTIONS, UPLOAD_REPOSITORY, UPLOAD_STORAGE } from './tokens';
import type { UploadModuleOptions } from './types/upload.types';

@Module({})
export class UploadModule {
  static forRoot(options: UploadModuleOptions = {}): DynamicModule {
    return {
      module: UploadModule,
      providers: [
        { provide: UPLOAD_OPTIONS, useValue: options },
        {
          provide: UPLOAD_REPOSITORY,
          useFactory: (dataSource: DataSource, moduleOptions: UploadModuleOptions) => {
            const entity = moduleOptions.entity ?? UploadFileEntity;
            return dataSource.getRepository(entity);
          },
          inject: [DataSource, UPLOAD_OPTIONS],
        },
        { provide: UPLOAD_STORAGE, useClass: LocalStorageAdapter },
        UploadService,
      ],
      controllers: [UploadController],
      exports: [UploadService],
    };
  }
}
