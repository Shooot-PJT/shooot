import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../../../../styles/colorPalette';
import { TEST_RESULTS } from '../../../../../types/data/API.data';

export const testResultTailRecipe = recipe({
  base: {
    height: '100%',
    width: '1.5rem',
    cursor: 'pointer',
  },
  variants: {
    testStatus: {
      SUCCESS: {
        backgroundColor: colorPalette.originalGreen,
      },
      FAIL: {
        backgroundColor: colorPalette.originalRed,
      },
      YET: {
        backgroundColor: colorPalette.grey[800],
      },
    },
  },

  defaultVariants: {
    testStatus: TEST_RESULTS.YET,
  },
});
