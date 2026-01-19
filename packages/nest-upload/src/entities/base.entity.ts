import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseUploadEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 64 })
  scene!: string;

  @Column({ length: 512 })
  path!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ name: 'original_name', length: 255 })
  originalName!: string;

  @Column({ type: 'bigint' })
  size!: number;

  @Column({ name: 'mime_type', length: 128 })
  mimeType!: string;

  @Column({ length: 32 })
  suffix!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
