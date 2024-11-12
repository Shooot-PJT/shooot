import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import colorPalette from '../../../../../../../styles/colorPalette';
import { popIn } from '../../APIBody/RequestDocs/RequestContents/RequestSchemaTable/RequestSchemaTable.css';

export const editorContainer = style({
  height: '500px',

  color: '#fff', // 흰색 글자
  fontSize: '14px',
});

export const buttonStyle = style({
  marginTop: '10px',
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
});

export const responseContainer = recipe({
  base: {
    animation: `${popIn} 0.2s ease-in-out`,
    borderRadius: '1rem',
    transition: 'all 0.25s ease-in-out',
    overflow: 'auto',
  },
  variants: {
    hasJsonData: {
      // editor
      true: {
        height: '13rem',
      },
      // addButton
      false: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: colorPalette.util[300],
        height: '4rem',
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            backgroundColor: colorPalette.util[400],
          },
        },
      },
    },
  },
});
