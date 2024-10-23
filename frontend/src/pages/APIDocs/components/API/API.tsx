import { ReactNode } from 'react';
import { APIBasicInfo, EndPoint, Manager, TestResult } from './API.types';
import Flexbox from '../../../../components/Flexbox';
import MethodHeader from './subComponents/APIHeader/MethodHeader/MethodHeader';
import * as style from './API.css';
import Typography from '../../../../components/Typography';
import TestResultTail from './subComponents/APIHeader/TestResultTail/TestResultTail';
import LockButton from './subComponents/APIHeader/LockButton/LockButton';
import Button from '../../../../components/Button';
import Avatar from './subComponents/APICommon/ManagerAvatar/ManagerAvatar';
import { CollapseIcon } from './subComponents/APICommon/CollapseIcon/CollapseIcon';

interface APIProps {
  children: ReactNode;
}

interface APIHeaderProps {
  // API 기본 입력 정보
  title: APIBasicInfo['title'];
  manager: Manager;
  method: APIBasicInfo['method'];
  // API 추가 입력 정보
  needAuthorize?: boolean;
  endPoint?: EndPoint;
  lastTestResult?: TestResult;
}

export const API = ({ children }: APIProps) => {
  return <div className={style.apiRootContainer}>{children}</div>;
};

API.Header = function Header({
  title,
  manager,
  method,
  needAuthorize,
  endPoint,
  lastTestResult,
}: APIHeaderProps) {
  // 추후: const header = useAPIStore((state) => state.header);

  return (
    <Flexbox
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      columnGap={1.5}
      rounded={0.75}
      className={style.apiHeaderBoxStyle({ isOpen: false })}
      overflow="hidden"
    >
      <MethodHeader method={method} />
      <Flexbox
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        className={style.fullBoxStyle}
      >
        <Flexbox
          alignItems="center"
          flexDirection="row"
          justifyContent="start"
          columnGap={1.25}
          className={style.apiHeaderLeftContentStyle}
        >
          <LockButton needAuthorize={needAuthorize!} />
          <Typography size={1} color="disabled">
            {endPoint}
          </Typography>
          {/* 추후: realServer토글버튼 - 상태 추가 필요 */}
        </Flexbox>

        <Flexbox
          bg={'transparent'}
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          className={style.apiHeaderRightContentStyle}
        >
          <Typography size={0.85} weight="300" color="disabled">
            {title}
          </Typography>
          <Flexbox
            bg={'transparent'}
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            columnGap={1}
          >
            <Avatar id={manager.id} nickname={manager.nickname} />
            <Button paddingX={1} rounded={0.5}>
              <Typography size={0.75}>테스트</Typography>
            </Button>
            <CollapseIcon isOpen={false} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <TestResultTail lastTestResult={lastTestResult!} />
    </Flexbox>
  );
};

API.Body = function Body() {
  // 추후: const header = useAPIStore((state) => state.header);
  return (
    <div
    // 추후: onClick={ } // body open 제어 ( collapse처럼 )
    ></div>
  );
};
