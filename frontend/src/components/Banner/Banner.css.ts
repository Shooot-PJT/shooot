import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
});

export const edit = style({
  textDecoration: 'underline',
});

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

export const imgsize = style({
  '@media': {
    'screen and (min-width: 768px)': {
      width: '10rem',
    },

    'screen and (min-width: 1024px)': {
      width: '12rem',
    },

    'screen and (min-width: 1440px)': {
      width: '20rem',
    },
  },
});
