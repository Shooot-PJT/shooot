import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';

export const button = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    alignItems: 'center',
    justifyContent: 'center',
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
        ':disabled': {
          backgroundColor: theme.palette.grey['main'],
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
