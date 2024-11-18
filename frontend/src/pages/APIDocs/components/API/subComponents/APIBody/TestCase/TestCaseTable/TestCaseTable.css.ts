import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import themeCss from '../../../../../../../../styles/theme.css';
import colorPalette from '../../../../../../../../styles/colorPalette';
import { headerBarColorRecipeVariants } from '../../../../API.css';

export const container = style({
  border: '1px solid #ddd',
  borderRadius: '0.5rem',
  padding: '1rem',
  marginBottom: '2rem',
});

export const buttonGroup = style({
  marginTop: '0.5rem',
});

export const formGroup = style({
  marginBottom: '1rem',
});

export const formGroupLabel = style({
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 600,
});

export const formGroupInput = style({
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '0.25rem',
});

export const formGroupSelect = style({
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '0.25rem',
});

export const formActions = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
});

export const bodyTypeSelector = style({
  marginBottom: '1rem',
});

export const bodyTypeSelectorLabel = style({
  marginRight: '1rem',
});

export const containerForm = style({
  display: 'flex',
  flexDirection: 'column',
});

export const addTestCaseForm = style({
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '0.5rem',
  marginBottom: '2rem',
});

export const cellViewStyle = style({
  padding: '0.5rem',
});

//
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
    gap: '2rem',
    border: '0 0.07rem 0.07rem 0.07rem solid',
    borderRadius: '0rem 0rem 0.5rem 0.5rem',
    borderColor: colorPalette.util[400],
    backgroundColor: themeCss.color.background[200],
    padding: '2rem',
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
