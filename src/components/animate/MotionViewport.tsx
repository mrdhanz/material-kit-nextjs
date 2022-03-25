import { m } from 'framer-motion';
// @mui
import { Box, BoxProps } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
//
import { varContainer } from '.';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

export interface MotionViewportProps extends BoxProps {
  children: ReactNode;
  disableAnimatedMobile?: boolean;
  [key: string]: any;
}

export default function MotionViewport({ children, disableAnimatedMobile = true, ...other }: MotionViewportProps) {
  const isDesktop = useResponsive('up', 'sm');

  if (!isDesktop && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
