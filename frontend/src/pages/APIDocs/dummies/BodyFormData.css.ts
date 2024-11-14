// BodyFormData.css.ts

import { keyframes, style } from '@vanilla-extract/css';
import colorPalette from '../../../styles/colorPalette';
import themeCss from '../../../styles/theme.css';

const popIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.85)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

export const tableStyle = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const headerCellStyle = style({
  backgroundColor: themeCss.color.background[100],
  color: '#fff',
  padding: '8px',
  textAlign: 'left',
  borderBottom: '1px solid #555',
  borderRight: '1px solid #555',
});

export const rowStyle = style({
  animation: `${popIn} 0.15s ease-in-out`,
  backgroundColor: themeCss.color.background[300],
  transition: 'background-color 0.25s ease-in-out',
});

export const cellStyle = style({
  padding: '0.4rem',
  fontSize: '14px',
  borderBottom: '1px solid #555',
  borderRight: '1px solid #555',
  color: '#ccc',
  textAlign: 'left',
  boxSizing: 'border-box',
});

export const cellViewStyle = style({
  padding: '0.4rem',
  fontSize: '14px',
  color: '#fff',
  boxSizing: 'border-box',
  transition: 'background-color 0.25s ease-in-out',
});

export const keyCellStyle = style([cellStyle, { width: '20%' }]);
export const typeCellStyle = style([cellStyle, { width: '10%' }]);
export const valueCellStyle = style([cellStyle, { width: '30%' }]);
export const descriptionCellStyle = style([cellStyle, { width: '40%' }]);

export const actionCellStyle = style([cellStyle, { width: '10%' }]);

export const addButtonContainer = style({
  cursor: 'pointer',
  animation: `${popIn} 0.15s ease-in-out`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundColor: themeCss.color.background[300],
  padding: '0.6rem 0',
  borderRadius: '0 0 0.5rem 0.5rem',
  transition: 'background-color 0.25s ease-in-out',
  ':hover': {
    backgroundColor: colorPalette.util[400],
  },
});
