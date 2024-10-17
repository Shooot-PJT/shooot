import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';
import { TypographyColor, TypographyWeight } from './Typography.types';

export const typography = recipe({
  base: {
    margin: 0,
    userSelect: 'none',
  },

  variants: {
    /*color: Object.keys(theme.color.typography).reduce(
      (prev, cur) => {
        prev[cur as TypographyColor] = {
          color: theme.color.typography[cur as TypographyColor],
        };
        return prev;
      },
      {} as Record<TypographyColor, object>,
    ),*/

    color: {
      primary: {
        color: theme.color.typography.primary,
      },
      secondary: { color: theme.color.typography.secondary },
      tertiary: { color: theme.color.typography.tertiary },
      get: { color: theme.color.typography.get },
      post: { color: theme.color.typography.post },
      put: { color: theme.color.typography.put },
      patch: { color: theme.color.typography.patch },
      delete: { color: theme.color.typography.delete },
      originalRed: { color: theme.color.typography.originalRed },
      originalBlue: { color: theme.color.typography.originalBlue },
      originalGreen: { color: theme.color.typography.originalGreen },
      disabled: { color: theme.color.typography.disabled },
      light: { color: theme.color.typography.light },
      dark: { color: theme.color.typography.dark },
    },

    weight: Array.from(
      { length: 9 },
      (_, i) => ((i + 1) * 100).toString() as TypographyWeight,
    ).reduce(
      (prev, cur) => {
        prev[cur as TypographyWeight] = {
          fontWeight: cur,
        };
        return prev;
      },
      {} as Record<TypographyWeight, object>,
    ),
  },

  defaultVariants: {
    color: 'light',
    weight: '500',
  },
});
