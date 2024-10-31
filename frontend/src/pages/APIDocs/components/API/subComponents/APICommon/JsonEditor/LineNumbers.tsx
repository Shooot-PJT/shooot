import React from 'react';

interface LineNumbersProps {
  json: string;
}

export const LineNumbers: React.FC<LineNumbersProps> = ({ json }) => {
  const lineCount = json.split('\n').length;
  return (
    <div className="line-numbers">
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i} className="line-number">
          {i + 1}
        </div>
      ))}
    </div>
  );
};
