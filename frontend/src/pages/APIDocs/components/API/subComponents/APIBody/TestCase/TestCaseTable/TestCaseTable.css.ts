import { style } from '@vanilla-extract/css';
import themeCss from '../../../../../../../../styles/theme.css';
import colorPalette from '../../../../../../../../styles/colorPalette';

export const roundedBorder = style({
  borderColor: colorPalette.util[400],
  border: '0.05rem solid',
  borderRadius: '0.75rem',
});

export const container = style({
  width: '100%',
  backgroundColor: themeCss.color.background[200],
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const tableSection = style({
  backgroundColor: themeCss.color.background[100],
  borderRadius: '0.5rem',
  border: '0.05rem solid #e8e8e8',
});

export const urlViewerBar = style({
  padding: '1rem 1.5rem',
  backgroundColor: themeCss.color.background[300],
  textAlign: 'left',
  borderRadius: '0.5rem',
  border: '1px solid #555c72',
});
