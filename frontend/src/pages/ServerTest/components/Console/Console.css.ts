import { style } from '@vanilla-extract/css';
import colorPalette from '../../../../styles/colorPalette';
import themeCss from '../../../../styles/theme.css';

export const Header = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  height: '50px',
  borderRadius: '0.5rem 0.5rem 0rem 0rem',
  backgroundColor: themeCss.color.background[300],
});

export const HeaderWrapper = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});

export const container = style({});

export const Body = style({
  height: '330px',
  overflow: 'auto',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'block',
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: `${colorPalette.grey[500]}`,
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: `${colorPalette.util[300]}`,
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
  },
});

export const BodyWrapper = style({
  paddingRight: '1rem',
  backgroundColor: themeCss.color.background[100],
  paddingTop: '1rem',
  paddingBottom: '1rem',
});

export const BodyContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  fontSize: '16px',
  fontFeatureSettings: 'tnum',
  fontVariantNumeric: 'tabular-nums',
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
});

export const stateHeader = style({
  display: 'flex',
  alignItems: 'center',
});

export const stopSquareActive = style({
  width: '16px',
  height: '16px',
  backgroundColor: colorPalette.deepOrange[500],
  borderRadius: '0.1rem',
});

export const stopSquareDisabled = style({
  width: '16px',
  height: '16px',
  backgroundColor: colorPalette.grey[500],
  borderRadius: '0.1rem',
});

export const stopButtonActive = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginRight: '2rem',
  fontWeight: '600',
  color: colorPalette.deepOrange[500],
  cursor: 'pointer',
});

export const stopButtonDisabled = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginRight: '2rem',
  fontWeight: '600',
  color: colorPalette.grey[500],
});

export const BodyContentItem = style({
  fontFamily: 'Consolas' /* Monospace font to align characters */,
  whiteSpace: 'pre-line' /* Preserve whitespace and formatting */,
  lineHeight: '1.6' /* Adjust as needed for proper spacing */,
  fontSize: '12px' /* Adjust font size to fit the art */,
  margin: 0,
  padding: 0,
});
