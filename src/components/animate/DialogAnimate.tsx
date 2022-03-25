import { m, AnimatePresence, Variants } from 'framer-motion';
// @mui
import { Dialog, Box, Paper, SxProps, DialogProps } from '@mui/material';
//
import { varFade } from './variants';
import React, { ReactNode } from 'react';

// ----------------------------------------------------------------------

export interface DialogAnimateProps extends DialogProps {
  children: ReactNode;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  open: boolean;
  sx?: SxProps;
  variants?: Variants;
  [key: string]: any;
}

export default function DialogAnimate({ open = false, variants, onClose, children, sx, ...other }: DialogAnimateProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={onClose}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              {...(variants ||
                varFade({
                  distance: 120,
                  durationIn: 0.32,
                  durationOut: 0.24,
                  easeIn: 'easeInOut',
                }).inUp)}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}
