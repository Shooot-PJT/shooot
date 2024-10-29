import { style } from '@vanilla-extract/css';

export const canvas = style({
  fontFamily: 'Pretendard',
  borderTop: `10px solid var(--color, white)`,
  borderBottom: `10px solid var(--color, white)`,
  borderRight: `10px solid var(--color, white)`,
  borderLeft: `6px solid var(--color, white)`,
  borderRadius: '0.5rem',
});
