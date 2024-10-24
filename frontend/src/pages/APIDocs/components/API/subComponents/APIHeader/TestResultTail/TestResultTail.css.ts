import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../../../../styles/colorPalette';

export const testResultTail = recipe({
  base: {
    height: '100%',
    width: '1.5rem',
    cursor: 'pointer',
  },
  variants: {
    lastTestResult: {
      success: {
        backgroundColor: colorPalette.originalGreen,
      },
      fail: {
        backgroundColor: colorPalette.originalRed,
      },
      yet: {
        backgroundColor: colorPalette.grey[800],
      },
    },
  },

  defaultVariants: {
    lastTestResult: 'yet',
  },
});
