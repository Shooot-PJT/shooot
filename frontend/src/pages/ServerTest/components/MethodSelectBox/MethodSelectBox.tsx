import { ChangeEvent, FC } from 'react';
import * as s from './MethodSelectBox.css';
import { TestMethodType } from '../../types';

interface MethodSelectBoxProps {
  value: TestMethodType;
  onChange: (value: TestMethodType) => void;
  options: TestMethodType[];
}

export const MethodSelectBox: FC<MethodSelectBoxProps> = ({
  value,
  onChange,
  options,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as TestMethodType);
  };

  return (
    <select className={s.selectBox} value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
