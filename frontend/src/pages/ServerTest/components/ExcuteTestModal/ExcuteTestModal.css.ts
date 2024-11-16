import { style } from '@vanilla-extract/css';

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
