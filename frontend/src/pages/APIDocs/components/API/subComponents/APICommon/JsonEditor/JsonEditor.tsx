import React, {
  // ReactNode,
  useRef,
  // , useState
} from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import { editorContainer, responseContainer } from './styles.css';
import * as monaco from 'monaco-editor';
import draculaTheme from 'monaco-themes/themes/Dracula.json';

// import { parse, ParseError } from 'jsonc-parser';
// import { getJsonErrorMessage } from './JsonEditor.utils';

// import PopupPortal from '../../../../../../../hooks/usePopup/PopupPortal';
// import usePopup from '../../../../../../../hooks/usePopup';
// import Typography from '../../../../../../../components/Typography';

// import Flexbox from '../../../../../../../components/Flexbox';

interface JsonEditorProps {
  jsonData?: object;
  isEditing: boolean;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonData, isEditing }) => {
  // const [
  // hasJsonData,
  //   setHasJsonData,
  // ] = useState<boolean>(!!jsonData);

  // const onClickAddButton = () => {
  //   setHasJsonData(true);
  // };
  // const popup = usePopup();

  // const pushPopup = (
  //   title: string,
  //   children: ReactNode,
  //   type: 'success' | 'fail',
  //   onClose?: () => void,
  // ) => {
  //   popup.push({
  //     title: title,
  //     children: (
  //       <Typography weight="500" size={0.875}>
  //         {children}
  //       </Typography>
  //     ),
  //     type: type,
  //     onClose: onClose,
  //   });
  // };

  //
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  // const [isEditing, setIsEditing] = useState(false);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    monacoInstance.editor.defineTheme(
      'dracula',
      draculaTheme as monaco.editor.IStandaloneThemeData,
    );
    monacoInstance.editor.setTheme('dracula');
  };

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  // const handleCancel = () => {
  //   if (editorRef.current && jsonData) {
  //     editorRef.current.setValue(JSON.stringify(jsonData, null, 2));
  //   }
  //   setIsEditing(false);
  // };

  // const handleSave = () => {
  //   if (editorRef.current) {
  //     const value = editorRef.current.getValue();
  //     const errors: ParseError[] = [];
  //     const parsedJson = parse(value, errors);

  //     if (errors.length > 0) {
  //       const errorMessages = errors.map(
  //         (e) => `${e.offset}번째 문자: ${getJsonErrorMessage(e.error)}`,
  //         PopupPortal,
  //       );

  //       pushPopup(
  //         'JSON 저장 실패',
  //         <>
  //           <Typography>저장 중 오류가 발생했습니다.</Typography>
  //           <br />
  //           <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
  //             {errorMessages.map((msg) => (
  //               <Typography color="delete">{msg}</Typography>
  //             ))}
  //           </Flexbox>
  //         </>,
  //         'fail',
  //       );
  //     } else {
  //       // setIsEditing(false);
  //       console.log('저장된 JSON 값:', parsedJson);
  //     }
  //   }
  // };

  return (
    <div>
      {/* {isEditing ? (
        <Flexbox
          flexDirections="row"
          style={{
            gap: '0.5rem',
          }}
        >
          <Button color="grey" rounded={0.3} onClick={handleCancel}>
            취소
          </Button>
          <Button rounded={0.3} onClick={handleSave}>
            확인
          </Button>
        </Flexbox>
      ) : (
        <Button color="grey" rounded={0.3} onClick={handleEdit}>
          편집
        </Button>
      )} */}

      <div
        className={responseContainer({
          hasJsonData: true,
        })}
      >
        {/* {hasJsonData ? ( */}
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
        {/* )
          : (
          <AddIcon onClick={onClickAddButton} />
          )
        } */}
      </div>
    </div>
  );
};

// const AddIcon = ({ onClick }: { onClick: () => void }) => {
//   return (
//     <div onClick={onClick}>
//       <Icon background="none" color="light" size={3.5}>
//         <HiPlusCircle />
//       </Icon>
//     </div>
//   );
// };
export default JsonEditor;
