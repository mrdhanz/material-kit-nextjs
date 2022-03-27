import { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows, CustomShadows } from './shadows';
import React from 'react';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    default: string;
    paper: string;
    appbar: string;
    gradientPrimary: string;
    gradientLight: string;
    gradientButtonPrimary: string;
    gradientButtonSecondary: string;
    footer: string;
    card: string;
    neutral: string;
  }
}
declare module '@mui/material/styles' {
  interface ThemeOptions {
    customShadows: CustomShadows;
  }
  interface Theme {
    customShadows: CustomShadows;
  }
}

declare module '@mui/material' {
  interface PaletteColor {
    light: string;
    lighter: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  }
  interface Color {
    0: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
    [key: string | number]: string;
  }
  interface ThemeOptions {
    customShadows: CustomShadows;
  }
  interface Theme {
    customShadows: CustomShadows;
  }
  interface Palette {
    gradients: {
      primary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
      [key: string]: string;
    };
    chart: {
      [key: string]: any;
    };
  }
}

// ----------------------------------------------------------------------
export interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
