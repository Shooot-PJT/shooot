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
    grey: {
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
    icon: {
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
      disabled: null,
    },
    iconbackground: {
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
      disabled: null,
    },
    textfield: {
      background: null,
      border: null,
      placeholder: null,
      primary: {
        fontColor: null,
        borderActive: null,
      },
      secondary: {
        fontColor: null,
        borderActive: null,
      },
      tertiary: {
        fontColor: null,
        borderActive: null,
      },
      grey: {
        fontColor: null,
        borderActive: null,
      },
      none: {
        fontColor: null,
        border: null,
        borderRadius: null,
        background: null,
        backgroundActive: null,
      },
      get: { fontColor: null, borderActive: null },
      post: { fontColor: null, borderActive: null },
      put: { fontColor: null, borderActive: null },
      delete: { fontColor: null, borderActive: null },
    },
    stateicon: {
      approved: null,
      pending: null,
      disabled: null,
      error: null,
      notbuilded: null,
    },
    item: {
      cpu: null,
      memory: null,
      disk: null,
      network: null,
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
