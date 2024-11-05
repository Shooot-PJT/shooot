import { style } from '@vanilla-extract/css';
import themeCss from '../../../../styles/theme.css';

export const Header = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  height: '50px',
  borderRadius: '0.5rem 0.5rem 0rem 0rem',
  backgroundColor: themeCss.color.background[300],
});

export const Body = style({
  backgroundColor: themeCss.color.background[100],
  maxHeight: '360px',
  overflow: 'auto',
});

export const BodyContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  fontSize: '12px',
  marginLeft: '0.5rem',
});
