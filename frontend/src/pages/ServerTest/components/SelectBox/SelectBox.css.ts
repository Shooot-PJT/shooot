import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

export const container = style({
  position: 'relative',
  width: '100%',
});

export const selectBox = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '0.5rem',
  border: `2px solid ${colorPalette.util[400]}`,
  color: '#fff',
  cursor: 'pointer',
  outline: 'none',
  backgroundColor: colorPalette.util[300],
  zIndex: 30,
});

export const selectedItem = style({});

export const expendBox = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  overflow: 'hidden',
  width: '100%',
  right: '-1rem',
  top: '35px',
  backgroundColor: colorPalette.util[200],
  borderRadius: '0rem 0rem 0.5rem 0.5rem',
  padding: '0rem 0.25rem 0rem 0.75rem',
  gap: '0.5rem',
  transition: 'height 0.125s ease-in-out',
  paddingTop: '0.5rem',
});

export const openBox = style({
  height: '200px',

});

export const closeBox = style({
  height: 0,
});

export const isInvisible = style({
  display: 'none',
});

export const optionItem = style({
  width: '100%',
  //paddingLeft: '0.75rem',
  paddingRight: '0.5rem',
  paddingBottom: '0.5rem',
  paddingTop: '0.5rem',
  selectors: {
    '&:hover': {
      backgroundColor: colorPalette.util[300],
    },
  },
});
