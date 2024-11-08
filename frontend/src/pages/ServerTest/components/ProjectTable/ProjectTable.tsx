import { ReactNode, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { AddProjectModal } from '../AddProjectModal/AddProjectModal';
import { DataTable } from '../DataTable/DataTable';
import { TestConfigModal } from '../TestConfigModal/TestConfigModal';
import { deleteJarFile } from '../../apis';
import Typography from '../../../../components/Typography';

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
  const modal = useModal();

  const colWidths = [10, 35, 25, 15, 15];
  const headers = ['버전', '파일명', '최근 빌드', 'API 문서', '배포하기'];

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
      onClose: () => {
        console.log('으헤헤');
      },
    });
  };

  const handleTestConfigModal = () => {
    modal.push({
      children: <TestConfigModal />,
    });
  };

  const handleDeleteProjectJarFile = () => {
    if (selectedRow !== -1 && idList)
      deleteJarFile({ projectJarFileId: idList[selectedRow] });
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
            onClick={handleDeleteProjectJarFile}
          >
            프로젝트 제거
          </Button>
          <Button rounded={0.5} onClick={handleTestConfigModal}>
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
