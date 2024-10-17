import { createThemeContract } from '@vanilla-extract/css';

const themeContract = {
  palette: {
    primary: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
    secondary: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
    tertiary: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
    get: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
    post: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
    put: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
    patch: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
    delete: {
      main: null,
      hover: null,
      active: null,
      disabled: null,
      contrastText: null,
    },
  },
  color: {
    typography: {
      primary: null,
      secondary: null,
      tertiary: null,
      get: null,
      post: null,
      put: null,
      patch: null,
      delete: null,
      dark: null,
      light: null,
      originalRed: null,
      originalBlue: null,
      originalGreen: null,
      disabled: null,
    },
    background: {
      100: null,
      200: null,
      300: null,
    },
  },
};

export type Palette = keyof typeof themeContract.palette;
export default createThemeContract(themeContract);
