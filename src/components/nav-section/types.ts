export interface NavSubMenuItemProps {
  path: string;
  title: string;
  icon?: any;
  info?: any;
  children?: Array<NavSubMenuItemProps>;
}

export interface NavSubMenuProps {
  subheader?: string;
  items: Array<NavSubMenuItemProps>;
}

export interface INavMenuItem {
  path: string;
  title: string;
  icon?: any;
  info?: any;
  children?: Array<NavSubMenuItemProps>;
}

export interface NavSectionItem {
  subheader: string;
  items: Array<INavMenuItem>;
}
