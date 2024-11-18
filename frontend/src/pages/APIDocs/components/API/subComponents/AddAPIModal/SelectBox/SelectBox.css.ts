import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../../../../styles/colorPalette';

export const container = style({
  position: 'relative',
  width: '100%',
});

export const selectBox = style({
  position: 'relative',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  borderRadius: '0.5rem',
  border: `2px solid ${colorPalette.util[400]}`,
  color: '#fff',
  cursor: 'pointer',
  outline: 'none',
  backgroundColor: colorPalette.util[300],
  zIndex: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
});

export const selectedItem = style({
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const expendBox = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  overflowY: 'auto',
  maxHeight: '200px',
  width: '100%',
  right: '0',
  top: '100%',
  backgroundColor: colorPalette.util[200],
  borderRadius: '0rem 0rem 0.5rem 0.5rem',
  padding: '0.25rem 0.75rem',
  gap: '0.5rem',
  transition: 'max-height 0.125s ease-in-out',
  zIndex: 50,
  boxSizing: 'border-box',
});

export const openBox = style({
  maxHeight: '200px',
});

export const closeBox = style({
  maxHeight: '0',
  overflow: 'hidden',
});

export const optionItem = style({
  padding: '0.3rem 0.5rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  selectors: {
    '&:hover': {
      backgroundColor: colorPalette.util[300],
    },
  },
});
