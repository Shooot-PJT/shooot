import { recipe } from '@vanilla-extract/recipes';
import themeCss from '../../../../../../../styles/theme.css';

export const lockButton = recipe({
  base: {
    padding: '0.25rem',
    cursor: 'pointer',
    borderRadius: '1.25rem',
    transition: 'all 0.2s ease-in-out',
    width: '1rem',
    height: '1rem',
  },
  variants: {
    isSecure: {
      true: {
        backgroundColor: themeCss.color.background[200],
        selectors: {
          '&:hover': {
            backgroundColor: themeCss.color.background[300],
          },
          '&:active': {
            backgroundColor: themeCss.color.background[300],
          },
        },
      },
      false: {
        backgroundColor: 'transparent',
        selectors: {
          '&:hover': {
            backgroundColor: themeCss.color.background[100],
          },
          '&:active': {
            backgroundColor: themeCss.color.background[100],
          },
        },
      },
    },
  },
});
