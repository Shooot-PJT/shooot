import { ReactNode } from 'react';
import { TypographyColor, TypographyWeight } from './Typography.types';
import * as s from './Typography.css';

interface TypographyProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: TypographyColor;
  size?: number;
  weight?: TypographyWeight;
}

const Typography = ({
  children = 'Typography',
  color,
  size = 1,
  weight,
  ...props
}: TypographyProps) => {
  return (
    <div
      className={s.typography({ color, weight })}
      style={{ fontSize: `${size}rem` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Typography;
