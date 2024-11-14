import { keyframes, style } from '@vanilla-extract/css';
import colorPalette from '../../../../../styles/colorPalette';

const blinkAnimation = keyframes({
  '0%': {
    opacity: '0',
  },
  '40%': {
    opacity: '1',
  },
  '60%': {
    opacity: '1',
  },
  '100%': {
    opacity: '0',
  },
});

export const DistributingHeader = style({
  fontWeight: '600',
  marginLeft: '0.5rem',
  color: colorPalette.blue[500],
});

export const DistributingCircle = style({
  width: '16px',
  height: '16px',
  backgroundColor: colorPalette.blue[500],
  animation: `${blinkAnimation} 4s ease-in-out`,
  animationIterationCount: 'infinite',
  borderRadius: '50%',
  marginLeft: '0.75rem',
});

export const BuildingHeader = style({
  color: colorPalette.amber[500],
  marginLeft: '0.5rem',
  fontWeight: '600',
});

export const StopDeployHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontWeight: '600',
  marginLeft: '0.5rem',
  color: colorPalette.green[500],
});

export const StopDeployIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: colorPalette.green[500],
  color: 'black',
});

export const BuildingCircle = style({
  width: '16px',
  height: '16px',
  backgroundColor: colorPalette.amber[500],
  animation: `${blinkAnimation} 4s ease-in-out`,
  animationIterationCount: 'infinite',
  borderRadius: '50%',
  marginLeft: '0.75rem',
});

export const DisconnectingHeader = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  color: colorPalette.deepOrange[500],
  marginLeft: '1rem',
  fontWeight: '600',
});

export const IdleHeader = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  color: colorPalette.grey[500],
  marginLeft: '1rem',
});
