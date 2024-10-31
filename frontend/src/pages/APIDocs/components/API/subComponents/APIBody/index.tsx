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
import { TestCase, TestCaseList } from './TestCase/TestCase';
import { TestLogBox } from './TestLogBox/TestLogBox';

export function Body() {
  const context = useAPIContext();
  const { isFocused } = context.useIsFocusedHook;

  return (
    <div className={s.apiBodyContainerRecipe({ isOpen: isFocused })}>
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
                  width: '9.5rem',
                }}
              >
                <Typography color={context.method} size={2.5} weight="700">
                  {context.method.toUpperCase()}
                </Typography>
                <Typography
                  color={context.method}
                  size={0.85}
                  weight="600"
                  style={{
                    marginBottom: '2rem',
                    whiteSpace: 'wrap',
                    wordBreak: 'keep-all',
                  }}
                >
                  {context.title}
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
                  {context.description}
                </Typography>
              </Flexbox>
              <Flexbox flexDirections="col" style={{ gap: '1rem' }}>
                <div
                  className={s.leftDividerRecipe({ method: context.method })}
                />
                <Typography>담당자</Typography>
                <ManagerAvatar id={1} nickname="성우" size={2} />
              </Flexbox>
            </Flexbox>

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
            {/*  */}
            <TestCaseList>
              {testCaseSummaryList.map((item: TestCaseHeaderInfo) => (
                <TestCase key={item.id} testCaseHeaderInfo={item}>
                  <TestCase.Header />
                  <TestCase.Body />
                </TestCase>
              ))}
            </TestCaseList>

            {/*  */}
          </Flexbox>
        </Flexbox>

        {/* 2. BOTTOM 컨테이너 : 테스트로그 SUMMARY 섹션*/}
        <TestLogBox />
      </Flexbox>
    </div>
  );
}
