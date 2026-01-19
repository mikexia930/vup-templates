export enum EFileType {
  IMAGE = 'image',
  MEDIA = 'media',
  FILE = 'file',
}

export const VFileTypeSuffixes = {
  [EFileType.IMAGE]: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
  [EFileType.MEDIA]: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mp3'],
  [EFileType.FILE]: [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'txt',
    'csv',
    'zip',
    'rar',
  ],
};

export interface IFileSelectItem {
  id: number;
  path: string;
  name: string;
  originalName: string;
  size: number;
  uploadType: EFileType;
  suffix: string;
}

export interface VFileProps {
  type: EFileType;
  suffixes: string[];
  limit?: number;
  selected: IFileSelectItem[];
  list: IFileSelectItem[];
  pagination: {
    total: number;
    size: number;
    page: number;
  };
}
