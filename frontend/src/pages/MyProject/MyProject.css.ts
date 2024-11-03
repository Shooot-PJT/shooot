import { style } from '@vanilla-extract/css';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1rem',
  width: 'fit-content',
  margin: '1rem auto 0 auto',
});

export const textarea = style({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

export const logo = style({
  width: '5rem',
  height: '5rem',
  borderRadius: '0.5rem',
});
