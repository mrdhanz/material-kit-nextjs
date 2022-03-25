// @mui
import { Stack, StackProps } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export interface TextIconLabelProps extends StackProps {
  endIcon?: boolean;
  icon?: React.ReactNode;
  value?: React.ReactNode;
  [key: string]: any;
};

export default function TextIconLabel({ icon, value, endIcon = false, sx, ...other }: TextIconLabelProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        typography: 'body2',
        ...sx,
      }}
      {...other}
    >
      {!endIcon && icon}
      {value}
      {endIcon && icon}
    </Stack>
  );
}
