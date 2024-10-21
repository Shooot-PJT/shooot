import { style } from '@vanilla-extract/css';

export const container = style({
  boxSizing: 'border-box',

  '@media': {
    'screen and (min-width: 768px)': {
      height: '100%',
      width: '22.5rem',
      borderRadius: '1rem',
    },

    'screen and (max-width: 767px)': {
      overflow: 'hidden',
      width: '100%',
      maxHeight: '3rem',
      padding: '1rem',
      transition: 'max-height 0.3s ease-in-out',
    },
  },
});

export const scrolldown = style({
  '@media': {
    'screen and (max-width: 767px)': {
      maxHeight: '25rem',
    },
  },
});
