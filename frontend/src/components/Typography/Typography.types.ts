import theme from '../../styles/theme.css';

export type TypographyColor = keyof typeof theme.color.typography;
export type TypographyWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
