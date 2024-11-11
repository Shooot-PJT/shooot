import React from 'react';

interface UrlTextfieldProps {
  value: string;
  onChange: (newValue: string) => void;
}

const UrlTextField: React.FC<UrlTextfieldProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
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

export default UrlTextField;
