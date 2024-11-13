import { CustomTooltip } from '../../../components/CustomToolTip';
import { DistributeIcon } from '../components/DistributeIcon/DistributeIcon';
import { DocsIcon } from '../components/DocsIcon/DocsIcon';
import { StateIcon } from '../components/StateIcon/StateIcon';
import { GetJarFilesResponse, ProjectStatus } from '../types';

export const matchState = (status: ProjectStatus) => {
  switch (status) {
    case 'BUILD_ERROR':
      return '빌드에러';
    case 'RUN':
      return '배포중';
    case 'RUNTIME_ERROR':
      return '런타임에러';
    case 'DONE':
      return '정상작동';
    case 'NONE':
      return '기록없음';
  }
};

export const convertDataTable = (
  data: GetJarFilesResponse,
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
        active={item.status !== 'NONE' && item.status !== 'RUNTIME_ERROR'}
      />,
      <DistributeIcon
        active={item.status !== 'RUN'}
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
