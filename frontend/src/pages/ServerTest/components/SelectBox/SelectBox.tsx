import { ReactNode, useState } from 'react';
import { GoTriangleUp } from 'react-icons/go';
import { GoTriangleDown } from 'react-icons/go';
import * as s from './SelectBox.css';
import Flexbox from '../../../../components/Flexbox';

interface SelectBoxProps {
  value: number;
  onChange: (value: number) => void;
  options: ReactNode[];
}

export const SelectBox = ({ value = 0, onChange, options }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleValue = (index: number) => {
    setIsOpen(false);
    onChange(index);
    console.log(index);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.container}>
      <div className={s.selectBox} onClick={handleOpen}>
        <Flexbox justifyContents="between" alignItems="center">
          <div className={`${s.selectedItem}`}>{options[value]}</div>
          {isOpen ? <GoTriangleUp size={24} /> : <GoTriangleDown size={24} />}
        </Flexbox>
      </div>
      <div className={`${s.expendBox} ${!isOpen ? s.closeBox : s.openBox}`}>
        {options.map((option, index) => (
          <div
            className={s.optionItem}
            key={index}
            onClick={() => handleValue(index)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
