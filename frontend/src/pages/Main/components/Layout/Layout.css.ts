import { style } from '@vanilla-extract/css';
import theme from '../../../../styles/theme.css';

export const layout = style({
  width: '100%',
  height: '100%',

  '@media': {
    'screen and (min-width: 1440px)': {
      display: 'flex',
      columnGap: '1rem',
    },
  },
});

/* NavBar */
export const nav = style({
  width: '100%',
  display: 'flex',

  '@media': {
    'screen and (min-width: 1440px)': {
      flexDirection: 'column',
      alignItems: 'center',
      rowGap: '1rem',
    },

    'screen and (max-width: 1439px)': {
      display: 'flex',
      alignItems: 'center',
      marginTop: '1rem',
      columnGap: '3rem',
    },
  },
});

export const divi = style({
  width: '0.1875rem',
  height: '7rem',
  backgroundColor: theme.color.background['300'],

  '@media': {
    'screen and (min-width: 1440px)': {
      display: 'none',
    },
  },
});
