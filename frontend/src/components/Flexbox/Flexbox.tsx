import { CSSProperties, ReactNode } from 'react';
import * as s from './Flexbox.css';

interface FlexboxProps {
  children?: ReactNode;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flexWrap?: CSSProperties['flexWrap'];
  rowGap?: string;
  columnGap?: string;
  borderRadius?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
  bg: 100 | 200 | 300;
}

const Flexbox = ({ children, bg = 100, ...props }: FlexboxProps) => {
  return (
    <div className={s.flexbox({ bg })} style={{ ...props }}>
      {children}
    </div>
  );
};

export default Flexbox;
