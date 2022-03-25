import React, { forwardRef } from 'react';
// @mui
import { Typography, Link, LinkProps } from '@mui/material';
// utils
import GetFontValue from '../utils/getFontValue';

// ----------------------------------------------------------------------


export interface TextMaxLineProps extends LinkProps {
  asLink?: boolean;
  children: React.ReactNode;
  line?: number;
  persistent?: boolean;
  [key: string]: any;
};

const TextMaxLine = forwardRef<HTMLAnchorElement, TextMaxLineProps>(
  ({ asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other }, ref) => {
    const { lineHeight } = GetFontValue(variant);

    const style = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: line,
      WebkitBoxOrient: 'vertical',
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    } as typeof sx;

    if (asLink) {
      return (
        <Link color="inherit" ref={ref} variant={variant} sx={{ ...style }} {...other}>
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  }
);
export default TextMaxLine;
