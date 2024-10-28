import { style } from '@vanilla-extract/css';
import theme from '../../styles/theme.css';

export const container = style({
  boxSizing: 'border-box',

  '@media': {
    'screen and (min-width: 1440px)': {
      height: '100%',
      width: '22.5rem',
      borderRadius: '1rem',
    },

    'screen and (max-width: 1439px)': {
      overflow: 'hidden',
      boxSizing: 'border-box',
      width: '100%',
      maxHeight: '6rem',
      padding: '2rem 1rem',
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

/* 반응형 - 1440 이상 */
export const desktopL = style({
  '@media': {
    'screen and (min-width: 1440px)': {
      display: 'block',
    },

    'screen and (max-width: 1439px)': {
      display: 'none',
    },
  },
});

/* 반응형 - 1440 미만 */
export const desktopS = style({
  '@media': {
    'screen and (min-width: 1440px)': {
      display: 'none',
    },

    'screen and (max-width: 1439px)': {
      display: 'block',
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
