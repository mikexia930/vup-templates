// Input 组件的类型定义
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps {
  type?: InputType;
  size?: InputSize;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  value?: string | number;
  maxlength?: number;
  minlength?: number;
  clearable?: boolean;
  showPassword?: boolean;
}

export interface InputEmit {
  'update:value': [value: string | number];
  change: [value: string | number];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}
