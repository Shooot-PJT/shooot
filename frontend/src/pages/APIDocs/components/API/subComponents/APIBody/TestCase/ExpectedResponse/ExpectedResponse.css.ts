import { style } from '@vanilla-extract/css';

import colorPalette from '../../../../../../../../styles/colorPalette';

// export { roundedBorder };

export const containerStyle = {
  gap: '0.5rem',
};

const expectedResponseCommon = {
  padding: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: colorPalette.util[300],
};
export const addButton = style({
  ...expectedResponseCommon,
  cursor: 'pointer',
  transition: 'all 0.25s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: colorPalette.util[400],
    },
  },
});

export const expectedResponseBox = style({
  ...expectedResponseCommon,
  height: '8rem',
});
