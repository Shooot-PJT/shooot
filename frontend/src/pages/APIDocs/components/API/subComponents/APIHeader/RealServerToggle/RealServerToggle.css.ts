import { recipe } from '@vanilla-extract/recipes';

export const realServerToggle = recipe({
  base: {
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    selectors: {
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  },
  variants: {
    isRealServer: {
      true: {
        color: '#00aaff',
      },
      false: {
        color: '#cccccc',
      },
    },
  },
});
