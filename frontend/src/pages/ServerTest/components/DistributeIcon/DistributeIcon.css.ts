import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

export const Container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
});

export const ActiveContainer = style({
  backgroundColor: colorPalette.purple[500],
  selectors: {
    '&:hover': {
      backgroundColor: colorPalette.purple[300],
      color: colorPalette.grey[300],
    },
  },
});

export const DeactiveContainer = style({
  backgroundColor: colorPalette.grey[500],
});

export const ActiveIcon = style({
  color: 'white',
});

export const DeactiveIcon = style({
  color: colorPalette.grey[300],
});
