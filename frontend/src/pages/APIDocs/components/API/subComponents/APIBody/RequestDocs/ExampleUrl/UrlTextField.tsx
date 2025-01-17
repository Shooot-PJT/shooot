import React from 'react';
import { APIDetailInfo } from '../../../../../../types/data/API.data';

interface UrlTextfieldProps {
  value: APIDetailInfo['requestDocs']['example_url'];
  onChange: (newValue: string) => void;
}

export const UrlTextField: React.FC<UrlTextfieldProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value || ''}
      onChange={handleChange}
      placeholder="ex) https://shooot.co.kr/api/user/1"
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
