import { useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import usePopup from '../../../../hooks/usePopup';
import { deployFile } from '../../apis/DistributeApi';
import { deleteJarFile } from '../../apis/JarFileApi';
import { useUploadStateStore } from '../../stores/useUploadStateStore';
import { GetJarFilesResponse } from '../../types';
import { convertDataTable } from '../../utils';
import { AddProjectModal } from '../AddProjectModal/AddProjectModal';
import { DataTable } from '../DataTable/DataTable';
import { TestConfigModal } from '../TestConfigModal/TestConfigModal';
import { DeleteJarFileModal } from './DeleteJarFileModal/DeleteJarFileModal';

interface ProjectProps {
  jarFiles: GetJarFilesResponse;
  idList: number[];
  handleRender: () => void;
  handleOnBuild: () => void;
}

export const ProjectTable = ({
  jarFiles,
  idList,
  handleRender,
  handleOnBuild,
}: ProjectProps) => {
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const colWidths = [10, 30, 30, 15, 15];
  const headers = ['버전', '파일명', '최근 빌드', 'API 문서', '배포하기'];
  const modal = useModal();
  const popup = usePopup();
  const { setState } = useUploadStateStore();

  const handleSelectRow = (rowIndex: number, selectedRow: number) => {
    if (rowIndex !== selectedRow) {
      setSelectedRow(rowIndex);
    } else {
      setSelectedRow(-1);
    }
  };

  const handleAddProjectModal = () => {
    modal.push({
      children: <AddProjectModal handleRender={handleRender} />,
    });
  };

  const handleTestConfigModal = () => {
    modal.push({
      children: <TestConfigModal />,
    });
  };

  const handleDeleteJarFileModal = () => {
    modal.push({
      children: <DeleteJarFileModal delFunction={handleDeleteProjectJarFile} />,
    });
  };

  const handleFailDeletePopup = (text: string) => {
    popup.push({
      title: '프로젝트 파일 삭제 실패',
      children: text,
      type: 'fail',
      onClose: () => modal.pop(),
    });
  };

  const handleFailDeployPopup = (text: string) => {
    popup.push({
      title: '배포 실패',
      children: text,
      type: 'fail',
      onClose: () => modal.pop(),
    });
  };

  const handleDeploy = (projectJarFileId: number) => {
    setState('Pending');
    handleOnBuild();
    deployFile({ projectJarFileId: projectJarFileId })
      .then(() => {
        handleRender();
      })
      .catch((error) => {
        if (error.response) {
          handleFailDeployPopup(error.response.data.message);
        } else {
          handleFailDeployPopup(error.message);
        }
      })
      .finally(() => {
        setState('None');
      });
  };

  const handleDeleteProjectJarFile = () => {
    if (selectedRow !== -1 && idList) {
      setState('Pending');
      deleteJarFile({ projectJarFileId: idList[selectedRow] })
        .then(() => {
          modal.pop();
          setState('None');
          handleRender();
        })
        .catch((error) => {
          if (error.response.data) {
            handleFailDeletePopup(error.response.data.message);
          } else {
            handleFailDeletePopup(error.message);
          }
          setState('None');
        });
    }
  };

  return (
    <div style={{ width: '100%', minWidth: '100%' }}>
      <Flexbox
        flexDirections="row"
        justifyContents="between"
        alignItems="center"
        style={{ marginBottom: '0.5rem' }}
      >
        <Typography size={1.5} weight="600">
          프로젝트 빌드파일
        </Typography>

        <Flexbox
          flexDirections="row"
          justifyContents="between"
          style={{ gap: '1.5rem', marginBottom: '1rem' }}
        >
          <Button
            rounded={0.5}
            color="tertiary"
            onClick={handleAddProjectModal}
          >
            프로젝트 추가
          </Button>
          <Button
            rounded={0.5}
            color="delete"
            onClick={handleDeleteJarFileModal}
            disabled={selectedRow === -1}
          >
            프로젝트 제거
          </Button>
          <Button
            rounded={0.5}
            onClick={handleTestConfigModal}
            disabled={selectedRow === -1}
          >
            테스트 실행
          </Button>
        </Flexbox>
      </Flexbox>
      <DataTable
        colWidths={colWidths}
        headers={headers}
        data={convertDataTable(jarFiles, handleDeploy)}
        selectable={true}
        selectedRowIndex={selectedRow}
        handleSelectRow={handleSelectRow}
      />
    </div>
  );
};
