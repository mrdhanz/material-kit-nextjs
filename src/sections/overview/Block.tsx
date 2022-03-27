import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Paper, CardHeader, Box, Typography, SxProps } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

interface BlockProps {
  children: React.ReactNode;
  sx?: SxProps;
  title?: string;
}

export function Block({ title, sx, children }: BlockProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} />}
      <Box
        sx={{
          p: 5,
          minHeight: 180,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

// ----------------------------------------------------------------------

Label.propTypes = {
  title: PropTypes.string.isRequired,
};

export function Label({ title }) {
  return (
    <Typography variant="overline" component="p" gutterBottom sx={{ color: 'text.secondary' }}>
      {title}
    </Typography>
  );
}
