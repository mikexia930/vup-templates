// Input 组件的命名空间
export namespace Input {
  export type Type = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

  export type Size = 'small' | 'medium' | 'large';

  export interface Props {
    type?: Type;
    size?: Size;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    value?: string | number;
    maxlength?: number;
    minlength?: number;
    clearable?: boolean;
    showPassword?: boolean;
  }

  export interface Emit {
    'update:value': [value: string | number];
    change: [value: string | number];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
  }
}

// 为了向后兼容，也导出非命名空间的类型
export type InputType = Input.Type;
export type InputSize = Input.Size;
export type InputProps = Input.Props;
export type InputEmit = Input.Emit;
