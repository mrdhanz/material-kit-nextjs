// ----------------------------------------------------------------------

import { Theme } from '@mui/material/styles';

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          boxShadow: 'none',
          color: theme.palette.grey[800],
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {},
        containedSecondary: {},
        containedInfo: {},
        containedSuccess: {},
        containedWarning: {},
        containedError: {},
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
