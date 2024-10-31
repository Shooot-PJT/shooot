import React, { useState, useRef } from 'react';
import { EditorHeader } from './EditorHeader';
import { LineNumbers } from './LineNumbers';
import { validateJson, formatJson, minifyJson } from './utils';
import * as s from './index.css';
import { TextareaAutosize } from '@mui/material';

{
  /*
  TODO:
  1. {}, [] 스택 관리로 유효성 검사 및 들여쓰기 관리 에디팅
  2. JSON 데이터타입에 따른 마크업, 유효성 검사
  3. 레이아웃, 스타일링
  */
}

export const JsonEditor: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('{}');
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJsonInput(value);
    const error = validateJson(value);
    setError(error);
  };

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const handleFormat = () => setJsonInput(formatJson(jsonInput));
  const handleMinify = () => setJsonInput(minifyJson(jsonInput));

  return (
    <div>
      <EditorHeader
        isEditMode={isEditMode}
        toggleEditMode={toggleEditMode}
        handleFormat={handleFormat}
        handleMinify={handleMinify}
      />
      <div className={s.editorArea}>
        <LineNumbers json={jsonInput} />
        <TextareaAutosize
          ref={editorRef}
          value={jsonInput}
          onChange={handleInputChange}
          className={s.textArea}
          readOnly={!isEditMode}
        />
      </div>
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
};
