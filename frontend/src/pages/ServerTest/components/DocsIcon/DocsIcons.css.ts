import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

export const ActiveIcon = style({
  color: colorPalette.purple[500],
  selectors: {
    '&:hover': {
      color: colorPalette.purple[300],
    },
  },
});

export const DeactiveIcon = style({
  color: colorPalette.grey[500],
});
