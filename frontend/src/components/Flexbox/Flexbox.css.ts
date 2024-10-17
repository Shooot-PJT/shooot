import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';

export const flexbox = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'flex',
  },

  variants: {
    bg: {
      100: {
        backgroundColor: theme.color.background['100'],
      },
      200: {
        backgroundColor: theme.color.background['200'],
      },
      300: {
        backgroundColor: theme.color.background['300'],
      },
    },
  },
});
