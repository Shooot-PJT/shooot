import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';

const scaleUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.05)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

const scaleDown = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1)',
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.05)',
  },
});

export const modal = recipe({
  base: {
    position: 'fixed',
    minWidth: '30rem',
    maxHeight: '80%',
    padding: '1rem',
    borderRadius: '1rem',
  },

  variants: {
    background: {
      '100': { backgroundColor: theme.color.background['100'] },
      '200': { backgroundColor: theme.color.background['200'] },
      '300': { backgroundColor: theme.color.background['300'] },
    },
  },
});

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  transform: 'translateZ(0)',
  willChange: 'opacity, transform',
});

export const modalIn = style({
  animation: `${scaleUp} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
  animationFillMode: 'forwards',
});

export const modalOut = style({
  animation: `${scaleDown} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
  animationFillMode: 'forwards',
});
