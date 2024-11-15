import { keyframes, style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

const flightAnimation = keyframes({
  '0%': {
    transform: 'translateY(-120px)',
    boxShadow: 'inset 0px 12px 3px rgba(0, 0, 0, 0.2)',
  },
  '100%': {
    transform: 'translateY(200px)',
    boxShadow: 'inset -16px -20px 3px rgba(0, 0, 0, 0.2)',
  },
});

export const moon = style({
  position: 'absolute',
  width: '100px',
  height: '100px',
  top: '10%',
  left: '58%',
  borderRadius: '50%',
  aspectRatio: '1',
  backgroundColor: colorPalette.amber[500],
  backgroundImage:
    'radial-gradient(circle, rgba(255, 249, 196, 0.9) 0%, rgba(125, 125, 125, 0) 100%)',
  opacity: '1',
  willChange: `transform boxShadow`,
  animation: `${flightAnimation} 3.5s ease-in-out`,
  animationIterationCount: 'infinite',
});

export const pattern1 = style({
  position: 'absolute',
  width: '16px',
  height: '16px',
  top: '24%',
  left: '20%',
  backgroundColor: colorPalette.amber[800],
  borderRadius: '50%',
  opacity: '0.1',
});

export const pattern2 = style({
  position: 'absolute',
  width: '20px',
  height: '32px',
  top: '30%',
  left: '64%',
  borderRadius: '50%',
  backgroundColor: colorPalette.amber[700],
  opacity: '0.15',
});

export const pattern3 = style({
  position: 'absolute',
  width: '28px',
  height: '16px',
  top: '68%',
  left: '38%',
  borderRadius: '50%',
  backgroundColor: colorPalette.amber[600],
  opacity: '0.20',
});
