export interface VSelectOptionProps {
  label: string;
  value: string;
  disabled?: boolean;
  children?: VSelectOptionProps[];
}

export interface VSelectProps {
  options: VSelectOptionProps[];
}
