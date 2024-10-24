import theme from '../../styles/theme.css';

export type textfieldColor = Extract<
  keyof typeof theme.color.textfield,
  'primary' | 'secondary' | 'tertiary'
>;
