import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
  height: 'auto',
});

export const label = recipe({
  base: {
    fontFamily: 'Pretendard',
    margin: '0.25rem',
    fontSize: 'var(--labelSize, 1rem)',
    fontWeight: '700',
  },
  variants: {
    labelColor: {
      primary: {
        color: theme.color.textfield.primary.borderActive,
      },
      secondary: {
        color: theme.color.textfield.secondary.borderActive,
      },
      tertiary: {
        color: theme.color.textfield.tertiary.borderActive,
      },
      grey: {
        color: theme.color.textfield.grey.borderActive,
      },
      get: {
        color: theme.color.textfield.get.borderActive,
      },
      post: {
        color: theme.color.textfield.post.borderActive,
      },
      put: {
        color: theme.color.textfield.put.borderActive,
      },
      delete: {
        color: theme.color.textfield.delete.borderActive,
      },
      default: {
        color: theme.color.textfield.border,
      },
    },
  },
});

export const input = recipe({
  base: {
    fontFamily: 'Pretendard',
    height: 'var(--height, 2rem)',
    width: 'var(--width, 10rem)',
    borderRadius: '0.5rem',
    transition: 'all 0.33s',
    paddingLeft: '1rem',
    background: theme.color.textfield.background,
    fontSize: 'var(--fontSize, 16px)',
    border: `2px solid ${theme.color.textfield.border}`,
    selectors: {
      '&::placeholder': {
        color: theme.color.textfield.placeholder,
      },
      '&:focus': {
        outline: 'none',
      },
    },
  },
  variants: {
    color: {
      primary: {
        color: theme.color.textfield.primary.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.primary.borderActive}`,
        },
      },
      secondary: {
        color: theme.color.textfield.secondary.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.secondary.borderActive}`,
        },
      },
      tertiary: {
        color: theme.color.textfield.tertiary.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.tertiary.borderActive}`,
        },
      },
      grey: {
        color: theme.color.textfield.grey.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.grey.borderActive}`,
        },
      },
      get: {
        color: theme.color.textfield.get.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.get.borderActive}`,
        },
      },
      post: {
        color: theme.color.textfield.post.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.post.borderActive}`,
        },
      },
      put: {
        color: theme.color.textfield.put.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.put.borderActive}`,
        },
      },
      delete: {
        color: theme.color.textfield.delete.fontColor,
        '&:focus': {
          border: `2px solid ${theme.color.textfield.delete.borderActive}`,
        },
      },
    },
  },
});
