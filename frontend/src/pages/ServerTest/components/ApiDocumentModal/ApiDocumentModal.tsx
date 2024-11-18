import { useQuery } from '@tanstack/react-query';
import Button from '../../../../components/Button';
import { CustomTooltip } from '../../../../components/CustomToolTip';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { Method } from '../../../APIDocs/types/methods';
import { getAPIConfigs } from '../../apis/TestApi';
import { APITestListResponse } from '../../types';
import { DataTable } from '../DataTable/DataTable';
import { MethodChip } from '../MethodChip/MethodChip';
import * as s from './ApiDocumentModal.css';

interface ApiDocumentModal {
  projectJarFileId: number;
}

export const ApiDocumentModal = ({ projectJarFileId }: ApiDocumentModal) => {
  const colWidths = [20, 15, 30, 35];
  const modal = useModal();

  const { data: apiConfigs = {} as APITestListResponse, isPending } = useQuery({
    queryKey: ['apiConfigs', projectJarFileId],
    queryFn: async () => {
      const response = await getAPIConfigs({
        projectJarFileId: projectJarFileId,
      });
      return response?.data ?? {};
    },
    staleTime: 120 * 1000,
  });

  const convertTableData = (data: APITestListResponse) => {
    if (!data?.includes?.length && !data?.excludes?.length) {
      return [];
    }

    const newTableIncludeData = Array.isArray(data.includes)
      ? data.includes.map((item) => [
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
        ])
      : [];

    return [...newTableIncludeData, ...newTableExcludeData];
  };

  const headers = ['도메인', 'API 메서드', '엔드 포인트', 'API 설명'];

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
        <Typography size={1.75} weight="700">
          해당 빌드파일 API 목록
        </Typography>
      </div>
      <DataTable
        data={convertTableData(apiConfigs)}
        colWidths={colWidths}
        headers={headers}
        isPending={isPending}
      />
      <Flexbox justifyContents="end" style={{ gap: '1rem', marginTop: '1rem' }}>
        <Button paddingX={2} paddingY={1} color="delete" onClick={modal.pop}>
          닫기
        </Button>
      </Flexbox>
    </div>
  );
};
