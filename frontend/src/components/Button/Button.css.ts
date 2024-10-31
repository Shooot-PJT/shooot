import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';

export const button = recipe({
  base: {
    boxSizing: 'border-box',
    width: 'max-content',
    transition: 'all 0.5s ',
    cursor: 'pointer',
    textAlign: 'center',
    height: 'max-content',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'max-content',
      },
    },
    color: {
      primary: {
        backgroundColor: theme.palette.primary['main'],
        color: theme.palette.primary['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.primary['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.primary['active'],
        },
      },
      secondary: {
        backgroundColor: theme.palette.secondary['main'],
        color: theme.palette.secondary['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.secondary['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.secondary['active'],
        },
      },
      tertiary: {
        backgroundColor: theme.palette.tertiary['main'],
        color: theme.palette.tertiary['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.tertiary['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.tertiary['active'],
        },
      },
      get: {
        backgroundColor: theme.palette.get['main'],
        color: theme.palette.get['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.get['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.get['active'],
        },
      },
      post: {
        backgroundColor: theme.palette.post['main'],
        color: theme.palette.post['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.post['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.post['active'],
        },
      },
      put: {
        backgroundColor: theme.palette.put['main'],
        color: theme.palette.put['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.put['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.put['active'],
        },
      },
      patch: {
        backgroundColor: theme.palette.patch['main'],
        color: theme.palette.patch['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.patch['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.patch['active'],
        },
      },
      delete: {
        backgroundColor: theme.palette.delete['main'],
        color: theme.palette.delete['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.delete['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.delete['active'],
        },
      },
      grey: {
        backgroundColor: theme.palette.grey['main'],
        color: theme.palette.grey['contrastText'],
        ':hover': {
          backgroundColor: theme.palette.grey['hover'],
        },
        ':active': {
          backgroundColor: theme.palette.grey['active'],
        },
      },
      none: {
        backgroundColor: 'none',
        color: theme.palette.grey['main'],
        ':hover': {
          backgroundColor: theme.color.background['200'],
        },
        ':active': {
          backgroundColor: theme.color.background['200'],
        },
      },
    },
  },

  //
  defaultVariants: {
    fullWidth: false,
    color: 'primary',
  },
});
