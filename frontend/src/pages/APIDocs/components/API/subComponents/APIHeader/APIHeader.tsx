import { useCallback } from 'react';
import { useAPIContext } from '../../API';
import { throttle } from 'lodash';
import * as s from './APIHeader.css';
import MethodHeader from './MethodHeader/MethodHeader';
import Flexbox from '../../../../../../components/Flexbox';
import LockButton from './LockButton/LockButton';
import Typography from '../../../../../../components/Typography';
import ManagerAvatar from '../APICommon/ManagerAvatar/ManagerAvatar';
import { CollapseIcon } from '../APICommon/CollapseIcon/CollapseIcon';
import TestResultTail from './TestResultTail/TestResultTail';
import TestButton from '../../../TestButton/TestButton';

export const APIHeader = () => {
  const context = useAPIContext();
  const { isFocused, handleToggleIsFocused } = context.useIsFocusedHook;

  const method = context.requestDocs.method || 'method';

  const onClickHeader = useCallback(
    throttle((e: React.MouseEvent) => {
      e.stopPropagation();
      handleToggleIsFocused();
    }, 500),
    [isFocused],
  );

  return (
    <div
      onClick={onClickHeader}
      key={context.requestDocs.id}
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
          <LockButton isSecure={context.requestDocs.isSecure!} />
          <Typography size={1} color="disabled">
            {context.requestDocs.url}
          </Typography>
          {/* 추후: realServer토글버튼 - 상태 추가 필요 */}
        </Flexbox>

        <Flexbox
          alignItems="center"
          flexDirections="row"
          justifyContents="between"
          style={s.apiHeaderRightContentStyle}
        >
          <Typography size={0.85} weight="300" color="disabled">
            {context.requestDocs.title}
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
                id: context.requestDocs.managerId,
                nickname: context.requestDocs.managerName,
              }}
            />
            <TestButton.API />
            <CollapseIcon isOpen={isFocused} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <TestResultTail testStatus={context.requestDocs.testStatus!} />
    </div>
  );
};