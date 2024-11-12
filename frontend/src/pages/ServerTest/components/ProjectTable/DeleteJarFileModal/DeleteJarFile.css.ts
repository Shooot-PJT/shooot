import { style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';
import colorPalette from '../../../../styles/colorPalette';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const textContent = style({
  padding: '2rem 0.5rem 0.5rem 0.5rem',
});
