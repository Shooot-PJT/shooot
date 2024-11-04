import React, { ReactNode, useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import { editorContainer, responseContainer } from './styles.css';
import Button from '../../../../../../../components/Button';
import * as monaco from 'monaco-editor';
import draculaTheme from 'monaco-themes/themes/Dracula.json';

import { parse, ParseError } from 'jsonc-parser';
import { getJsonErrorMessage } from './JsonEditor.utils';

import PopupPortal from '../../../../../../../hooks/usePopup/PopupPortal';
import usePopup from '../../../../../../../hooks/usePopup';
import Typography from '../../../../../../../components/Typography';
import Icon from '../../../../../../../components/Icon';
import { HiPlusCircle } from 'react-icons/hi2';
import Flexbox from '../../../../../../../components/Flexbox';

interface JsonEditorProps {
  jsonData?: object;
  isEditing: boolean;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonData }) => {
  const [hasJsonData] = useState<boolean>(!!jsonData);

  const popup = usePopup();

  const pushPopup = (
    title: string,
    children: ReactNode,
    type: 'success' | 'fail',
    onClose?: () => void,
  ) => {
    popup.push({
      title: title,
      children: (
        <Typography weight="500" size={0.875}>
          {children}
        </Typography>
      ),
      type: type,
      onClose: onClose,
    });
  };

  //
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    monacoInstance.editor.defineTheme(
      'dracula',
      draculaTheme as monaco.editor.IStandaloneThemeData,
    );
    monacoInstance.editor.setTheme('dracula');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (editorRef.current && jsonData) {
      editorRef.current.setValue(JSON.stringify(jsonData, null, 2));
    }
    setIsEditing(false);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      const errors: ParseError[] = [];
      const parsedJson = parse(value, errors);

      if (errors.length > 0) {
        const errorMessages = errors.map(
          (e) => `${e.offset}번째 문자: ${getJsonErrorMessage(e.error)}`,
          PopupPortal,
        );

        pushPopup(
          'JSON 저장 실패',
          <>
            <Typography>저장 중 오류가 발생했습니다.</Typography>
            <br />
            <Typography color="delete">{errorMessages.join('\n')}</Typography>
          </>,
          'fail',
        );
      } else {
        setIsEditing(false);
        console.log('저장된 JSON 값:', parsedJson);
      }
    }
  };

  return (
    <div>
      {isEditing ? (
        <Flexbox
          flexDirections="row"
          style={{
            gap: '0.5rem',
          }}
        >
          <Button onClick={handleSave}>확인</Button>
          <Button onClick={handleCancel}>취소</Button>
        </Flexbox>
      ) : (
        <Button onClick={handleEdit}>편집</Button>
      )}

      <div className={responseContainer({ hasJsonData })}>
        {hasJsonData ? (
          <Editor
            height="10rem"
            defaultLanguage="json"
            defaultValue={JSON.stringify(jsonData, null, 2)}
            theme="dracula"
            options={{
              readOnly: !isEditing, // isEditing은 위에서 내려주는거 써야함
              lineNumbers: 'on',
              folding: true,
              minimap: { enabled: false },
              renderLineHighlightOnlyWhenFocus: true,
            }}
            onMount={handleEditorDidMount}
            className={editorContainer}
          />
        ) : (
          <AddIcon />
        )}
      </div>
    </div>
  );
};

const AddIcon = () => {
  return (
    <Icon background="none" color="light" size={3.5}>
      <HiPlusCircle />
    </Icon>
  );
};
export default JsonEditor;
