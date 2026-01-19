import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UploadSceneQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  scene?: string;
}

export class UploadListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  scene?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size?: number;
}
