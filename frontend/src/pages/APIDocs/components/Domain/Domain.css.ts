import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../styles/colorPalette';

export const BellSubscriptionRecipe = recipe({
  base: {
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    transition: 'all 0.25s ease-in-out',
    cursor: 'pointer',
  },
  variants: {
    isSubscribed: {
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
    isSubscribed: false,
  },
});

export const domainContainerRecipe = recipe({
  base: {
    transition: 'all 0.2s ease-in-out',
    border: '0.05rem solid',
    borderColor: colorPalette.grey[500],
    padding: '2rem 4rem',
    gap: '1rem',
    borderRadius: '1rem',
  },
  variants: {
    isOpen: {
      false: {
        selectors: {
          '&:hover': {
            backgroundColor: colorPalette.util[100],
          },
        },
      },
      true: {},
    },
  },
});
