import { style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const apiRootContainer = style({
  width: '100%',
  alignItems: 'center',
  textAlign: 'center',
  lineHeight: 'normal',
});

export const apiHeaderBoxRecipe = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '3.5rem',
    width: '100%',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    gap: '1.5rem',
    borderRadius: '0.75rem',
    overflow: 'hidden',
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

export const apiHeaderLeftContentStyle = {
  gap: '1.25rem',
  width: '32%',
  height: '100%',
};
export const apiHeaderRightContentStyle = {
  flex: 1,
  height: '100%',
};

export const fullBoxStyle = {
  height: '100%',
  width: '100%',
};
