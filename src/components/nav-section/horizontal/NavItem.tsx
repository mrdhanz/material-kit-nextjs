import React, { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link } from '@mui/material';
// config
import { ICON } from '../../../config';
//
import Iconify from '../../Iconify';
import { ListItemStyle } from './style';
import { isExternalLink } from '..';
import { INavMenuItem, NavSubMenuItemProps } from '../types';

// ----------------------------------------------------------------------

export interface NavItemRootProps {
  active?: boolean;
  open?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  item: INavMenuItem;
  [key: string]: any;
}

export const NavItemRoot = forwardRef<HTMLButtonElement, NavItemRootProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent icon={icon} title={title} children={children} />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    ) : (
      <NextLink href={path}>
        <ListItemStyle activeRoot={active}>
          <NavItemContent icon={icon} title={title} children={children} />
        </ListItemStyle>
      </NextLink>
    );
  }
);
// ----------------------------------------------------------------------

export interface NavItemSubProps {
  item: NavSubMenuItemProps;
  active?: boolean;
  open?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

export const NavItemSub = forwardRef<HTMLButtonElement, NavItemSubProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent icon={icon} title={title} children={children} subItem />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle subItem href={path} disableRipple rel="noopener" target="_blank" component={Link}>
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    ) : (
      <NextLink href={path}>
        <ListItemStyle disableRipple activeSub={active} subItem>
          <NavItemContent icon={icon} title={title} children={children} subItem />
        </ListItemStyle>
      </NextLink>
    );
  }
);
// ----------------------------------------------------------------------

export interface NavItemContentProps {
  children?: Array<NavSubMenuItemProps>;
  icon?: string;
  subItem?: boolean;
  title?: string;
}
function NavItemContent({ icon, title, children, subItem }: NavItemContentProps) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
