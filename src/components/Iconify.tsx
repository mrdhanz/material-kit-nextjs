// icons
import { Icon, IconProps } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';
//
import React from 'react';

// ----------------------------------------------------------------------
type IconPropsWithBox = IconProps & BoxProps;
export default function Iconify({ icon, sx, ...other }: IconPropsWithBox) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
