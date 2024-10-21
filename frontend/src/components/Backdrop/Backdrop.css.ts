import { style, keyframes } from '@vanilla-extract/css';

const fadeInBlur = keyframes({
  '0%': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  '100%': {
    backgroundColor: 'rgba(0, 0, 0, var(--opacity, 0.5))',
    opacity: 1,
    backdropFilter: 'blur(var(--blur, 4px))',
  },
});

const fadeOutBlur = keyframes({
  '0%': {
    backgroundColor: 'rgba(0, 0, 0, var(--opacity, 0.5))',
    opacity: 1,
    backdropFilter: 'blur(var(--blur, 0px))',
  },
  '100%': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
});

export const backdrop = style({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  left: 0,
  top: 0,
  backgroundColor: 'rgba(0, 0, 0, var(--opacity, 0.5))',
  backdropFilter: 'blur(var(--blur, 4px))',
  willChange: 'backgroundColor, backdropFilter',
  zIndex: 30,
});

export const fadeIn = style({
  animation: `${fadeInBlur} 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)`,
});

export const fadeOut = style({
  animation: `${fadeOutBlur} 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)`,
});
