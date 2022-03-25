// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader, BoxProps } from '@mui/material';
//
import { NavListRoot } from './NavList';
import { NavSectionItem } from '../types';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  })
);

// ----------------------------------------------------------------------

export interface NavSectionVerticalProps extends BoxProps {
  isCollapse?: boolean;
  navConfig: Array<NavSectionItem>;
  [key: string]: any;
}

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }: NavSectionVerticalProps) {
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </List>
      ))}
    </Box>
  );
}
