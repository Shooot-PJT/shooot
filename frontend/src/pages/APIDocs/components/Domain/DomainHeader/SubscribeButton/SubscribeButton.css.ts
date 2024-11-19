import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../../../styles/colorPalette';

export const BellSubscriptionRecipe = recipe({
  base: {
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    transition: 'all 0.15s ease-in-out',
    cursor: 'pointer',
  },
  variants: {
    isSubscribe: {
      true: {
        color: colorPalette.amber[400],
        selectors: {
          '&:hover': { color: colorPalette.amber[300] },
        },
      },
      false: {
        color: colorPalette.grey[400],
        selectors: {
          '&:hover': { color: colorPalette.grey[300] },
        },
      },
    },
  },
  defaultVariants: {
    isSubscribe: false,
  },
});
