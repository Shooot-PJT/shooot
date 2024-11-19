import { style, keyframes } from '@vanilla-extract/css';

const popIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

export const headerContainer = style({
  animation: `${popIn} 300ms ease-in-out`,
});
