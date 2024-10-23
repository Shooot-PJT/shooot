import { style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const apiRootContainer = style({
  width: '100%',
  height: '3rem',
  alignItems: 'center',
  textAlign: 'center',
});
export const fullBoxStyle = style({
  height: '100%',
  width: '100%',
});

export const apiHeaderBoxStyle = recipe({
  base: {
    height: '100%',
    width: '100%',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
  },
  variants: {
    isOpen: {
      false: {
        backgroundColor: themeCss.color.background[300],
        selectors: {
          '&:hover': {
            backgroundColor: themeCss.color.background[200],
          },
          '&:active': {
            backgroundColor: themeCss.color.background[100],
          },
        },
      },
      true: {
        backgroundColor: themeCss.color.background[100],
        selectors: {
          '&:hover': {
            backgroundColor: themeCss.color.background[200],
          },
          '&:active': {
            backgroundColor: themeCss.color.background[300],
          },
        },
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export const apiHeaderLeftContentStyle = style({
  width: '32%',
  height: '100%',
});
export const apiHeaderRightContentStyle = style({
  flex: 1,
  height: '100%',
});
