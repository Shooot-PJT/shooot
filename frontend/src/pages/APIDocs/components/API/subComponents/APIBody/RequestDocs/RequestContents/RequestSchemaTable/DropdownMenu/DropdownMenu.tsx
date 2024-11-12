import React, { useState, useRef, useEffect } from 'react';
import * as styles from './DropdownMenu.css';

interface DropdownMenuProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
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

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button className={styles.buttonStyle} onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </button>
      {isOpen && (
        <div className={styles.menuStyle}>
          {options.map((option) => (
            <div
              key={option}
              className={
                selected === option
                  ? styles.selectedOptionStyle
                  : styles.optionStyle
              }
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
