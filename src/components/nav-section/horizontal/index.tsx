import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Stack } from '@mui/material';
//
import { NavListRoot } from './NavList';
import { NavSectionItem } from '../types';

// ----------------------------------------------------------------------
export interface NavSectionHorizontalProps {
  navConfig: NavSectionItem[];
}

function NavSectionHorizontal({ navConfig }: NavSectionHorizontalProps) {
  return (
    <Stack direction="row" justifyContent="center" sx={{ bgcolor: 'background.neutral', borderRadius: 1, px: 0.5 }}>
      <Stack
        direction="row"
        sx={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          py: 1,
        }}
      >
        {navConfig.map((group) => (
          <Stack key={group.subheader} direction="row" flexShrink={0}>
            {group.items.map((list) => (
              <NavListRoot key={list.title} list={list} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(NavSectionHorizontal);
