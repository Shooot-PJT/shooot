import theme from '../../styles/theme.css';

export type TextfieldColor = Extract<
  keyof typeof theme.color.textfield,
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'grey'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'none'
>;
