import { recipe } from '@vanilla-extract/recipes';
import palette from '../../../../../../../styles/colorPalette';

export const resultDot = recipe({
  base: {
    width: '1rem',
    height: '1rem',
    borderRadius: '0.5rem',
  },

  variants: {
    isSuccess: {
      true: {
        backgroundColor: palette.originalGreen,
      },
      false: {
        backgroundColor: palette.originalRed,
      },
    },
  },
});

export const divi = recipe({
  base: {
    width: '0.125rem',
    height: '0.785rem',
  },

  variants: {
    isSuccess: {
      true: {
        backgroundColor: palette.originalGreen,
      },
      false: {
        backgroundColor: palette.originalRed,
      },
    },
  },
});
