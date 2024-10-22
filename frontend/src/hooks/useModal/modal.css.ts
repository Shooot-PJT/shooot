import { style, keyframes } from '@vanilla-extract/css';
import theme from '../../styles/theme.css';

export const modal = style({
  position: 'fixed',
  minWidth: '120px',
  minHeight: '120px',
  backgroundColor: `${theme.palette}`,
});
