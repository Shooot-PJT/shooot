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

export const popup = recipe({
  base: {
    borderRadius: '1rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // 자식 요소 간 여유 공간을 분배

    '@media': {
      'screen and (min-width: 768px)': {
        minWidth: '30rem',
        maxHeight: '80vh', // 부모 요소의 높이 제한을 viewport에 맞춤
      },
      'screen and (max-width: 767px)': {
        width: '80%',
        minHeight: '15vh',
        maxHeight: '50vh',
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

export const button = style({
  justifySelf: 'end',
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

export const contentContainer = style({
  overflowY: 'auto',
  flexGrow: 1,
  width: '100%',
  maxHeight: 'calc(100% - 2rem)',
});

export const content = style({
  margin: '1rem 0rem 1rem 0rem',
});

export const popupIn = style({
  animation: `${scaleUp} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
  animationFillMode: 'forwards',
});

export const popupOut = style({
  animation: `${scaleDown} 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)`,
  animationFillMode: 'forwards',
});
