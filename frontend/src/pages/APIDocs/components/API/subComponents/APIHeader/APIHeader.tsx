import { useCallback } from 'react';
import { useAPIContext } from '../../API';
import { throttle } from 'lodash';
import * as s from './APIHeader.css';
import MethodHeader from './MethodHeader/MethodHeader';
import Flexbox from '../../../../../../components/Flexbox';
import Typography from '../../../../../../components/Typography';
import ManagerAvatar from '../APICommon/ManagerAvatar/ManagerAvatar';
import { CollapseIcon } from '../APICommon/CollapseIcon/CollapseIcon';
import TestResultTail from './TestResultTail/TestResultTail';
import TestButton from '../../../TestButton/TestButton';
import LockButton from './LockButton/LockButton';
import RealServerToggle from './RealServerToggle/RealServerToggle';
import { useGetAPIDetail } from '../../../../reactQueries/api';

export const APIHeader = () => {
  const context = useAPIContext();
  const { isFocused, handleToggleIsFocused } = context.useIsFocusedHook;
  const apiId = context.requestDocs.id;

  const { data: apiDetail, isError } = useGetAPIDetail(
    { apiId },
    { staleTime: 0 },
  );

  const method = apiDetail?.requestDocs.method || 'method';

  const onClickHeader = useCallback(
    throttle((e: React.MouseEvent) => {
      e.stopPropagation();
      handleToggleIsFocused();
    }, 500),
    [isFocused, handleToggleIsFocused],
  );

  if (isError || !apiDetail) {
    return (
      <div className={s.apiHeaderBoxRecipe({ isOpen: isFocused })}>
        <Typography>API 상세조회 실패</Typography>
      </div>
    );
  }

  return (
    <div
      onClick={onClickHeader}
      key={apiDetail.requestDocs.id}
      className={s.apiHeaderBoxRecipe({ isOpen: isFocused })}
    >
      <MethodHeader method={method} />
      <Flexbox
        alignItems="center"
        flexDirections="row"
        justifyContents="between"
        style={s.fullBoxStyle}
      >
        <Flexbox
          alignItems="center"
          flexDirections="row"
          justifyContents="start"
          style={s.apiHeaderLeftContentStyle}
        >
          <LockButton isSecure={apiDetail.requestDocs.isSecure!} />
          <RealServerToggle
            isRealServer={apiDetail.requestDocs.isRealServer!}
          />
          <Typography size={1} color="disabled">
            {apiDetail.requestDocs.url}
          </Typography>
        </Flexbox>

        <Flexbox
          alignItems="center"
          flexDirections="row"
          justifyContents="between"
          style={s.apiHeaderRightContentStyle}
        >
          <Typography size={0.85} weight="300" color="disabled">
            {apiDetail.requestDocs.title}
          </Typography>
          <Flexbox
            alignItems="center"
            flexDirections="row"
            justifyContents="center"
            style={{
              gap: '1rem',
            }}
          >
            <ManagerAvatar
              manager={{
                id: apiDetail.requestDocs.managerId,
                nickname: apiDetail.requestDocs.managerName,
                profileColor: apiDetail.requestDocs.profileColor,
              }}
            />
            <TestButton.API apiId={context.requestDocs.id} />
            <CollapseIcon isOpen={isFocused} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <TestResultTail testStatus={apiDetail.requestDocs.testStatus!} />
    </div>
  );
};
