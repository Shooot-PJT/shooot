import { ReactNode } from 'react';
import { TypographyColor, TypographyWeight } from './Typography.types';
import * as s from './Typography.css';

interface TypographyProps {
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
}: TypographyProps) => {
  return (
    <div
      className={s.typography({ color, weight })}
      style={{ fontSize: `${size}rem` }}
    >
      {children}
    </div>
  );
};

export default Typography;
