import { useState } from 'react';
import Button from '../../components/Button';
import useModal from '../../hooks/useModal';
import { AddProjectModal } from './components/AddProjectModal/AddProjectModal';
import { Console } from './components/Console/Console';
import { DataTable } from './components/DataTable/DataTable';
import { DistributeIcon } from './components/DistributeIcon/DistributeIcon';
import { DocsIcon } from './components/DocsIcon/DocsIcon';
import { StateIcon } from './components/StateIcon/StateIcon';

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

export const ServerTest = () => {
  const [tableData, setTableData] = useState(data);
  const modal = useModal();

  const colWidths = [10, 35, 25, 15, 15];
  const headers = ['버전', '빌드 시각', '최근 빌드', 'API 문서', '배포하기'];

  const newData = [
    [
      '0.0.7',
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

  const handleModal = () => {
    modal.push({
      children: <AddProjectModal />,
    });
  };
  const handleData = () => {
    setTableData(newData);
  };

  return (
    <>
      <Button onClick={handleModal}>프로젝트 추가</Button>
      <Button color="delete" onClick={handleData}>
        프로젝트 제거
      </Button>
      <DataTable
        colWidths={colWidths}
        headers={headers}
        data={tableData}
        selectable={true}
      />
      <Console />
    </>
  );
};
