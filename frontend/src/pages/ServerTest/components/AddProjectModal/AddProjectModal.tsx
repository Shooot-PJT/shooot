import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import usePopup from '../../../../hooks/usePopup';
import { UploadFile } from '../UploadFile/UploadFile';
import * as s from './AddProjectModal.css';
import { useNavBarStore } from '../../../../stores/navbarStore';
import { uploadJarFile } from '../../apis';
import { UploadingModal } from '../UploadingModal/UploadingModal';
import { UploadState } from '../../types';
export const AddProjectModal = () => {
  const [validationFiles, setValidationFiles] = useState<
    Record<string, boolean>
  >({ projectId: false, jar: false, yml: false });
  const [panding, setPanding] = useState<UploadState>('None');
  const jarRef = useRef<HTMLInputElement>(null);
  const ymlRef = useRef<HTMLInputElement>(null);
  const modal = useModal();
  const popup = usePopup();

  const { project } = useNavBarStore();

  useEffect(() => {
    if (panding === 'Panding') {
      modal.push({
        children: <UploadingModal />,
      });
    } else if (panding === 'End') {
      modal.pop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panding]);

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
      setPanding('Panding');
      uploadJarFile(request)
        .then(() => {
          modal.pop();
          setPanding('End');
        })
        .catch((error) => {
          // setPanding('End');
          popup.push({
            title: '업로드 실패',
            children: error.message,
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
          disabled={!validationFiles['jar'] || !validationFiles['yml']}
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
