import { recipe } from '@vanilla-extract/recipes';

export const flexbox = recipe({
  base: {
    display: 'flex',
    boxSizing: 'border-box',
  },

  variants: {
    flexDirections: {
      row: { flexDirection: 'row' },
      'row-rev': { flexDirection: 'row-reverse' },
      col: { flexDirection: 'column' },
      'col-rev': { flexDirection: 'column-reverse' },
    },
    justifyContents: {
      normal: { justifyContent: 'normal' },
      center: { justifyContent: 'center' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
      start: { justifyContent: 'start' },
      end: { justifyContent: 'end' },
      stretch: { justifyContent: 'stretch' },
    },
    alignItems: {
      normal: { alignItems: 'normal' },
      center: { alignItems: 'center' },
      start: { alignItems: 'start' },
      end: { alignItems: 'end' },
      stretch: { alignItems: 'stretch' },
    },
  },
});
