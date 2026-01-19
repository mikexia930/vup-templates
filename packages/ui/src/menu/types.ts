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
  icon?: VMenuIconProps;
  disabled?: boolean;
  group?: VMenuGroupProps;
  children?: VMenuItemProps[];
}

export interface VMenuIconProps {
  type: 'iconfont' | 'icon';
  name: string;
}
