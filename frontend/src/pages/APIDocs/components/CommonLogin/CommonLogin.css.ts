import { recipe } from '@vanilla-extract/recipes';
import palette from '../../../../styles/colorPalette';
import { style } from '@vanilla-extract/css';

export const header = recipe({
  base: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0.5rem 1rem',
    backgroundColor: palette.grey['900'],
    border: `0.0625rem solid ${palette.grey['800']}`,
  },

  variants: {
    order: {
      isFirst: {
        borderTopLeftRadius: '0.5rem',
      },
      isLast: {
        maxWidth: '3rem',
        borderTopRightRadius: '0.5rem',
      },
    },
  },
});

export const body = recipe({
  base: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0.5rem 1rem',
    backgroundColor: palette.grey['900'],
    border: `0.0625rem solid ${palette.grey['800']}`,
  },

  variants: {
    isLast: {
      true: {
        maxWidth: '3rem',
      },
    },
  },
});

export const bodyInput = style({
  width: '100%',
  height: '100%',
  color: 'white',
  fontFamily: 'Pretendard',
  fontSize: '0.875rem',
  fontWeight: '500',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});

export const addrow = style({
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.5rem 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: palette.grey['900'],
  borderBottomLeftRadius: '0.5rem',
  borderBottomRightRadius: '0.5rem',

  selectors: {
    '&:hover': {
      backgroundColor: palette.grey['800'],
      transition: 'all 150ms ease-in-out',
    },
  },
});
