import { style } from '@vanilla-extract/css';

export const backdrop = style({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  left: 0,
  top: 0,
  zIndex: 30,
  backgroundColor: 'rgba(0,0,0,0.4)',
});
