import { ReactNode } from 'react';
import {
  TypographyColor,
  TypographyElement,
  TypographyWeight,
} from './Typography.types';
import * as s from './Typography.css';

interface TypographyProps {
  children: ReactNode;
  color?: TypographyColor;
  size?: number;
  weight?: TypographyWeight;
  element?: TypographyElement;
}

const Typography = ({
  children = 'Typography',
  color,
  size = 1,
  weight,
  element: Element = 'p',
}: TypographyProps) => {
  console.log(color);
  return (
    <Element
      className={s.typography({ color, weight })}
      style={{ fontSize: `${size}rem` }}
    >
      {children}
    </Element>
  );
};

export default Typography;
