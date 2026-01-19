import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import type { UploadService } from './upload.service';
import type { UploadListQueryDto, UploadSceneQueryDto } from './dto/query.dto';
import type { UploadFile } from './types/upload.types';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: UploadFile,
    @Query(new ValidationPipe({ transform: true, whitelist: true })) query: UploadSceneQueryDto
  ) {
    return this.uploadService.upload(file, query.scene);
  }

  @Get('list')
  list(@Query(new ValidationPipe({ transform: true, whitelist: true })) query: UploadListQueryDto) {
    return this.uploadService.list(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.uploadService.get(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.delete(id);
  }
}
