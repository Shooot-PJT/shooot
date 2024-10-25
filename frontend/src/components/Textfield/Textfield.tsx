import React from 'react';
import * as s from './Textfield.css';
import { TextfieldColor } from './Textfield.types';

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: TextfieldColor;
  coloredLabel?: boolean;
  labelSize?: number;
  fullWidth?: boolean;
  size?: number;
  ratio?: number;
}

export const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  (
    {
      label,
      size = 2,
      labelSize = 1,
      color = 'primary',
      fullWidth = false,
      coloredLabel = false,
      ratio = 6,
      ...props
    },
    ref,
  ) => {
    const labelColor = coloredLabel ? color : 'default';
    return (
      <div className={s.container}>
        <div
          className={s.label({ labelColor })}
          style={
            {
              '--labelSize': `${labelSize}rem`,
            } as React.CSSProperties
          }
        >
          {label}
        </div>
        <input
          className={s.input({ color })}
          ref={ref}
          {...props}
          style={
            {
              '--height': `${size}rem`,
              '--width': `${fullWidth ? '100%' : size * ratio}rem`,
              '--fontSize': `${16 + (size - 2) * 2}px`,
            } as React.CSSProperties
          }
        />
      </div>
    );
  },
);
export default Textfield;
