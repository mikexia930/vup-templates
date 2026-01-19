# @vup/nest-upload

一个可在 monorepo 内复用的 NestJS 上传模块，默认使用本地存储，提供
`Service + Controller` 的最小可用封装。

## 安装与使用（monorepo）

在业务模块中引入：

```ts
import { UploadModule } from '@vup/nest-upload';

@Module({
  imports: [
    UploadModule.forRoot({
      uploadDir: 'uploads',
      baseUrl: 'https://your-domain.com/uploads',
      maxSize: 10 * 1024 * 1024,
      allowedSuffixes: ['png', 'jpg', 'jpeg'],
      scenes: {
        avatar: {
          maxSize: 2 * 1024 * 1024,
          allowedTypes: ['image/png', 'image/jpeg'],
        },
        video: { maxSize: 500 * 1024 * 1024, allowedTypes: ['video/mp4'] },
      },
    }),
  ],
})
export class AppModule {}
```

`uploadDir` 是文件保存的根目录，最终路径结构为：

```
{uploadDir}/{scene}/{YYYY-MM-DD}/{filename}
```

当未传 `scene` 时使用默认 `default`。

## 配置项

`UploadModuleOptions`

- `uploadDir`：上传目录（默认 `uploads`）
- `baseUrl`：访问前缀（用于拼接 `url`）
- `maxSize`：最大文件大小（字节）
- `allowedTypes`：允许的 MIME 类型
- `allowedSuffixes`：允许的文件后缀（不带点）
- `scenes`：场景级配置覆盖（如 `avatar` / `video`）

## HTTP 接口

默认提供以下路由：

- `POST /upload`：上传（字段名 `file`，可选 `?scene=avatar`）
- `GET /upload/list`：分页列表（可选 `?scene=avatar`）
- `GET /upload/:id`：详情
- `DELETE /upload/:id`：删除

## 数据库与 Entity

默认内置 `UploadFileEntity`（表名
`vup_upload_files`）。如果你需要自定义字段，可以在业务项目中继承
`BaseUploadEntity`：

```ts
import { BaseUploadEntity } from '@vup/nest-upload';
import { Column, Entity } from 'typeorm';

@Entity('custom_upload_files')
export class CustomUploadEntity extends BaseUploadEntity {
  @Column({ name: 'biz_type', length: 64 })
  bizType!: string;
}
```

然后在 `UploadModule` 配置里指定：

```ts
UploadModule.forRoot({
  entity: CustomUploadEntity,
});
```

注意：TypeORM 需要在业务项目的 `TypeOrmModule.forRoot` 中注册该实体。

## 开箱即用示例

```ts
@Module({
  imports: [
    UploadModule.forRoot({
      uploadDir: 'uploads',
      baseUrl: 'http://localhost:3000/uploads',
    }),
  ],
})
export class AppModule {}
```

上传请求：

```
POST /upload?scene=avatar
```

## 扩展表结构示例

```ts
@Entity('biz_upload_files')
export class BizUploadEntity extends BaseUploadEntity {
  @Column({ name: 'biz_id', length: 64 })
  bizId!: string;
}

UploadModule.forRoot({
  entity: BizUploadEntity,
});
```

## 设计说明

- 默认 `LocalStorageAdapter`，先满足本地存储需求
- 使用 TypeORM Repository 读写数据库（需业务项目配置 TypeOrmModule）

## 导出内容

```ts
export { UploadModule } from './upload.module';
export { UploadService } from './upload.service';
export { UploadController } from './upload.controller';
export type {
  UploadListResult,
  UploadModuleOptions,
  UploadResult,
} from './types/upload.types';
```
