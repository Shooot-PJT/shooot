import { style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';

export const Container = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeCss.color.background[200],
  gap: '1rem',
  padding: '1rem 0rem 1rem 0rem',
});

export const FormGrid = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr 2fr',
  alignItems: 'center',
  columnGap: '1rem',
  width: '100%',
  margin: '0rem 0rem 0rem 2rem',
  maxWidth: '500px',
});

export const conditionIndicator = style({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  top: '20%',
  left: '32%',
  fontWeight: '700',
  gap: '1rem',
});
