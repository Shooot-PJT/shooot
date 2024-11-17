import { ReactNode, useState, useRef } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import * as s from './SelectBox.css.ts';
import Flexbox from '../../../../../../../components/Flexbox';

interface SelectBoxProps {
  value: number;
  onChange: (value: number) => void;
  options: ReactNode[];
}

export const SelectBox = ({ value = 0, onChange, options }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleValue = (index: number) => {
    setIsOpen(false);
    onChange(index);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useState(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={s.container} ref={containerRef}>
      <div className={s.selectBox} onClick={handleOpen}>
        <Flexbox justifyContents="between" alignItems="center">
          <div className={`${s.selectedItem}`}>{options[value]}</div>
          {isOpen ? <GoTriangleUp size={24} /> : <GoTriangleDown size={24} />}
        </Flexbox>
      </div>
      {isOpen && (
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
      )}
    </div>
  );
};
