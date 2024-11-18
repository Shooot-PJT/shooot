import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';
import { style } from '@vanilla-extract/css';

export const progress = recipe({
  base: {
    position: 'relative',
    width: '100%',
  },

  variants: {
    bg: {
      '100': { backgroundColor: theme.color.background[100] },
      '200': { backgroundColor: theme.color.background[200] },
      '300': { backgroundColor: theme.color.background[300] },
      light: { backgroundColor: '#fff' },
    },
  },

  defaultVariants: {
    bg: 'light',
  },
});

export const bar = style({
  position: 'absolute',
});
