import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../../../../styles/colorPalette';
import themeCss from '../../../../../../../styles/theme.css';
import { headerBarColorRecipeVariants } from '../../../API.css';

export const headerContainerRecipe = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0rem 0rem 0rem 1.5rem',
    backgroundColor: themeCss.color.background[300],
    border: '0.05rem solid',
    borderColor: colorPalette.util[400],
    borderRadius: '0.6rem',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
  },
  variants: headerBarColorRecipeVariants,
  defaultVariants: { isOpen: true },
});

export const testBodyContainerRecipe = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'normal',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
    opacity: 1,
    gap: '4rem',
    border: '0 0.07rem 0.07rem 0.07rem solid',
    borderRadius: '0rem 0rem 0.5rem 0.5rem',
    borderColor: colorPalette.util[400],
    backgroundColor: themeCss.color.background[200],
    padding: '0.75rem',
  },
  variants: {
    isOpen: {
      true: {
        maxHeight: '5000px',
        opacity: 1,
        pointerEvents: 'auto',
        marginBottom: '3rem',
      },
      false: {
        maxHeight: '0',
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});
