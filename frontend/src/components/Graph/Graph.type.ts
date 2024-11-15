import { graphColorPalette } from './GraphColor';

export type GraphColor = Extract<
  keyof typeof graphColorPalette,
  'primary' | 'secondary' | 'tertiary' | 'get' | 'post' | 'put' | 'delete'
>;
