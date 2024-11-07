import { ReactNode, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { AddProjectModal } from '../AddProjectModal/AddProjectModal';
import { DataTable } from '../DataTable/DataTable';
import { TestConfigModal } from '../TestConfigModal/TestConfigModal';
import { deleteJarFile } from '../../apis';

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
    <>
      <Flexbox
        flexDirections="row"
        justifyContents="end"
        style={{ gap: '1rem', marginBottom: '0.5rem', marginRight: '0.5rem' }}
      >
        <Button rounded={0.5} color="tertiary" onClick={handleAddProjectModal}>
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
      <DataTable
        colWidths={colWidths}
        headers={headers}
        data={tableData}
        selectable={true}
        selectedRowIndex={selectedRow}
        handleSelectRow={handleSelectRow}
      />
    </>
  );
};
