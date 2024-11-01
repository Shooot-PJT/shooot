import { style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';

export const container = style({
  width: '600px',
  height: '60px',
  border: '2px solid black',
  backgroundColor: `${themeCss.color.background[100]}`,
  borderRadius: '0.5rem',
});

export const uploadBox = style({
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateColumns: '1fr 5fr 1fr 1fr',
});

export const icon = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gridColumn: '1/2',
});

export const fileSize = style({
  alignSelf: 'center',
  gridColumn: '3/4',
  fontSize: '12px',
  fontWeight: '600',
  marginRight: '0.25rem',
});

export const uploadButton = style({
  alignSelf: 'center',
  gridColumn: '4/5',
  marginRight: '1rem',
});
