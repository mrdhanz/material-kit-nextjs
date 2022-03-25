import React, { forwardRef } from 'react';
import { Palette, useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar, SxProps, AvatarProps as MUIAvatarProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface AvatarProps extends MUIAvatarProps {
  color?: keyof Palette;
  children?: React.ReactNode;
  sx?: SxProps;
  [key: string]: any;
}

// eslint-disable-next-line react/prop-types
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ color, children, sx, ...other }, ref) => {
  const theme = useTheme();

  if (color !== 'primary' && color !== 'secondary') {
    return (
      <MUIAvatar ref={ref} sx={sx} {...other}>
        {children}
      </MUIAvatar>
    );
  }

  return (
    <MUIAvatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    >
      {children}
    </MUIAvatar>
  );
});

export default Avatar;
