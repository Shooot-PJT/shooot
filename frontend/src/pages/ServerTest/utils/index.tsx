import Button from '../../../components/Button';
import { CustomTooltip } from '../../../components/CustomToolTip';
import Flexbox from '../../../components/Flexbox';
import { GraphColor } from '../../../components/Graph/Graph.type';
import Typography from '../../../components/Typography';
import colorPalette from '../../../styles/colorPalette';
import { Method } from '../../APIDocs/types/methods';
import { DistributeIcon } from '../components/DistributeIcon/DistributeIcon';
import { DocsIcon } from '../components/DocsIcon/DocsIcon';
import { MethodChip } from '../components/MethodChip/MethodChip';
import { StateIcon } from '../components/StateIcon/StateIcon';
import { TestItemChip } from '../components/TestItemChip/TestItemChip';
import {
  GetJarFilesResponse,
  GetTestRecordDetailResponse,
  GetTestRecordResponse,
  ProjectStatus,
  TestDataList,
  TestSSEData,
} from '../types';
import { HiX } from 'react-icons/hi';

export const matchState = (status: ProjectStatus) => {
  switch (status) {
    case 'BUILD_ERROR':
      return '빌드에러';
    case 'RUN':
      return '배포중';
    case 'RUNTIME_ERROR':
      return '런타임에러';
    case 'DONE':
      return '정상종료';
    case 'NONE':
      return '빌드기록없음';
    default:
      return '빌드기록없음';
  }
};

export const convertDataTable = (
  data: GetJarFilesResponse,
  handleDocsModal: (n: number) => void,
  onClick: (n: number) => void,
) => {
  return data.map((item) => {
    const versionString =
      `${item.version.major}.${item.version.minor}.${item.version.patch}` +
      (item.version.temporary !== 0 ? `-${item.version.temporary}` : '');
    return [
      <CustomTooltip title={versionString} placement="bottom" arrow={true}>
        <div>{versionString}</div>
      </CustomTooltip>,
      <CustomTooltip title={item.fileName} placement="bottom" arrow={true}>
        <div>{item.fileName}</div>
      </CustomTooltip>,
      <StateIcon state={matchState(item.status)} />,
      <DocsIcon
        active={
          item.status !== 'NONE' &&
          item.status !== 'RUNTIME_ERROR' &&
          item.status !== 'BUILD_ERROR'
        }
        onClick={() => {
          handleDocsModal(item.projectJarFileId);
        }}
      />,
      <DistributeIcon
        active={true}
        onClick={() => {
          onClick(item.projectJarFileId);
        }}
      />,
    ];
  });
};

export const convertJarFileIdList = (data: GetJarFilesResponse) => {
  return data.map((item) => item.projectJarFileId);
};

export const getRandomThree = () => {
  const options: GraphColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'get',
    'post',
    'delete',
    'put',
  ];
  const shuffled = options.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export const convertTestDataTable = (testData: TestSSEData[], idx: number) => {
  const { curr, avg, max, min } = testData[idx];

  return (Object.keys(curr) as (keyof TestDataList)[]).map((key) => {
    const formatValue = (value: number) =>
      key === 'disk' ? `${Math.round(value)} Mb/s` : `${Math.round(value)}%`;
    return [
      <TestItemChip item={key} />,
      formatValue(curr[key]),
      formatValue(avg[key]),
      formatValue(max[key]),
      formatValue(min[key]),
    ];
  });
};

export function formatDateToCustomFormat(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

export function convertSecondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}시간`);
  if (minutes > 0) parts.push(`${minutes}분`);
  if (remainingSeconds > 0) parts.push(`${remainingSeconds}초`);

  return parts.join(' ');
}

export const convertTestRecordTable = (
  testRecords: GetTestRecordResponse[],
  handleTestDetailModal: (n: number) => void,
) => {
  const sortedRecords = testRecords.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );
  return sortedRecords.map((item) => [
    <Typography color="primary" weight="600">
      {item.title}
    </Typography>,
    <Typography weight="500">
      {formatDateToCustomFormat(item.startTime)}
    </Typography>,
    item.status === 'DONE' ? (
      <StateIcon state="정상종료" />
    ) : (
      <Flexbox
        justifyContents="center"
        alignItems="center"
        style={{ gap: '1rem' }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorPalette.deepOrange[500],
            borderRadius: '50%',
            color: 'black',
          }}
        >
          <HiX />
        </div>
        <Typography color="delete" weight="600">
          중도중단
        </Typography>
      </Flexbox>
    ),
    <Typography weight="600">{item.count}</Typography>,
    <Typography color="put" weight="600">
      {convertSecondsToTimeString(item.duration)}
    </Typography>,
    <Button
      paddingY={0.35}
      disabled={item.status === 'INTERRUPTED' || item.count === 0}
      onClick={() => {
        handleTestDetailModal(item.stressTestLogId);
      }}
    >
      상세보기
    </Button>,
  ]);
};

export const convertTestRecordDetailTable = (
  data: GetTestRecordDetailResponse[],
  idx: number,
) => {
  const selectedRecord = data.filter((_, index) => idx === index)[0];
  return [
    [
      <TestItemChip item="cpu" />,
      Math.round(selectedRecord.avgCpu) + '%',
      Math.round(selectedRecord.maxCpu) + '%',
      Math.round(selectedRecord.minCpu) + '%',
    ],
    [
      <TestItemChip item="memory" />,
      Math.round(selectedRecord.avgMemory) + '%',
      Math.round(selectedRecord.maxMemory) + '%',
      Math.round(selectedRecord.minMemory) + '%',
    ],
    [
      <TestItemChip item="network" />,
      Math.round(selectedRecord.avgNetwork) + '%',
      Math.round(selectedRecord.maxNetwork) + '%',
      Math.round(selectedRecord.minNetwork) + '%',
    ],
    [
      <TestItemChip item="disk" />,
      Math.round(selectedRecord.avgDisk) + 'Mb/s',
      Math.round(selectedRecord.maxDisk) + 'Mb/s',
      Math.round(selectedRecord.minDisk) + 'Mb/s',
    ],
  ];
};

export const convertTestRecordDetailSelectBox = (
  data: GetTestRecordDetailResponse[],
) => {
  return data.map((item) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <MethodChip method={item.httpMethod.toLowerCase() as Method} />
        <div>{item.url}</div>
      </div>
    );
  });
};

// export const syncIndex = () => {
//   if (state !== 'End') {
//   }
// };
