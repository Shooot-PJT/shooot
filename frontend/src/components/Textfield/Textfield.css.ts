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
    margin: '0.25rem',
    fontSize: 'var(--labelSize, 1rem)',
    fontWeight: '700',
  },
  variants: {
    color: {
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
    },
  },
});

export const input = recipe({
  base: {
    height: 'var(--height, 2rem)',
    width: 'var(--width, 10rem)',
    borderRadius: '0.5rem',
    transition: 'all 0.5s',
    background: theme.color.textfield.background,
    fontSize: 'var(--fontSize, 16px)',
    selectors: {
      '&::placeholder': {
        color: theme.color.textfield.placeholder,
        paddingLeft: '0.25rem',
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
        border: `4px solid ${theme.color.textfield.primary.border}`,
        '&:focus': {
          border: `4px solid ${theme.color.textfield.primary.borderActive}`,
        },
      },
      secondary: {
        color: theme.color.textfield.secondary.fontColor,
        border: `4px solid ${theme.color.textfield.secondary.border}`,
        '&:focus': {
          border: `4px solid ${theme.color.textfield.secondary.borderActive}`,
        },
      },
      tertiary: {
        color: theme.color.textfield.tertiary.fontColor,
        border: `4px solid ${theme.color.textfield.tertiary.border}`,
        '&:focus': {
          border: `4px solid ${theme.color.textfield.tertiary.borderActive}`,
        },
      },
      grey: {
        color: theme.color.textfield.grey.fontColor,
        border: `4px solid ${theme.color.textfield.grey.border}`,
        '&:focus': {
          border: `4px solid ${theme.color.textfield.grey.borderActive}`,
        },
      },
    },
  },
});
