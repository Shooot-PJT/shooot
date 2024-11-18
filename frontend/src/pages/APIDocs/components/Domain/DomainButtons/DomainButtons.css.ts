import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../../styles/colorPalette';

export const iconDomainButton = style({
  cursor: 'pointer',
  transition: 'all 0.25s ease-in-out',
  fontSize: '1.1rem',
  color: colorPalette.grey['600'],
  height: 'max-content',
  marginTop: 'auto',
  selectors: {
    '&:hover': {
      color: colorPalette.grey['400'],
    },
  },
});
