// 导出组件（作为类型）
export interface InputComponent {
  (props: any): any;
}

// 这里我们只导出组件类型，具体的 props 类型在单独的 .d.ts 文件中
export const Input: InputComponent = {} as any;

// 默认导出
export default Input;
