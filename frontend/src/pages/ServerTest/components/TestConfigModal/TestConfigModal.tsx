import { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { DataTable } from '../DataTable/DataTable';
import * as s from './TestConfigModal.css';
import { TestConfigForm } from '../TestConfigForm/TestConfigForm';
import { MethodChip } from '../MethodChip/MethodChip';
import Checkbox from '../Checkbox/Checkbox';
import { APITestFormData, TestMethodType } from '../../types';
import { Method } from '../../../APIDocs/types/methods';
import Typography from '../../../../components/Typography';

const apiData = {
  includes: [
    {
      apiId: 1,
      domainName: 'egg',
      method: 'GET' as Method,
      endPoint: 'api/eggs/count',
      description: '특별한 계란 목록을 가져옵니다',
      vuser: 10,
      duration: 1,
      testMethod: 'FIXED' as TestMethodType,
    },
    {
      apiId: 2,
      domainName: 'egg',
      method: 'POST' as Method,
      endPoint: 'api/eggs/count',
      description: '특별한 계란 목록을 가져옵니다',
      vuser: 10,
      duration: 1,
      testMethod: 'SPIKE' as TestMethodType,
    },
  ],
  excludes: [
    {
      method: 'POST' as Method,
      endPoint: 'api/users',
    },
  ],
};

export const TestConfigModal = () => {
  const [testFormData, setTestFormData] = useState<APITestFormData[]>([]);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number>(-1);
  const modal = useModal();
  const colWidths = [15, 10, 25, 30, 10, 10];

  const handleCheckbox = (idx: number) => {
    setTestFormData((prevData) =>
      prevData.map((item, index) =>
        index === idx ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // Form 초기 상태 생성
  useEffect(() => {
    const newTestFormData = apiData.includes.map((item) => ({
      apiId: item.apiId,
      method: item.method,
      vuserNum: item.vuser,
      duration: item.duration,
      checked: false,
    }));
    setTestFormData(newTestFormData);
  }, []);

  // tableData를 생성하는 함수
  const convertTableData = () => {
    const newTableIncludeData = apiData.includes.map((item, idx) => [
      item.domainName,
      <MethodChip method={item.method.toLowerCase() as Method} />,
      item.endPoint,
      item.description,
      <div onClick={() => handleExpanedRowIdx(idx)}>설정하기</div>,
      <Checkbox
        checked={testFormData[idx]?.checked}
        onChange={() => handleCheckbox(idx)}
      />,
    ]);

    const newTableExcludeData = apiData.excludes.map((item) => [
      '-',
      <MethodChip method={item.method.toLowerCase() as Method} />,
      item.endPoint,
      <Typography color="post">
        현재 API Docs에 정의되지 않은 API입니다.
      </Typography>,
      '-',
      '-',
    ]);

    return [...newTableIncludeData, ...newTableExcludeData];
  };

  const handleExpanedRowIdx = (idx: number) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === idx ? -1 : idx));
  };

  const headers = [
    '도메인',
    'API 메서드',
    '엔드 포인트',
    'API 설명',
    '테스트 설정',
    '테스트 여부',
  ];

  return (
    <div className={s.container}>
      <DataTable
        data={convertTableData()}
        colWidths={colWidths}
        headers={headers}
        expandedRowIndex={expandedRowIndex}
        ExpandedRow={
          <TestConfigForm vuser={10} duration={1} testMethod="FIXED" />
        }
      />
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
