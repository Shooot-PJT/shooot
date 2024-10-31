import React, { ReactNode } from 'react';
import { IconColor } from './Icon.types';
import theme from '../../styles/theme.css';
import { icon } from './Icon.css';

interface IconProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  size?: number;
  color?: IconColor;
  background?: IconColor | 'none';
  rounded?: number;
}

const Icon = ({
  children,
  size = 1,
  color = 'primary',
  background,
  rounded = 1,
  ...props
}: IconProps) => {
  return (
    <div
      className={icon}
      style={{
        padding: background === 'none' ? '0' : `${size / 2}rem`,
        color: theme.color.icon[color],
        backgroundColor: background
          ? background === 'none'
            ? 'none'
            : theme.color.iconbackground[background]
          : theme.color.iconbackground[color],
        borderRadius: `${rounded}rem`,
      }}
      {...props}
    >
      {React.cloneElement(children as React.ReactElement, {
        style: { width: `${size}rem`, height: `${size}rem` },
      })}
    </div>
  );
};

export default Icon;
