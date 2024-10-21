import { style } from '@vanilla-extract/css';

export const btn = style({
  '@media': {
    'screen and (min-width: 768px)': {
      minWidth: '90%',
      padding: '0.75rem 2rem !important',
    },

    'screen and (max-width: 767px)': {
      width: '100%',
      padding: '0.5rem 1rem !important',
    },
  },
});
