import { useCallback } from 'react';
import { useAPIContext } from '../../API';
import { throttle } from 'lodash';
import * as s from './index.css';
import MethodHeader from './MethodHeader/MethodHeader';
import Flexbox from '../../../../../../components/Flexbox';
import LockButton from './LockButton/LockButton';
import Typography from '../../../../../../components/Typography';
import ManagerAvatar from '../APICommon/ManagerAvatar/ManagerAvatar';
import Button from '../../../../../../components/Button';
import { CollapseIcon } from '../APICommon/CollapseIcon/CollapseIcon';
import TestResultTail from './TestResultTail/TestResultTail';

export const Header = () => {
  const context = useAPIContext();
  const { isFocused, handleToggleIsFocused } = context.useIsFocusedHook;

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
      key={context.id}
      className={s.apiHeaderBoxRecipe({ isOpen: isFocused })}
    >
      <MethodHeader method={context.method} />
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
          <LockButton needAuthorize={context.needAuthorize!} />
          <Typography size={1} color="disabled">
            {context.endPoint}
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
            {context.title}
          </Typography>
          <Flexbox
            alignItems="center"
            flexDirections="row"
            justifyContents="center"
            style={{
              gap: '1rem',
            }}
          >
            <ManagerAvatar manager={context.manager} />
            <Button paddingX={1} rounded={0.5}>
              <Typography size={0.75}>테스트</Typography>
            </Button>
            <CollapseIcon isOpen={isFocused} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <TestResultTail lastTestResult={context.lastTestResult!} />
    </div>
  );
};
