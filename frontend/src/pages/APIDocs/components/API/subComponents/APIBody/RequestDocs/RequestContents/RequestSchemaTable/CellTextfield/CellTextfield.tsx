import React from 'react';

interface CellTextFieldProps {
  value: string;
  onChange: (newValue: string) => void;
}

const CellTextField: React.FC<CellTextFieldProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        height: '100%',
        padding: '0.4rem',
        fontSize: '14px',
        border: 'none',
        backgroundColor: '#333',
        color: '#fff',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default CellTextField;
