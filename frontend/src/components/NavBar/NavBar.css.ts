import { style } from '@vanilla-extract/css';

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
