import { createTheme } from '@vanilla-extract/css';
import themeContract from './theme.css';
import colorPalette from './colorPalette';

export default createTheme(themeContract, {
  palette: {
    primary: {
      main: colorPalette.purple['500'],
      hover: colorPalette.purple['200'],
      active: colorPalette.purple['700'],
      disabled: colorPalette.purple['50'],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colorPalette.brown['500'],
      hover: colorPalette.brown['200'],
      active: colorPalette.brown['700'],
      disabled: colorPalette.brown['50'],
      contrastText: '#ffffff',
    },
    tertiary: {
      main: colorPalette.pink['500'],
      hover: colorPalette.pink['200'],
      active: colorPalette.pink['700'],
      disabled: colorPalette.pink['50'],
      contrastText: '#ffffff',
    },
    get: {
      main: colorPalette.green['500'],
      hover: colorPalette.green['200'],
      active: colorPalette.green['700'],
      disabled: colorPalette.green['50'],
      contrastText: '#ffffff',
    },
    post: {
      main: colorPalette.amber['500'],
      hover: colorPalette.amber['200'],
      active: colorPalette.amber['700'],
      disabled: colorPalette.amber['50'],
      contrastText: '#ffffff',
    },
    put: {
      main: colorPalette.blue['500'],
      hover: colorPalette.blue['200'],
      active: colorPalette.blue['700'],
      disabled: colorPalette.blue['50'],
      contrastText: '#ffffff',
    },
    patch: {
      main: colorPalette.purple['500'],
      hover: colorPalette.purple['200'],
      active: colorPalette.purple['700'],
      disabled: colorPalette.purple['50'],
      contrastText: '#ffffff',
    },
    delete: {
      main: colorPalette.deepOrange['500'],
      hover: colorPalette.deepOrange['200'],
      active: colorPalette.deepOrange['700'],
      disabled: colorPalette.deepOrange['50'],
      contrastText: '#ffffff',
    },
    grey: {
      main: colorPalette.grey['500'],
      hover: colorPalette.grey['200'],
      active: colorPalette.grey['50'],
      disabled: colorPalette.grey['700'],
      contrastText: '#ffffff',
    },
  },
  color: {
    typography: {
      primary: colorPalette.purple['500'],
      secondary: colorPalette.brown['500'],
      tertiary: colorPalette.pink['500'],
      get: colorPalette.green['500'],
      post: colorPalette.amber['500'],
      put: colorPalette.blue['500'],
      patch: colorPalette.purple['500'],
      delete: colorPalette.deepOrange['500'],
      dark: '#000',
      light: '#fff',
      originalRed: '#ff0000',
      originalGreen: '#00ff00',
      originalBlue: '#0000ff',
      disabled: colorPalette.grey['500'],
    },
    icon: {
      primary: colorPalette.purple['500'],
      secondary: colorPalette.brown['500'],
      tertiary: colorPalette.pink['500'],
      get: colorPalette.green['500'],
      post: colorPalette.amber['500'],
      put: colorPalette.blue['500'],
      patch: colorPalette.purple['500'],
      delete: colorPalette.deepOrange['500'],
      dark: '#000',
      light: '#fff',
      disabled: colorPalette.grey['500'],
    },
    iconbackground: {
      primary: colorPalette.purple['50'],
      secondary: colorPalette.brown['50'],
      tertiary: colorPalette.pink['50'],
      get: colorPalette.green['50'],
      post: colorPalette.amber['50'],
      put: colorPalette.blue['50'],
      patch: colorPalette.purple['50'],
      delete: colorPalette.deepOrange['50'],
      dark: colorPalette.grey['50'],
      light: colorPalette.grey['50'],
      disabled: colorPalette.grey['50'],
    },
    textfield: {
      background: '#3A3A4A',
      placeholder: colorPalette.grey['500'],
      border: '#8C8CB6',
      primary: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.purple['300'],
      },
      secondary: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.brown['300'],
      },
      tertiary: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.pink['300'],
      },
      grey: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.grey['300'],
      },
      get: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.green['300'],
      },
      post: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.amber['300'],
      },
      put: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.blue['300'],
      },
      delete: {
        fontColor: colorPalette.grey['200'],
        borderActive: colorPalette.deepOrange['500'],
      },
      none: {
        fontColor: colorPalette.light,
        border: colorPalette.grey[800],
        borderRadius: '0.2rem',
        background: colorPalette.grey[800],
        backgroundActive: colorPalette.util[400],
      },
    },
    modal: {
      bar: '#61616E',
    },
    background: {
      100: colorPalette.util['100'],
      200: colorPalette.util['200'],
      300: colorPalette.util['300'],
    },
  },
});
