import { style } from '@vanilla-extract/css';
import { popIn } from '../RequestSchemaTable/RequestSchemaTable.css';
import colorPalette from '../../../../../../../../../styles/colorPalette';

export const bodNone = style({
  animation: `${popIn} 0.2s ease-in-out`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.75rem',
  width: '100%',
  backgroundColor: colorPalette.grey[800],
  padding: '2rem 0rem',
});
