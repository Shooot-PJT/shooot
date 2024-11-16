import { style } from '@vanilla-extract/css';

export const dropdownContainer = style({
  position: 'relative',
  width: '100%',
});

export const buttonStyle = style({
  textAlign: 'start',
  width: '100%',
  padding: '6px',
  border: '1px solid #555',
  backgroundColor: '#333',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.25s ease-in-out',
});

export const menuStyle = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  backgroundColor: '#333',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  opacity: 0.95,
  zIndex: 10,
});

export const optionStyle = style({
  padding: '8px',
  color: '#ccc',
  cursor: 'pointer',
  transition: 'background-color 0.25s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: '#555',
    },
  },
});

export const selectedOptionStyle = style([
  optionStyle,
  {
    backgroundColor: '#444',
    transition: 'background-color 0.25s ease-in-out',
  },
]);
