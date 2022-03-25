import React, { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, List, Link, Drawer, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
// config
import { NAVBAR } from '../../config';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { IconButtonAnimate } from '../../components/animate';
import { NavSectionVertical } from '../../components/nav-section';
import { NavSectionItem } from 'src/components/nav-section/types';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)<{[key: string]: any}>(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

export interface MenuMobileProps {
  isOffset: boolean;
  isHome: boolean;
  navConfig: IMenuMobileItem[];
};

export default function MenuMobile({ isOffset, isHome, navConfig }: MenuMobileProps) {
  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
  }, [pathname]);

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

export interface IMenuMobileItem {
  children?: NavSectionItem[];
  icon?: any;
  path: string;
  title: string;
}

export interface MenuMobileItemProps {
  isOpen: boolean;
  item: IMenuMobileItem;
  onOpen?: React.MouseEventHandler;
}

function MenuMobileItem({ item, isOpen, onOpen }: MenuMobileItemProps) {
  const { pathname } = useRouter();
  const { title, path, icon, children } = item;

  const isActive = pathname === path;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSectionVertical
              navConfig={children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  height: 200,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage:
                    'url(https://minimal-assets-api.vercel.app/assets/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === 'Documentation') {
    return (
      <ListItemStyle component={Link} href={path ?? '#'} target="_blank" rel="noopener">
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ListItemStyle
        sx={{
          ...(isActive && {
            color: 'primary.main',
            fontWeight: 'fontWeightMedium',
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
          }),
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </NextLink>
  );
}
