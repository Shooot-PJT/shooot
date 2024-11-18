import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { HiCog6Tooth, HiRocketLaunch } from 'react-icons/hi2';
import Button from '../../../../components/Button';
import { CustomTooltip } from '../../../../components/CustomToolTip';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { Method } from '../../../APIDocs/types/methods';
import { excuteApiTest, getAPIConfigs } from '../../apis/TestApi';
import {
  APIIncludeTestData,
  APITestFormData,
  APITestListResponse,
  ExecuteApiTestRequest,
  TestMethodType,
} from '../../types';
import Checkbox from '../Checkbox/Checkbox';
import { DataTable } from '../DataTable/DataTable';
import { MethodChip } from '../MethodChip/MethodChip';
import { TestConfigForm } from '../TestConfigForm/TestConfigForm';
import * as s from './TestConfigModal.css';
import { ExcuteTestModal } from '../ExcuteTestModal/ExcuteTestModal';
import usePopup from '../../../../hooks/usePopup';
import { useUploadStateStore } from '../../stores/useUploadStateStore';
import { useTestSSE } from '../../hooks/useTestSSE';
import {
  initialTestData,
  useTestDataStore,
} from '../../stores/useTestDataStore';

interface TestConfigModalProps {
  projectJarFileId: number;
}

export const TestConfigModal = ({ projectJarFileId }: TestConfigModalProps) => {
  const [testFormData, setTestFormData] = useState<APITestFormData[]>([]);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number>(-1);
  const [validationState, setValidationState] = useState<boolean>(false);
  const modal = useModal();
  const popup = usePopup();
  const { state, setState } = useUploadStateStore();
  const { setTestData } = useTestDataStore();
  const colWidths = [15, 10, 25, 30, 10, 10];
  const checkedApisNum = useRef<number>(0);

  const { data: apiConfigs = {} as APITestListResponse, isPending } = useQuery({
    queryKey: ['apiConfigs', projectJarFileId],
    queryFn: async () => {
      const response = await getAPIConfigs({
        projectJarFileId: projectJarFileId,
      });
      return response?.data ?? {};
    },
  });

  useTestSSE({
    projectJarFileId: projectJarFileId,
  });

  useEffect(() => {
    return () => {
      if (state === 'End') {
        modal.pop();
        setState('None');
      }
    };
  }, [state]);

  const handleCheckbox = (idx: number) => {
    setTestFormData((prevData) => {
      const updatedData = prevData.map((item, index) =>
        index === idx ? { ...item, checked: !item.checked } : item,
      );
      const checkedCount = updatedData.filter((item) => item.checked).length;
      checkedApisNum.current = checkedCount;
      setValidationState(checkedCount > 0);

      return updatedData;
    });
  };

  const handleExpanedRowIdx = (idx: number) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === idx ? -1 : idx));
  };

  const handleSubmitTestConfig = () => {
    const testConfig = testFormData
      .filter((item) => item.checked)
      .map(({ checked, ...rest }) => {
        void checked;
        return rest;
      });

    const testTime = testConfig.reduce((acc, item) => acc + item.duration, 0);

    const request: ExecuteApiTestRequest = {
      projectJarFileId: projectJarFileId,
      endPointSettings: testConfig,
    };
    excuteApiTest(request)
      .then(() => {
        setTestData(() => {
          return [initialTestData, initialTestData];
        });
        modal.push({
          children: (
            <ExcuteTestModal
              testTime={testTime}
              projectJarFileId={projectJarFileId}
            />
          ),
        });
      })
      .catch((error) => {
        popup.push({
          title: '테스트 시도 실패',
          children: (
            <>{error.response ? error.response.data.message : error.message}</>
          ),
          type: 'fail',
          onClose: () => modal.pop,
        });
      });
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

  useEffect(() => {
    if (!Array.isArray(apiConfigs.includes) || !apiConfigs.includes.length) {
      setTestFormData([]);
      return;
    }

    const newTestFormData = apiConfigs.includes.map(
      (item: APIIncludeTestData) => ({
        apiId: item.apiId,
        method: item.testMethod,
        vuserNum: item.vuser,
        duration: item.duration,
        checked: false,
      }),
    );
    setTestFormData(newTestFormData);
  }, [apiConfigs.includes]);

  const convertTableData = (data: APITestListResponse) => {
    if (!data?.includes?.length && !data?.excludes?.length) {
      return [];
    }

    const newTableIncludeData = Array.isArray(data.includes)
      ? data.includes.map((item, idx) => [
          <CustomTooltip
            title={item.domainName}
            placement="bottom"
            arrow={true}
          >
            <div className={s.Description}>{item.domainName}</div>
          </CustomTooltip>,
          <MethodChip method={item.method.toLowerCase() as Method} />,
          <CustomTooltip title={item.endPoint} placement="bottom" arrow={true}>
            <div className={s.Description}>{item.endPoint}</div>
          </CustomTooltip>,
          <CustomTooltip
            title={item.description}
            placement="bottom"
            arrow={true}
          >
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
        ])
      : [];

    const newTableExcludeData = Array.isArray(data.excludes)
      ? data.excludes.map((item) => [
          '-',
          <MethodChip method={item.method.toLowerCase() as Method} />,
          <CustomTooltip title={item.endPoint} placement="bottom" arrow={true}>
            <div className={s.Description}>{item.endPoint}</div>
          </CustomTooltip>,
          <div className={s.UndefinedAPIDescription}>
            현재 API Docs에 정의되지 않은 API입니다.
          </div>,
          '-',
          <CustomTooltip
            title={'테스트 하기 위해서는 API Docs 등록이 필요합니다.'}
            placement="bottom"
            arrow={true}
          >
            <div>-</div>
          </CustomTooltip>,
        ])
      : [];

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
        data={convertTableData(apiConfigs)}
        colWidths={colWidths}
        headers={headers}
        isPending={isPending}
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
        <Button
          paddingX={2}
          paddingY={1}
          color="primary"
          onClick={handleSubmitTestConfig}
          disabled={!validationState}
        >
          Shooot! <HiRocketLaunch />
        </Button>
        <Button paddingX={2} paddingY={1} color="delete" onClick={modal.pop}>
          취소
        </Button>
      </Flexbox>
    </div>
  );
};
