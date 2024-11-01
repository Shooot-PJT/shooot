import { useRef, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Textfield from '../../../../components/Textfield';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import * as s from './AddProjectModal.css';
import { UploadFile } from '../UploadFile/UploadFile';
export const AddProjectModal = () => {
  const [validationFiles, setValidationFiles] = useState<
    Record<string, boolean>
  >({ projectId: false, jar: false, yml: false });
  const jarRef = useRef<HTMLInputElement>(null);
  const ymlRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modal = useModal();

  const handlevalidationText = () => {
    if (inputRef.current && inputRef.current.value.length > 0) {
      setValidationFiles((prev) => ({
        ...prev,
        ['projectId']: true,
      }));
    } else {
      setValidationFiles((prev) => ({
        ...prev,
        ['projectId']: false,
      }));
    }
  };

  const handlevalidateFile = (extension: string, requireExtension: string) => {
    if (extension === requireExtension) {
      setValidationFiles((prevFiles) => ({
        ...prevFiles,
        [requireExtension]: true,
      }));
    } else {
      setValidationFiles((prevFiles) => ({
        ...prevFiles,
        [requireExtension]: false,
      }));
    }
  };

  const handleSubmit = () => {
    console.log(jarRef.current.files[0]);
    console.log(ymlRef.current.files[0]);
  };

  return (
    <div className={s.container}>
      <Flexbox
        flexDirections="col"
        style={{ gap: '1.5rem', marginBottom: '2rem' }}
      >
        <Typography size={1.5}>프로젝트 추가</Typography>
        <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
          <Typography>프로젝트 ID</Typography>
          <Textfield
            ratio={4}
            ref={inputRef}
            onChange={handlevalidationText}
            type="number"
          />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
          <Typography style={{ marginBottom: '0.5rem' }}>Jar파일</Typography>
          <UploadFile
            requiredExtension="jar"
            handlevalidationFile={handlevalidateFile}
            ref={jarRef}
          />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
          <Typography style={{ marginBottom: '0.5rem' }}>
            Docker-Compose 파일
          </Typography>
          <UploadFile
            requiredExtension="yml"
            handlevalidationFile={handlevalidateFile}
            ref={ymlRef}
          />
        </Flexbox>
      </Flexbox>
      <Flexbox justifyContents="end" style={{ gap: '1rem' }}>
        <Button
          paddingX={2}
          paddingY={1}
          disabled={
            !validationFiles['projectId'] ||
            !validationFiles['jar'] ||
            !validationFiles['yml']
          }
          color="primary"
          onClick={handleSubmit}
        >
          업로드
        </Button>
        <Button paddingX={2} paddingY={1} color="delete" onClick={modal.pop}>
          취소
        </Button>
      </Flexbox>
    </div>
  );
};
