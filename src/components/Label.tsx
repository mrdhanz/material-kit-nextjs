// @mui
import { alpha, styled, Palette } from '@mui/material/styles';
import React from 'react';
// ----------------------------------------------------------------------

type LabelColor = keyof Palette; //"default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";

export interface LabelProps {
  children?: React.ReactNode;
  color?: LabelColor;
  variant?: 'filled' | 'outlined' | 'ghost';
  [key: string]: any;
}

const RootStyle = styled('span')<LabelProps>(({ theme, color, variant }) => {
  const isLight = theme.palette.mode === 'light';

  const styleFilled = (color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error') => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
  });

  const styleOutlined = (color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error') => ({
    color: theme.palette[color].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[color].main}`,
  });

  const styleGhost = (color: LabelColor) => ({
    // @ts-ignore
    color: theme.palette[color][isLight ? 'dark' : 'light'],
    // @ts-ignore
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...((color !== undefined && color == 'primary') ||
    color == 'secondary' ||
    color == 'info' ||
    color == 'success' ||
    color == 'warning' ||
    color == 'error'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) }),
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === 'ghost' && {
            color: isLight ? theme.palette.text.secondary : theme.palette.common.white,
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

// ----------------------------------------------------------------------

export default function Label({ color = 'primary', variant = 'ghost', children, ...other }: LabelProps) {
  return (
    <RootStyle color={color} variant={variant} {...other}>
      {children}
    </RootStyle>
  );
}
