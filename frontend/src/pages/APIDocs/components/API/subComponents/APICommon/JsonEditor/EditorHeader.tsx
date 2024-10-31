import React from 'react';
import Button from '../../../../../../../components/Button';
import Flexbox from '../../../../../../../components/Flexbox';

interface EditorHeaderProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  handleFormat: () => void;
  handleMinify: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  isEditMode,
  toggleEditMode,
  handleFormat,
  handleMinify,
}) => (
  <Flexbox
    style={{
      gap: '1rem',
    }}
  >
    <Button onClick={toggleEditMode}>{isEditMode ? '저장' : '편집'}</Button>
    <Button onClick={handleFormat}>JSON 포맷팅</Button>
    <Button onClick={handleMinify}>JSON 압축</Button>
  </Flexbox>
);
