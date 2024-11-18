import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import usePopup from '../../../../hooks/usePopup';
import { UploadFile } from '../UploadFile/UploadFile';
import * as s from './AddProjectModal.css';
import { useNavBarStore } from '../../../../stores/navbarStore';
import { uploadJarFile } from '../../apis/JarFileApi';
import { UploadingModal } from '../UploadingModal/UploadingModal';
import { useUploadStateStore } from '../../stores/useUploadStateStore';

interface AddProjectModalProps {
  handleRender: () => void;
}

export const AddProjectModal = ({ handleRender }: AddProjectModalProps) => {
  const [validationFiles, setValidationFiles] = useState<
    Record<string, boolean>
  >({ projectId: false, jar: false, yml: false });
  const jarRef = useRef<HTMLInputElement>(null);
  const ymlRef = useRef<HTMLInputElement>(null);
  const modal = useModal();
  const popup = usePopup();

  const { project } = useNavBarStore();
  const { state, setState } = useUploadStateStore();

  useEffect(() => {
    if (state === 'Pending') {
      modal.push({
        children: <UploadingModal />,
      });
    } else if (state === 'End' || state === 'Error') {
      modal.pop();
      if (state === 'Error') {
        setState('None');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
    if (
      jarRef.current &&
      jarRef.current.files &&
      ymlRef.current &&
      ymlRef.current.files
    ) {
      const request = {
        projectId: project,
        jarFile: jarRef.current.files[0],
        dockerComposeFile: ymlRef.current.files[0],
      };
      setState('Pending');
      uploadJarFile(request)
        .then(() => {
          setState('End');
          modal.pop();
          handleRender();
        })
        .catch((error) => {
          setState('Error');
          popup.push({
            title: '업로드 실패',
            children: error.response.data.message,
            type: 'fail',
          });
          console.error(error);
        });
    }
  };

  return (
    <div className={s.container}>
      <Flexbox
        flexDirections="col"
        style={{ gap: '1.5rem', marginBottom: '2rem' }}
      >
        <Typography size={1.5}>프로젝트 추가</Typography>
        <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
          <Typography style={{ marginBottom: '0.5rem' }}>Jar 파일</Typography>
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
            !validationFiles['jar'] ||
            !validationFiles['yml'] ||
            state === 'Pending'
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
