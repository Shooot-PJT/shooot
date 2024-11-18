import { recipe } from '@vanilla-extract/recipes';

export const CollapseContainerRecipe = recipe({
  base: {
    overflow: 'hidden',
    transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out',
    opacity: 1,
  },
  variants: {
    isOpen: {
      true: {
        maxHeight: '500rem',
        opacity: 1,
        pointerEvents: 'auto',
      },
      false: {
        maxHeight: '0',
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});
