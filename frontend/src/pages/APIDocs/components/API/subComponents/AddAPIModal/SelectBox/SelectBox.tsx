/* frontend/src/pages/APIDocs/components/API/subComponents/AddAPIModal/SelectBox/SelectBox.tsx */
import { ReactNode, useState, useRef, useEffect } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import * as s from './SelectBox.css.ts'; // 스타일 파일 경로 확인 필요
import Flexbox from '../../../../../../../components/Flexbox';

export interface SelectBoxOption {
  label: ReactNode;
  value: string;
}

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectBoxOption[];
}

export const SelectBox = ({ value, onChange, options }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleValue = (selectedValue: string) => {
    setIsOpen(false);
    onChange(selectedValue);
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 현재 선택된 옵션의 라벨 찾기
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={s.container} ref={containerRef}>
      <div className={s.selectBox} onClick={handleOpen}>
        <Flexbox
          justifyContents="between"
          alignItems="center"
          style={{
            width: '100%',
          }}
        >
          <div className={s.selectedItem}>
            {selectedOption ? selectedOption.label : <em>선택 안 함</em>}
          </div>
          {isOpen ? <GoTriangleUp size={24} /> : <GoTriangleDown size={24} />}
        </Flexbox>
      </div>
      {isOpen && (
        <div className={`${s.expendBox} ${isOpen ? s.openBox : s.closeBox}`}>
          {options.length > 0 ? (
            options.map((option) => (
              <div
                className={s.optionItem}
                key={option.value}
                onClick={() => handleValue(option.value)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className={s.optionItem}>
              <em>옵션이 없습니다.</em>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
