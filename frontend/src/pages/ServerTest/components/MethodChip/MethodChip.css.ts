import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../styles/colorPalette';

export const chip = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '24px',
    borderRadius: '0.75rem',
  },
  variants: {
    method: {
      get: {
        backgroundColor: colorPalette.green[500],
      },
      post: { backgroundColor: colorPalette.amber[500] },
      put: { backgroundColor: colorPalette.blue[500] },
      patch: { backgroundColor: colorPalette.purple[500] },
      delete: { backgroundColor: colorPalette.deepOrange[500] },
    },
  },
});
