import { style } from '@vanilla-extract/css';
import theme from '../../../../styles/theme.css';

export const container = style({
  boxSizing: 'border-box',
  zIndex: 20,

  '@media': {
    'screen and (min-width: 1440px)': {
      position: 'fixed',
      width: '20rem',
      borderRadius: '1rem',
      paddingBottom: '4rem',
    },

    'screen and (max-width: 1439px)': {
      position: 'fixed',
      overflow: 'hidden',
      boxSizing: 'border-box',
      width: '100%',
      maxHeight: '4rem',
      padding: '1rem',
      transition: 'max-height 0.3s ease-in-out',
    },
  },
});

export const scrolldown = style({
  '@media': {
    'screen and (max-width: 1439px)': {
      maxHeight: '25rem',
    },
  },
});

/* 스토리북에서 사용 */
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
      marginTop: '3rem',
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
