import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

export const container = style({
  minWidth: '960px',
});

export const ConfigIcon = style({
  verticalAlign: 'middle',
  color: colorPalette.purple[500],
  selectors: {
    '&:hover': {
      color: colorPalette.purple[300],
    },
  },
});

export const UndefinedAPIDescription = style({
  width: '100%',
  color: colorPalette.amber[500],
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
