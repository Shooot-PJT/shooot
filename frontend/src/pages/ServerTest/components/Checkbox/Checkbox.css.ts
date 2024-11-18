// Checkbox.css.ts
import { style, globalStyle } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

export const hiddenCheckbox = style({
  border: 0,
  clip: 'rect(0, 0, 0, 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
});

export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',
});

export const checkboxSymbol = style({
  display: 'flex',
  border: `3px solid ${colorPalette.purple[500]}`,
  position: 'relative',
  borderRadius: '0.1em',
  width: '1.5em',
  height: '1.5em',
  transition: `all 0.3s cubic-bezier(0.11, 0.29, 0.18, 0.98)`,
  backgroundColor: '#fff',
});

globalStyle(`${checkboxSymbol} svg`, {
  width: '1em',
  height: '1em',
  margin: 'auto',
  fill: 'none',
  strokeWidth: 6,
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: 10,
  color: colorPalette.purple[500],
  display: 'inline-block',
});

globalStyle(`${checkboxSymbol} svg path`, {
  transition: `stroke-dashoffset 0.25s cubic-bezier(0.11, 0.29, 0.18, 0.98)`,
  strokeDasharray: '30px, 31px',
});

export const checkedPath = style({
  strokeDashoffset: '0px',
});

export const uncheckedPath = style({
  strokeDashoffset: '31px',
});
