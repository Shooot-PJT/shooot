import { style } from '@vanilla-extract/css';

export const TotalTimeIndicator = style({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'space-around',
  alignItems: 'center',
});

export const FullSection = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
});

export const LeftSection = style({
  gridColumn: '1',
  margin: '1rem',
});

export const RightSection = style({
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'end',
  gridColumn: '2',
  paddingRight: '1rem',
  paddingBottom: '1rem',
});

export const SectionItem = style({
  display: 'grid',
  gridTemplateColumns: '4fr 1fr 2fr',
  gap: '1rem',
});

export const option = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
});
