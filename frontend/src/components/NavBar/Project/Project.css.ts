import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  boxSizing: 'border-box',

  '@media': {
    'screen and (min-width: 768px)': {
      padding: '1rem',
    },

    'screen and (max-width: 767px)': {
      padding: '1rem 0',
    },
  },
});

export const logo = style({
  width: '5rem',
  height: '5rem',
  borderRadius: '0.5rem',
});
