import { recipe } from '@vanilla-extract/recipes';
import theme from '../../styles/theme.css';
import { TypographyColor, TypographyWeight } from './Typography.types';

export const typography = recipe({
  base: {
    margin: 0,
    userSelect: 'none',
  },

  variants: {
    color: Object.keys(theme.color.typography).reduce(
      (prev, cur) => {
        prev[cur as TypographyColor] = {
          color: theme.color.typography[cur as TypographyColor],
        };
        return prev;
      },
      {} as Record<TypographyColor, object>,
    ),

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
