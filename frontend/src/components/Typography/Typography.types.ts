import theme from '../../styles/theme.css';

export type TypographyElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
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
