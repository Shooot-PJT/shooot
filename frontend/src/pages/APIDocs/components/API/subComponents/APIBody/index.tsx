import Button from '../../../../../../components/Button';
import Flexbox from '../../../../../../components/Flexbox';
import Typography from '../../../../../../components/Typography';
import {
  TestCaseHeaderInfo,
  testCaseSummaryList,
} from '../../../../dummies/testcase_dummy_list';
import { useAPIContext } from '../../API';
import ManagerAvatar from '../APICommon/ManagerAvatar/ManagerAvatar';
import * as s from './index.css';
import { RequestDocs } from './RequestDocs/RequestDocs';
import { TestCase, TestCaseList } from './TestCase/TestCase';
import { TestLogBox } from './TestLogBox/TestLogBox';

export const Body = () => {
  const context = useAPIContext();
  const { isFocused } = context.useIsFocusedHook;

  return (
    <div className={s.CollapseContainerRecipe({ isOpen: isFocused })}>
      <Flexbox flexDirections="col" style={s.apiBodyContainerStyle}>
        {/* 1. TOP 컨테이너 */}
        <Flexbox flexDirections="row" style={s.apiBodyTopContainerStyle}>
          {/* 1.1 LEFT: API 기본정보 섹션( 메서드타입, title, description, manager )*/}
          <Flexbox justifyContents="between" flexDirections="col">
            {/* 1.1.1 TOP : API 기본정보 박스*/}
            <Flexbox
              flexDirections="col"
              style={{
                gap: '4rem',
                paddingBottom: '1.5rem',
              }}
            >
              <Flexbox
                flexDirections="col"
                style={{
                  textAlign: 'left',
                  width: '12rem',
                }}
              >
                <Typography
                  color={context.headerInfo.method}
                  size={2.5}
                  weight="700"
                >
                  {context.headerInfo.method.toUpperCase()}
                </Typography>
                <Typography
                  color={context.headerInfo.method}
                  size={0.85}
                  weight="600"
                  style={{
                    marginBottom: '2rem',
                    whiteSpace: 'wrap',
                    wordBreak: 'keep-all',
                  }}
                >
                  {context.headerInfo.apiTitle}
                </Typography>

                <Typography
                  color="disabled"
                  size={0.85}
                  weight="400"
                  style={{
                    whiteSpace: 'wrap',
                    wordBreak: 'keep-all',
                  }}
                >
                  {context.headerInfo.apiDescription}
                </Typography>
              </Flexbox>
              <Flexbox flexDirections="col" style={{ gap: '1rem' }}>
                <div
                  className={s.leftDividerRecipe({
                    method: context.headerInfo.method,
                  })}
                />
                <Typography
                  weight="600"
                  style={{
                    textAlign: 'left',
                  }}
                >
                  담당자
                </Typography>
                <ManagerAvatar
                  manager={context.headerInfo.manager}
                  size={2}
                  withLabel
                />
              </Flexbox>
            </Flexbox>

            {/* 1.1.2 BOTTOM : 편집,삭제 버튼 그룹*/}
            <Flexbox
              flexDirections="row"
              justifyContents="start"
              style={{
                gap: '1rem',
              }}
            >
              <Button color="grey" rounded={0.3}>
                편집
              </Button>
              <Button color="grey" rounded={0.3}>
                삭제
              </Button>
            </Flexbox>
          </Flexbox>
          {/* 1.2 RIGHT: API 요청 정의서 & 테스트케이스 리스트 섹션*/}

          <Flexbox
            style={{
              flexGrow: 1,
            }}
          >
            <Flexbox
              flexDirections="col"
              style={{ gap: '3rem', width: '100%' }}
            >
              {/* 1.2.1 RIGHT-TOP: API 요청 정의서  */}
              {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
              <Typography
                style={{
                  textAlign: 'start',
                  fontSize: '1.4rem',
                  fontWeight: '600',
                }}
              >
                API 요청 정의서
              </Typography>
              {/* Request Docs 컴포넌트 */}
              {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
              <RequestDocs />
              {/* HORIZONTAL DIVIDER */}
              <div
                style={{
                  width: '100%',
                  height: '0.125rem',
                  backgroundColor: 'red',
                }}
              />
              {/* 1.2.2 RIGHT-BOTTOM: 테스트케이스 리스트 섹션*/}
              <Typography
                style={{
                  textAlign: 'start',
                  fontSize: '1.4rem',
                  fontWeight: '600',
                }}
              >
                테스트 케이스
              </Typography>

              <TestCaseList>
                {testCaseSummaryList.map((item: TestCaseHeaderInfo) => (
                  <TestCase key={item.id} testCaseHeaderInfo={item}>
                    <TestCase.Header />
                    <TestCase.Body />
                  </TestCase>
                ))}
              </TestCaseList>
            </Flexbox>

            {/*  */}
          </Flexbox>
        </Flexbox>

        {/* 2. BOTTOM 컨테이너 : 테스트로그 SUMMARY 섹션*/}
        <TestLogBox />
      </Flexbox>
    </div>
  );
};
