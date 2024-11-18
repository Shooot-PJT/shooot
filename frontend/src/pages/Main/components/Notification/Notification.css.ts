import { style, keyframes } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

const slideIn = keyframes({
  from: { transform: 'translateY(100%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
});

export const notificationListContainer = style({
  position: 'fixed',
  padding: '2rem',
  right: '1vw',
  top: '17.5vh',
  backgroundColor: 'rgba(26, 26, 26, 0.8)',
  backdropFilter: 'blur(5px)',
  borderRadius: '1rem',
  height: '70vh',
  width: '32.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  overflowY: 'auto',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  zIndex: 1001,
  animation: `${slideIn} 0.5s ease-out`,
});

export const closeButton = style({
  alignSelf: 'flex-end',
  cursor: 'pointer',
  marginBottom: '1rem',
  background: 'none',
  border: 'none',
  color: 'white',
  transition: 'color 0.3s',

  selectors: {
    [`&:hover`]: {
      color: colorPalette.grey[700],
    },
  },
});

export const notificationItem = style({
  cursor: 'pointer',
  padding: '1.5rem',
  backgroundColor: colorPalette.grey[800],
  borderRadius: '1rem',
  transition: 'background-color 0.3s, transform 0.2s',

  selectors: {
    [`&:hover`]: {
      backgroundColor: colorPalette.grey[700],
      transform: 'scale(1.02)',
    },
  },
});

export const notificationList = style({
  listStyleType: 'none',
  padding: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});
