import { style } from '@vanilla-extract/css';

export const container = style({
  border: '1px solid #ddd',
  borderRadius: '0.5rem',
  padding: '1rem',
  marginBottom: '2rem',
});

export const buttonGroup = style({
  marginTop: '0.5rem',
});

export const formGroup = style({
  marginBottom: '1rem',
});

export const formGroupLabel = style({
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 600,
});

export const formGroupInput = style({
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '0.25rem',
});

export const formGroupSelect = style({
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '0.25rem',
});

export const formActions = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
});

export const bodyTypeSelector = style({
  marginBottom: '1rem',
});

export const bodyTypeSelectorLabel = style({
  marginRight: '1rem',
});

export const containerForm = style({
  display: 'flex',
  flexDirection: 'column',
});

export const addTestCaseForm = style({
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '0.5rem',
  marginBottom: '2rem',
});

export const cellViewStyle = style({
  padding: '0.5rem',
});
