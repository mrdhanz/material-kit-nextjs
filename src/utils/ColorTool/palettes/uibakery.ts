import axios from 'axios';

export interface BakeryPaletteTheme {
  danger: string[];
  info: string[];
  primary: string[];
  success: string[];
  warning: string[];
}

export const getUIBakeryPalette = async (primaryColor: string) => {
  const url = `https://app.uibakery.io/api/painter/support?primary=${primaryColor}`;
  try {
    return await axios.get<BakeryPaletteTheme>(url).then((res) => res.data);
  } catch (error) {
    return {
      danger: ['#FFE4D5', '#FFC3AB', '#FF9A81', '#FF7461', '#FF342D', '#DB202A', '#B7162C', '#930E2B', '#7A082B'],
      info: ['#CFFEF4', '#9FFEF0', '#6FFDF4', '#4BF8FB', '#11E2F9', '#0CB1D6', '#0886B3', '#056090', '#034677'],
      primary: ['#D6E4FF', '#ADC8FF', '#84A9FF', '#6690FF', '#3366FF', '#254EDB', '#1939B7', '#102693', '#091A7A'],
      success: ['#F4FCCC', '#E7FA9A', '#D2F266', '#BBE640', '#9BD608', '#7FB805', '#669A04', '#4E7C02', '#3D6601'],
      warning: ['#FFF6D8', '#FFECB1', '#FFDE8A', '#FFD16D', '#FFBB3D', '#DB972C', '#B7771E', '#935913', '#7A430B'],
    };
  }
};

export const convertUIBakeryToMinimalPalette = async (primaryColor: string) => {
  const palette = await getUIBakeryPalette(primaryColor);
  return {
    primary: {
      lighter: palette.primary[0],
      light: palette.primary[2],
      main: palette.primary[4],
      dark: palette.primary[6],
      darker: palette.primary[8],
    },
    info: {
        lighter: palette.info[0],
        light: palette.info[2],
        main: palette.info[4],
        dark: palette.info[6],
        darker: palette.info[8],
    },
    success: {
        lighter: palette.success[0],
        light: palette.success[2],
        main: palette.success[4],
        dark: palette.success[6],
        darker: palette.success[8],
    },
    warning: {
        lighter: palette.warning[0],
        light: palette.warning[2],
        main: palette.warning[4],
        dark: palette.warning[6],
        darker: palette.warning[8],
    },
    error: {
        lighter: palette.danger[0],
        light: palette.danger[2],
        main: palette.danger[4],
        dark: palette.danger[6],
        darker: palette.danger[8],
    },
  };
};
