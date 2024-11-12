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
import { HiRocketLaunch, HiCog6Tooth } from 'react-icons/hi2';
import { CustomTooltip } from '../../../../components/CustomToolTip';

const apiData = {
  includes: [
    {
      apiId: 1,
      domainName: 'egg',
      method: 'GET' as Method,
      endPoint: 'api/eggs/count',
      description:
        '특별한 계란 목록을 가져옵니다 특별한 계란 목록을 가져옵니다 특별한 계란 목록을 가져옵니다 특별한 계란 목록을 가져옵니다',
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
    {
      apiId: 3,
      domainName: 'egg',
      method: 'PUT' as Method,
      endPoint: 'api/eggs/count',
      description: '특별한 계란 목록을 가져옵니다',
      vuser: 10,
      duration: 1,
      testMethod: 'SPIKE' as TestMethodType,
    },
    {
      apiId: 4,
      domainName: 'egg',
      method: 'POST' as Method,
      endPoint: 'api/eggs/count',
      description: '특별한 계란 목록을 가져옵니다',
      vuser: 10,
      duration: 1,
      testMethod: 'SPIKE' as TestMethodType,
    },
    {
      apiId: 5,
      domainName: 'egg',
      method: 'Delete' as Method,
      endPoint: 'api/eggs/count',
      description: '특별한 계란 목록을 가져옵니다',
      vuser: 10,
      duration: 1,
      testMethod: 'SPIKE' as TestMethodType,
    },
    {
      apiId: 6,
      domainName: 'egg',
      method: 'Patch' as Method,
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
    {
      method: 'PUT' as Method,
      endPoint: 'api/users',
    },
    {
      method: 'PATCH' as Method,
      endPoint: 'api/users',
    },
    {
      method: 'DELETE' as Method,
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

  const handleExpanedRowIdx = (idx: number) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === idx ? -1 : idx));
  };

  const handleFormChange = (
    idx: number,
    key: keyof APITestFormData,
    value: number | TestMethodType,
  ) => {
    setTestFormData((prevData) =>
      prevData.map((item, index) =>
        index === idx ? { ...item, [key]: value } : item,
      ),
    );
  };

  // Form 초기 상태 생성
  useEffect(() => {
    const newTestFormData = apiData.includes.map((item) => ({
      apiId: item.apiId,
      method: item.testMethod,
      vuserNum: item.vuser,
      duration: item.duration,
      checked: false,
    }));
    setTestFormData(newTestFormData);
  }, []);

  // tableData를 생성하는 함수
  const convertTableData = () => {
    const newTableIncludeData = apiData.includes.map((item, idx) => [
      <CustomTooltip title={item.domainName} placement="bottom" arrow={true}>
        <div className={s.Description}>{item.domainName}</div>
      </CustomTooltip>,
      <MethodChip method={item.method.toLowerCase() as Method} />,
      <CustomTooltip title={item.endPoint} placement="bottom" arrow={true}>
        <div className={s.Description}>{item.endPoint}</div>
      </CustomTooltip>,
      <CustomTooltip title={item.description} placement="bottom" arrow={true}>
        <div className={s.Description}>{item.description}</div>
      </CustomTooltip>,
      <HiCog6Tooth
        size={24}
        className={s.ConfigIcon}
        onClick={() => handleExpanedRowIdx(idx)}
      />,
      <Checkbox
        checked={testFormData[idx]?.checked}
        onChange={() => handleCheckbox(idx)}
      />,
    ]);

    const newTableExcludeData = apiData.excludes.map((item) => [
      '-',
      <MethodChip method={item.method.toLowerCase() as Method} />,
      <CustomTooltip title={item.endPoint} placement="bottom" arrow={true}>
        <div className={s.Description}>{item.endPoint}</div>
      </CustomTooltip>,
      <div className={s.UndefinedAPIDescription}>
        현재 API Docs에 정의되지 않은 API입니다.
      </div>,
      '-',
      '-',
    ]);

    return [...newTableIncludeData, ...newTableExcludeData];
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        <Typography size={2} weight="700">
          테스트 실행
        </Typography>
        <Typography size={1}>테스트할 API 목록들을 체크해주세요</Typography>
      </div>
      <DataTable
        data={convertTableData()}
        colWidths={colWidths}
        headers={headers}
        expandedRowIndex={expandedRowIndex}
        ExpandedRow={
          <TestConfigForm
            vuser={testFormData[expandedRowIndex]?.vuserNum}
            duration={testFormData[expandedRowIndex]?.duration}
            testMethod={testFormData[expandedRowIndex]?.method}
            onChange={(key, value) =>
              handleFormChange(expandedRowIndex, key, value)
            }
          />
        }
      />
      <Flexbox justifyContents="end" style={{ gap: '1rem', marginTop: '1rem' }}>
        <Button paddingX={2} paddingY={1} color="primary">
          Shooot! <HiRocketLaunch />
        </Button>
        <Button paddingX={2} paddingY={1} color="delete" onClick={modal.pop}>
          취소
        </Button>
      </Flexbox>
    </div>
  );
};
