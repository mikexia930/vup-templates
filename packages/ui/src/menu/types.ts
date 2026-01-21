import type { RouteLocationRaw } from 'vue-router';

export interface VMenuProps {
  menus: VMenuItemProps[];
}

export interface VMenuGroupProps {
  label: string;
  items: VMenuItemProps[];
}

export interface VMenuItemProps {
  key: string;
  label: string;
  path?: RouteLocationRaw;
  icon?: string;
  disabled?: boolean;
  group?: VMenuGroupProps;
  children?: VMenuItemProps[];
}
