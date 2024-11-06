import { useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { AddProjectModal } from '../AddProjectModal/AddProjectModal';
import { DataTable } from '../DataTable/DataTable';
import { DistributeIcon } from '../DistributeIcon/DistributeIcon';
import { DocsIcon } from '../DocsIcon/DocsIcon';
import { StateIcon } from '../StateIcon/StateIcon';
import { TestConfigModal } from '../TestConfigModal/TestConfigModal';
import { useNavBarStore } from '../../../../stores/navbarStore';
import { useQuery } from '@tanstack/react-query';
import { getJarFiles } from '../../apis';

const data = [
  [
    '0.0.6',
    '2024-10-17 18:24:17',
    <StateIcon state="Approved" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.5',
    '2024-10-16 17:24:17',
    <StateIcon state="Pending" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={false} />,
  ],
  [
    '0.0.4',
    '2024-10-15 16:24:17',
    <StateIcon state="Disabled" />,
    <DocsIcon active={false} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.3',
    '2024-10-15 14:24:17',
    <StateIcon state="No-Build" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.2',
    '2024-10-15 14:24:17',
    <StateIcon state="Error" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.1',
    '2024-10-15 14:24:17',
    <StateIcon state="Approved" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
];

const newdata = [
  [
    '0.0.6',
    '2024-10-17 18:24:17',
    <StateIcon state="Approved" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.6',
    '2024-10-17 18:24:17',
    <StateIcon state="Approved" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.5',
    '2024-10-16 17:24:17',
    <StateIcon state="Pending" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={false} />,
  ],
  [
    '0.0.4',
    '2024-10-15 16:24:17',
    <StateIcon state="Disabled" />,
    <DocsIcon active={false} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.3',
    '2024-10-15 14:24:17',
    <StateIcon state="No-Build" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.2',
    '2024-10-15 14:24:17',
    <StateIcon state="Error" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
  [
    '0.0.1',
    '2024-10-15 14:24:17',
    <StateIcon state="Approved" />,
    <DocsIcon active={true} />,
    <DistributeIcon active={true} />,
  ],
];

export const ProjectTable = () => {
  const [tableData, setTableData] = useState(data);
  const modal = useModal();

  const { project } = useNavBarStore();

  const { data: jarFiles, error } = useQuery({
    queryKey: ['jarFiles', project],
    queryFn: async () => {
      console.log(jarFiles);
      await getJarFiles({ projectId: project });
    },
  });

  const handleNewData = () => {
    setTableData(newdata);
  };

  const handleAddProjectModal = () => {
    modal.push({
      children: <AddProjectModal />,
    });
  };

  const handleTestConfigModal = () => {
    modal.push({
      children: <TestConfigModal />,
    });
  };
  const colWidths = [10, 35, 25, 15, 15];
  const headers = ['버전', '빌드 시각', '최근 빌드', 'API 문서', '배포하기'];

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
        <Button rounded={0.5} color="delete" onClick={handleNewData}>
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
      />
    </>
  );
};
