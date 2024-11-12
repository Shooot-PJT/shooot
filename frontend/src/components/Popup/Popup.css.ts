import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';

export const popup = recipe({
  base: {
    minWidth: '30rem',
    maxHeight: '80vh',
    borderRadius: '1rem',
    padding: '1rem',
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
  transform: 'translate3d(0, 0, 0 )',
  width: '100%',
  height: '100%',
});

export const contentContainer = style({
  overflowY: 'auto',
  flexGrow: 1,
  width: '100%',
  maxHeight: 'calc(75vh - 2rem)',
  transition: 'max-height 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
});

export const content = style({
  margin: '0.5rem 1rem 1rem 1rem',
});

export const modalHeader = style({
  padding: '0.75rem',
});

export const bar = style({
  margin: '0.5rem 4rem 0rem 4rem',
  border: `3px solid ${theme.color.background[200]}`,
  borderRadius: '0.25rem',
  marginBottom: '1rem',
});

const popupInKeyframes = keyframes({
  from: {
    transform: 'translateY(900px)',
  },
  to: {
    transform: 'translateY(0)',
  },
});

const popupOutKeyframes = keyframes({
  from: {
    transform: 'translateY(0)',
  },
  to: {
    transform: 'translateY(900px)',
  },
});

export const popupIn = style({
  animation: `${popupInKeyframes} 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards`,
});

export const popupOut = style({
  animation: `${popupOutKeyframes} 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards`,
});
