import React from 'react';
import * as s from './Checkbox.css';

interface CheckboxProps {
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => (
  <label className={s.checkboxLabel}>
    <input
      type="checkbox"
      className={s.hiddenCheckbox}
      checked={checked}
      onChange={onChange}
    />
    <span className={s.checkboxSymbol}>
      <svg
        width="28px"
        height="28px"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 14l8 7L24 7"
          className={checked ? s.checkedPath : s.uncheckedPath}
        ></path>
      </svg>
    </span>
  </label>
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
