import { Entity } from 'typeorm';

import { BaseUploadEntity } from './base.entity';

@Entity('upload_files')
export class UploadFileEntity extends BaseUploadEntity {}
