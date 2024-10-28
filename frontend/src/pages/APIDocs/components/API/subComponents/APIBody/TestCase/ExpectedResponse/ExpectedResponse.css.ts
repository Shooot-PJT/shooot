import { style } from '@vanilla-extract/css';
import { roundedBorder } from '../../TestCase/TestCaseTable/TestCaseTable.css';

export { roundedBorder };

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});
