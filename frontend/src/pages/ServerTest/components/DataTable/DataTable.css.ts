import { keyframes, style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';
import colorPalette from '../../../../styles/colorPalette';

const slideUpAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const container = style({});

export const header = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  height: '50px',
  borderRadius: '0.5rem 0.5rem 0rem 0rem',
  borderBottom: `2px solid ${themeCss.color.background[300]}`,
  backgroundColor: themeCss.color.background[100],
});

export const headerItem = style({
  position: 'relative',
  display: 'flex',
  flexBasis: 'var(--width)',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: '500',
  color: `${colorPalette.grey[400]}`,
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
});

export const resizeBar = style({
  position: 'absolute',
  right: 0,
  top: 0,
  width: '3px',
  height: '100%',
  cursor: 'col-resize',
  backgroundColor: `${themeCss.color.background[300]}`,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: themeCss.color.background[100],
  height: '360px',
  overflow: 'auto',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: '48px',
  justifyContent: 'space-around',
  transition: 'all 0.25s ease-in-out',
});

export const hoverRow = style({
  selectors: {
    '&:hover': {
      backgroundColor: colorPalette.util[200],
    },
  },
});

export const selectedRow = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: '48px',
  justifyContent: 'space-around',
  transition: 'all 0.25s ease-in-out',
  backgroundColor: colorPalette.util[300],
});

export const rowItem = style({
  height: '100%',
  flexBasis: 'var(--width)',
  textAlign: 'center',
  alignContent: 'center',
  justifyItems: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  animation: `${slideUpAnimation} 0.5s ease-out`,
});

export const expandedRowContainer = style({
  width: '100%',
  overflow: 'hidden',
  maxHeight: '0',
  transition: 'all 0.5s ease-in-out',
  selectors: {
    '&.expanded': {
      maxHeight: '200px',
    },
  },
});
