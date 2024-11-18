import { keyframes, style } from '@vanilla-extract/css';

export const imgsize = style({
  '@media': {
    'screen and (min-width: 1440px)': {
      width: '240px',
    },

    'screen and (max-width: 1439px)': {
      width: '200px',
    },
  },
});

import colorPalette from '../../../../styles/colorPalette';
import themeCss from '../../../../styles/theme.css';

export const bannerContainer = style({
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: themeCss.color.background['100'],
  position: 'relative',
  padding: '1rem 2rem',
  borderRadius: '0',

  '@media': {
    'screen and (min-width: 768px)': {
      borderRadius: '1rem',
      padding: '1rem 2rem 0 2rem',
    },
  },
});

export const notificationIcon = style({
  marginTop: '1rem',
  position: 'fixed',
  right: '4vw',
  top: '87.5vh',
  backgroundColor: 'black',
  borderRadius: '50%',
  height: '3.75rem',
  width: '3.75rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  transition: 'transform 0.3s ease-in-out',

  selectors: {
    [`&:hover`]: {
      backgroundColor: colorPalette.grey[700],
    },
  },
});

export const notificationCount = style({
  position: 'absolute',
  top: '-0.3rem',
  right: '-0.3rem',
  backgroundColor: 'red',
  padding: '0.1rem 0.4rem',
  borderRadius: '50%',
});

export const shakeAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(15deg)' },
  '50%': { transform: 'rotate(-15deg)' },
  '75%': { transform: 'rotate(15deg)' },
  '100%': { transform: 'rotate(0deg)' },
});

export const notificationIconShake = style({
  animation: `${shakeAnimation} 1s`,
});
