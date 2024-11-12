import { ReactNode, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { AddProjectModal } from '../AddProjectModal/AddProjectModal';
import { DataTable } from '../DataTable/DataTable';
import { TestConfigModal } from '../TestConfigModal/TestConfigModal';
import { deleteJarFile } from '../../apis/JarFileApi';
import Typography from '../../../../components/Typography';
import { DeleteJarFileModal } from './DeleteJarFileModal/DeleteJarFileModal';
import { useUploadStateStore } from '../../stores/useUploadStateStore';
import usePopup from '../../../../hooks/usePopup';

interface ProjectProps {
  tableData: ReactNode[][];
  idList: number[];
  handleRender: () => void;
}

export const ProjectTable = ({
  tableData,
  idList,
  handleRender,
}: ProjectProps) => {
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const colWidths = [10, 35, 25, 15, 15];
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
    <div style={{ width: '100%' }}>
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
        data={tableData}
        selectable={true}
        selectedRowIndex={selectedRow}
        handleSelectRow={handleSelectRow}
      />
    </div>
  );
};
