import { keyframes, style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

const flightAnimation = keyframes({
  '0%': {
    transform: 'translateY(-300px) translateX(0px)',
  },
  '100%': {
    transform: 'translateY(800px) translateX(-30px)',
    boxShadow: 'inset -16px -20px 3px rgba(0, 0, 0, 0.2)',
  },
});

const flightAnimation2 = keyframes({
  '0%': {
    transform: 'translateY(-300px) translateX(0px)',
  },
  '100%': {
    transform: 'translateY(800px) translateX(20px)',
    boxShadow: 'inset 0px 3px 3px rgba(0, 0, 0, 0.2)',
  },
});

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const moon = style({
  position: 'absolute',
  width: '100px',
  height: '100px',
  top: '10%',
  left: '74%',
  borderRadius: '50%',
  aspectRatio: '1',
  backgroundColor: colorPalette.amber[500],
  backgroundImage:
    'radial-gradient(circle, rgba(255, 249, 196, 0.9) 0%, rgba(125, 125, 125, 0) 100%)',
  opacity: '1',
  willChange: `transform boxShadow`,
  animation: `${flightAnimation} 2s linear`,
  animationIterationCount: 'infinite',
});

export const moon2 = style({
  position: 'absolute',
  width: '60px',
  height: '60px',
  top: '10%',
  left: '10%',
  borderRadius: '50%',
  aspectRatio: '1',
  backgroundColor: colorPalette.blue[500],
  backgroundImage:
    'radial-gradient(circle, rgba(255, 249, 196, 0.9) 0%, rgba(125, 125, 125, 0) 100%)',
  opacity: '1',
  willChange: `transform boxShadow`,
  animation: `${flightAnimation2} 2.5s linear`,
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
