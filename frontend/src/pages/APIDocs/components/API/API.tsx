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
import themeCss from '../../../../styles/theme.css';
import colorPalette from '../../../../styles/colorPalette';
import ManagerAvatar from './subComponents/APICommon/ManagerAvatar/ManagerAvatar';
import { TestCase } from './subComponents/APIBody/TestCase/TestCase';
// import { TestCase } from '../TestCase/TestCase';

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
    <div
      // key={id}
      className={style.apiHeaderBoxRecipe({ isOpen: false })}
    >
      <MethodHeader method={method} />
      <Flexbox
        alignItems="center"
        flexDirections="row"
        justifyContents="between"
        style={style.fullBoxStyle}
      >
        <Flexbox
          alignItems="center"
          flexDirections="row"
          justifyContents="start"
          style={style.apiHeaderLeftContentStyle}
        >
          <LockButton needAuthorize={needAuthorize!} />
          <Typography size={1} color="disabled">
            {endPoint}
          </Typography>
          {/* 추후: realServer토글버튼 - 상태 추가 필요 */}
        </Flexbox>

        <Flexbox
          alignItems="center"
          flexDirections="row"
          justifyContents="between"
          style={style.apiHeaderRightContentStyle}
        >
          <Typography size={0.85} weight="300" color="disabled">
            {title}
          </Typography>
          <Flexbox
            alignItems="center"
            flexDirections="row"
            justifyContents="center"
            style={{
              gap: '1rem',
            }}
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
    </div>
  );
};

API.Body = function Body() {
  // 추후: const header = useAPIStore((state) => state.header);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        backgroundColor: themeCss.color.background[100],
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
        padding: '2rem 3rem',
      }}
    >
      {/* 1. TOP 컨테이너 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          paddingBottom: '1rem',
          borderBottom: '0.1rem solid',
          borderColor: colorPalette.util[400],
        }}
      >
        {/* 1.1 LEFT: API 기본정보 섹션( 메서드타입, title, description, manager )*/}
        <Flexbox justifyContents="between" flexDirections="col">
          {/* 1.1.1 TOP : API 기본정보 박스*/}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                width: '9.5rem',
              }}
            >
              <Typography color="delete" size={2.5} weight="700">
                DELETE
              </Typography>
              <Typography
                color="delete"
                size={0.85}
                weight="600"
                style={{ marginBottom: '2rem' }}
              >
                특별한 계란 삭제하기
              </Typography>

              <Typography color="disabled" size={0.85} weight="400">
                특별한 계란을 삭제하는 API입니다.. 주절주절
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '75%',
                  height: '0.35rem',
                  backgroundColor: colorPalette.deepOrange[500],
                }}
              />
              <ManagerAvatar id={1} nickname="성우" size={2} />
            </div>
          </div>
          {/* 1.1.2 BOTTOM : 편집,삭제 버튼 그룹*/}
          <Flexbox
            flexDirections="row"
            justifyContents="between"
            style={{
              gap: '0.5rem',
            }}
          >
            <Button rounded={0.3} paddingY={0.25}>
              편집
            </Button>
            <Button rounded={0.3} paddingY={0.25}>
              삭제
            </Button>
          </Flexbox>
        </Flexbox>
        {/* 1.2 RIGHT: 테스트케이스 리스트 섹션*/}
        <Flexbox
          style={{
            flexGrow: 1,
          }}
        >
          <TestCase>
            <TestCase.Header />
            <TestCase.Body />
          </TestCase>
        </Flexbox>
      </div>

      {/* 2. BOTTOM 컨테이너 : 테스트로그 SUMMARY 섹션*/}
      <Flexbox
        flexDirections="col"
        style={{
          backgroundColor: 'red',
          height: '3rem',
        }}
      ></Flexbox>
    </div>
  );
};
