import { style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../styles/colorPalette';

export const apiRootContainer = style({
  width: '100%',
  alignItems: 'center',
  textAlign: 'center',
  lineHeight: 'normal',
});

export const headerBarColorRecipeVariants = {
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
};

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
  variants: headerBarColorRecipeVariants,
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

export const apiBodyContainerStyle = {
  gap: '2rem',
  backgroundColor: themeCss.color.background[100],
  borderBottomLeftRadius: '1rem',
  borderBottomRightRadius: '1rem',
  padding: '2rem 3rem',
};

export const apiBodyTopContainerStyle = {
  gap: '3rem',
  paddingBottom: '1rem',
  borderBottom: '0.1rem solid',
  borderColor: colorPalette.util[400],
};

export const leftDividerRecipe = recipe({
  base: {
    width: '75%',
    height: '0.35rem',
  },
  variants: {
    method: {
      post: {
        backgroundColor: themeCss.palette.post.main,
      },
      get: {
        backgroundColor: themeCss.palette.get.main,
      },
      put: {
        backgroundColor: themeCss.palette.put.main,
      },
      patch: {
        backgroundColor: themeCss.palette.patch.main,
      },
      delete: {
        backgroundColor: themeCss.palette.delete.main,
      },
    },
  },
});

export const apiBodyContainerRecipe = recipe({
  base: {
    overflow: 'hidden',
    transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out',
    opacity: 1,
  },
  variants: {
    isOpen: {
      true: {
        maxHeight: '500rem',
        opacity: 1,
        pointerEvents: 'auto',
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
