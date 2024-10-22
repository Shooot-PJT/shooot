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
    backdropFilter: 'blur(var(--blur, 4px))',
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
  transform: 'translateZ(0)',
  backgroundColor: 'rgba(0, 0, 0, var(--opacity, 0.5))',
  backdropFilter: 'blur(var(--blur, 4px))',
  willChange: 'backgroundColor, opacity, backdropFilter',
  zIndex: 30,
});

export const fadeIn = style({
  animation: `${fadeInBlur} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
  animationFillMode: 'forwards',
});

export const fadeOut = style({
  animation: `${fadeOutBlur} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
  animationFillMode: 'forwards',
});
