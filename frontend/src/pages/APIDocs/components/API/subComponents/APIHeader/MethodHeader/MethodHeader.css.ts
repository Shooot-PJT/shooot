import { recipe } from '@vanilla-extract/recipes';
import theme from '../../../../../../../styles/theme.css';

export const methodHeader = recipe({
  base: {
    width: '6.5rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  variants: {
    method: {
      get: {
        backgroundColor: theme.palette.get['main'],
        color: theme.palette.get['contrastText'],
      },
      post: {
        backgroundColor: theme.palette.post['main'],
        color: theme.palette.post['contrastText'],
      },
      put: {
        backgroundColor: theme.palette.put['main'],
        color: theme.palette.put['contrastText'],
      },
      patch: {
        backgroundColor: theme.palette.patch['main'],
        color: theme.palette.patch['contrastText'],
      },
      delete: {
        backgroundColor: theme.palette.delete['main'],
        color: theme.palette.delete['contrastText'],
      },
    },
  },
});
