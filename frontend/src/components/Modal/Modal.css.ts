import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';

const slideUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(60%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0%)',
  },
});

const slideDown = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translateY(var(--moveY, 0px))',
  },
  '100%': {
    opacity: 0.5,
    transform: 'translateY(60%)',
  },
});

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
    '@media': {
      'screen and (min-width: 768px)': {
        minWidth: '30rem',
        maxHeight: '80vh',
        borderRadius: '1rem',
        padding: '1rem',
      },
      'screen and (max-width: 767px)': {
        width: '100vw',
        minHeight: '65vh',
        maxHeight: '75vh',
        borderRadius: '2rem 2rem 0rem 0rem',
        paddingBottom: '4rem',
      },
    },
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
  '@media': {
    'screen and (max-width: 767px)': {
      alignItems: 'end',
    },
  },
});

export const contentContainer = style({
  overflowY: 'auto',
  flexGrow: 1,
  width: '100%',
  maxHeight: 'calc(75vh - 2rem)',
});

export const content = style({
  margin: '0.5rem 1rem 1rem 1rem',
});

export const modalHeader = style({
  padding: '0.75rem',
});

export const bar = style({
  margin: '0.5rem 4rem 0rem 4rem',
  border: `3px solid ${theme.color.modal['bar']}`,
  borderRadius: '0.25rem',
  marginBottom: '1rem',
});

export const modalIn = style({
  '@media': {
    'screen and (max-width: 767px)': {
      animation: `${slideUp} 0.66s cubic-bezier(0.4, 0.0, 0.2, 1)`,
    },
    'screen and (min-width: 768px)': {
      animation: `${scaleUp} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
    },
  },
  animationFillMode: 'forwards',
});

export const modalOut = style({
  '@media': {
    'screen and (max-width: 767px)': {
      animation: `${slideDown} 0.66s cubic-bezier(0.4, 0.0, 0.2, 1)`,
    },
    'screen and (min-width: 768px)': {
      animation: `${scaleDown} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
    },
  },
  animationFillMode: 'forwards',
});
