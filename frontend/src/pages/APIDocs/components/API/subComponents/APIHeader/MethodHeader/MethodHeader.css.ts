import { recipe } from '@vanilla-extract/recipes';
import theme from '../../../../../../../styles/theme.css';
import colorPalette from '../../../../../../../styles/colorPalette';

export const methodHeader = recipe({
  base: {
    width: '6.5rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: colorPalette.grey['300'],
  },

  variants: {
    method: {
      method: {
        backgroundColor: colorPalette.grey['300'],
      },
      get: {
        backgroundColor: theme.palette.get['main'],
      },
      post: {
        backgroundColor: theme.palette.post['main'],
      },
      put: {
        backgroundColor: theme.palette.put['main'],
      },
      patch: {
        backgroundColor: theme.palette.patch['main'],
      },
      delete: {
        backgroundColor: theme.palette.delete['main'],
      },
    },
  },
});
