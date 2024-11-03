import { style } from '@vanilla-extract/css';
import theme from '../../../../../styles/theme.css';

export const preview = style({
  width: '7rem',
  height: '7rem',
  borderRadius: '0.5rem',
});

export const textarea = style({
  width: '100%',
  height: '7rem',
  boxSizing: 'border-box',
  padding: '1rem',
  borderRadius: '0.5rem',
  border: `0.125rem solid ${theme.color.textfield.border}`,
  backgroundColor: 'transparent',
  color: 'white',
  fontFamily: 'Pretendard',
  selectors: {
    '&:focus': {
      outline: 'none',
      border: `0.125rem solid ${theme.color.textfield.primary.borderActive}`,
    },
  },
});
