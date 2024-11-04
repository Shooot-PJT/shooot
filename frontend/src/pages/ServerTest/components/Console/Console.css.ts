import { keyframes, style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';
import themeCss from '../../../../styles/theme.css';

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

export const Header = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  height: '50px',
  borderRadius: '0.5rem 0.5rem 0rem 0rem',
  backgroundColor: themeCss.color.background[300],
});

export const HeaderWrapper = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});

export const Body = style({
  height: '330px',
  overflow: 'auto',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'block',
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: `${colorPalette.grey[500]}`,
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: `${colorPalette.util[300]}`,
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
  },
});

export const BodyWrapper = style({
  paddingRight: '1rem',
  backgroundColor: themeCss.color.background[100],
  paddingTop: '1rem',
  paddingBottom: '1rem',
});

export const BodyContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  fontSize: '12px',
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
});

export const stateHeader = style({
  display: 'flex',
  alignItems: 'center',
});

export const stopSquareActive = style({
  width: '16px',
  height: '16px',
  backgroundColor: colorPalette.deepOrange[500],
  borderRadius: '0.1rem',
});

export const stopSquareDisabled = style({
  width: '16px',
  height: '16px',
  backgroundColor: colorPalette.grey[500],
  borderRadius: '0.1rem',
});

export const stopButtonActive = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginRight: '2rem',
  fontWeight: '600',
  color: colorPalette.deepOrange[500],
  cursor: 'pointer',
});

export const stopButtonDisabled = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginRight: '2rem',
  fontWeight: '600',
  color: colorPalette.grey[500],
});

export const DistributingHeader = style({
  fontWeight: '600',
  marginLeft: '0.5rem',
  color: colorPalette.green[500],
});

export const DistributingCircle = style({
  width: '16px',
  height: '16px',
  backgroundColor: colorPalette.green[500],
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
  color: colorPalette.deepOrange[500],
  marginLeft: '1rem',
  fontWeight: '600',
});

export const IdleHeader = style({
  color: colorPalette.grey[500],
  marginLeft: '1rem',
});

export const BodyContentItem = style({});
