import { style } from '@vanilla-extract/css';

export const editorContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const editorArea = style({
  display: 'flex',
  flexDirection: 'row',
  border: '1px solid #ccc',
  padding: '0.5rem',
  position: 'relative',
});

export const textArea = style({
  flex: 1,
  fontSize: '14px',
  fontFamily: 'monospace',
  resize: 'none',
  border: 'none',
  outline: 'none',
});

export const lineNumbers = style({
  paddingRight: '10px',
  textAlign: 'right',
  userSelect: 'none',
  fontFamily: 'monospace',
  color: '#888',
});

export const darkMode = style({
  backgroundColor: '#1e1e1e',
  color: '#dcdcdc',
});

export const error = style({
  color: 'red',
  padding: '0.5rem',
  fontSize: '12px',
});
