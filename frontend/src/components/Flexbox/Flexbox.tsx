import { CSSProperties, ReactNode } from 'react';
import theme from '../../styles/theme.css';

interface FlexboxProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flexWrap?: CSSProperties['flexWrap'];
  rowGap?: number;
  columnGap?: number;
  rounded?: number;
  padding?: string;
  margin?: string;
  bg?: 100 | 200 | 300 | string;
  overflow?: CSSProperties['overflow'];
}

const Flexbox = ({
  children,
  flexDirection = 'row',
  justifyContent = 'center',
  alignItems = 'center',
  flexWrap = 'nowrap',
  rowGap = 0,
  columnGap = 0,
  rounded = 0,
  padding = '0',
  margin = '0',
  bg,
  overflow = 'visible',
  ...props
}: FlexboxProps) => {
  const style: CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: flexDirection,
    justifyContent: justifyContent,
    alignItems: alignItems,
    flexWrap: flexWrap,
    rowGap: `${rowGap}rem`,
    columnGap: `${columnGap}rem`,
    borderRadius: `${rounded}rem`,
    padding: padding,
    margin: margin,
    overflow: overflow,
  };

  if (bg !== undefined) {
    style.backgroundColor =
      bg === 100 || bg === 200 || bg === 300 ? theme.color.background[bg] : bg;
  }

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
};

export default Flexbox;
