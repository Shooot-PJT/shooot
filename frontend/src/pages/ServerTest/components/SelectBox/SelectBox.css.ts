import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

export const selectBox = style({
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '0.5rem',
  border: `2px solid ${colorPalette.util[400]}`,
  color: '#fff',
  cursor: 'pointer',
  outline: 'none',
  backgroundColor: colorPalette.util[300],
  ':focus': {
    borderColor: '#4A90E2',
  },

});
