import { style } from '@vanilla-extract/css';

export const imgsize = style({
  '@media': {
    'screen and (min-width: 1440px)': {
      width: '240px',
    },

    'screen and (max-width: 1439px)': {
      width: '200px',
    },
  },
});
