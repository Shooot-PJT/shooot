import { CustomTooltip } from '../../../components/CustomToolTip';
import { DistributeIcon } from '../components/DistributeIcon/DistributeIcon';
import { DocsIcon } from '../components/DocsIcon/DocsIcon';
import { StateIcon } from '../components/StateIcon/StateIcon';
import { GetJarFilesResponse, ProjectStatus } from '../types';

export const matchState = (status: ProjectStatus) => {
  switch (status) {
    case 'READY':
      return 'Pending';
    case 'RUN':
      return 'Pending';
    case 'RUNTIME_ERROR':
      return 'Error';
    case 'DONE':
      return 'Approved';
    case 'NONE':
      return 'No-Build';
  }
};

export const convertDataTable = (data: GetJarFilesResponse) => {
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
      <DistributeIcon active={item.status !== 'RUN'} />,
    ];
  });
};

export const convertJarFileIdList = (data: GetJarFilesResponse) => {
  return data.map((item) => item.projectJarFileId);
};
