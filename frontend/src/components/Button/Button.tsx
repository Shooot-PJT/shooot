import { ReactNode } from 'react';
import { ButtonColor } from './Button.types';
import * as s from './Button.css';

interface ButtonProps {
  children: ReactNode;
  color?: ButtonColor | 'none';
  rounded?: number;
  fullWidth?: boolean;
  paddingX?: number;
  paddingY?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children = '버튼',
  rounded = 0.75,
  color = 'primary',
  fullWidth,
  paddingX = 1.25,
  paddingY = 0.5,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={s.button({ color, fullWidth })}
      style={{
        borderRadius: `${rounded}rem`,
        padding: `${paddingY}rem ${paddingX}rem`,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};

export default Button;
