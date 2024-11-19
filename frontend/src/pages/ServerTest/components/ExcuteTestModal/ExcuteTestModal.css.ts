import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

export const title = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const testIndicator = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1rem',
});

export const endTest = style({
  fontSize: '18px',
  color: colorPalette.deepOrange[500],
});

export const progressTest = style({
  fontSize: '18px',
  color: colorPalette.blue[500],
});
