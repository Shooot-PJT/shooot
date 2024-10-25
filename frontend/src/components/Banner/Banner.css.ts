import { style } from '@vanilla-extract/css';

export const imgdisplay = style({
  '@media': {
    'screen and (min-width: 1440px)': {
      display: 'block',
    },

    'screen and (max-width: 1439px)': {
      display: 'none',
    },
  },
});
