import { useRef } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Textfield from '../../../../components/Textfield';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import * as s from './AddProjectModal.css';
import { UploadFile } from '../UploadFile/uploadFile';
export const AddProjectModal = () => {
  const jarRef = useRef<HTMLInputElement>(null);
  const ymlRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modal = useModal();

  return (
    <div className={s.container}>
      <Flexbox
        flexDirections="col"
        style={{ gap: '1.5rem', marginBottom: '2rem' }}
      >
        <Typography size={1.5}>프로젝트 추가</Typography>
        <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
          <Typography>프로젝트 ID</Typography>
          <Textfield ratio={4} ref={inputRef} />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
          <Typography style={{ marginBottom: '0.5rem' }}>Jar파일</Typography>
          <UploadFile requiredExtension="jar" ref={jarRef} />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
          <Typography style={{ marginBottom: '0.5rem' }}>
            Docker-Compose 파일
          </Typography>
          <UploadFile requiredExtension="yml" ref={ymlRef} />
        </Flexbox>
      </Flexbox>
      <Flexbox justifyContents="end" style={{ gap: '1rem' }}>
        <Button paddingX={2} paddingY={1} color="primary">
          업로드
        </Button>
        <Button paddingX={2} paddingY={1} color="delete" onClick={modal.pop}>
          취소
        </Button>
      </Flexbox>
    </div>
  );
};
