import { graphColorPalette } from './GraphColor';

export type GraphColor = Extract<
  keyof typeof graphColorPalette,
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'grey'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
>;
