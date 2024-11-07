import { style } from '@vanilla-extract/css';

export const tableStyle = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const headerCellStyle = style({
  backgroundColor: '#333',
  color: '#fff',
  padding: '8px',
  textAlign: 'left',
  borderBottom: '1px solid #555',
  borderRight: '1px solid #555',
});

export const rowStyle = style({
  backgroundColor: '#444',
  transition: 'background-color 0.25s ease-in-out',
});

export const selectedRowStyle = style([
  rowStyle,
  {
    backgroundColor: '#666',
    transition: 'background-color 0.25s ease-in-out',
  },
]);

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
export const requiredCellStyle = style([cellStyle, { width: '10%' }]);
export const descriptionCellStyle = style([cellStyle, { width: '60%' }]);

export const addButtonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '8px',
});

export const addButton = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#333',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '24px',
  border: 'none',
  outline: 'none',
  transition: 'background-color 0.25s ease-in-out',
  ':hover': {
    backgroundColor: '#555',
  },
});
