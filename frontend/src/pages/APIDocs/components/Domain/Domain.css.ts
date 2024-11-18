import { recipe } from '@vanilla-extract/recipes';
import { keyframes } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';

const popIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.85)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

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

export const domainContainerRecipe = recipe({
  base: {
    animation: `${popIn} 300ms ease-in-out`,
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
