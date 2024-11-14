import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import Typography from '../../../../../../../components/Typography';
import { CollapseIcon } from '../../APICommon/CollapseIcon/CollapseIcon';
import TestButton from '../../../../TestButton/TestButton';
import { ExpectedResponse } from './ExpectedResponse/ExpectedResponse';
// import { TestCaseTable } from './TestCaseTable/Temp/TestCaseTable';
import { ParamBase, TestCaseTable } from './TestCaseTable/TestCaseTable';

import Button from '../../../../../../../components/Button';
import { TestCaseHeaderInfo } from '../../../../../dummies/testcase_dummy_list';
import {
  CustomTab,
  CustomTabs,
} from '../../../../../../../components/CustomTabs/CustomTabs';
import Flexbox from '../../../../../../../components/Flexbox';
import * as s from './TestCase.css';
import TestResultTail from '../../APIHeader/TestResultTail/TestResultTail';
import useIsFocusedHook, {
  useIsFocusedHookReturnType,
} from '../../../../../hooks/useIsFocusedHook';
import { throttle } from 'lodash';
import { HTTP_STATUS_CODES } from '../../../../../types/httpStatus';
import { TEST_RESULTS } from '../../../API.data.types';

interface TestCaseProps {
  children: React.ReactNode;
  testCaseHeaderInfo: TestCaseHeaderInfo;
}

interface TestCaseContextProps extends TestCaseProps {
  useIsFocusedHook: useIsFocusedHookReturnType;
}

const TestCaseContext = createContext<TestCaseContextProps | null>(null);

const useTestCaseContext = () => {
  const context = useContext(TestCaseContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

interface TestCaseListProps {
  // apiId: APIProps['id'];
  children: ReactNode;
}

export const TestCaseList = ({
  // apiId,
  children,
}: TestCaseListProps) => {
  return (
    <Flexbox
      flexDirections="col"
      style={{
        width: '100%',
      }}
    >
      <Flexbox flexDirections="row" justifyContents="between">
        <Typography
          style={{
            textAlign: 'start',
            fontSize: '1.4rem',
            fontWeight: '600',
            marginBottom: '1rem',
          }}
        >
          테스트 케이스
        </Typography>
        <Flexbox
          flexDirections="row"
          style={{
            gap: '0.25rem',
          }}
        >
          <TestButton.API />
          <Button rounded={0.5}>
            <Typography size={0.75}>케이스 추가</Typography>
          </Button>
        </Flexbox>
      </Flexbox>
      {children}
    </Flexbox>
  );
};

export const TestCase = ({ children, testCaseHeaderInfo }: TestCaseProps) => {
  return (
    <TestCaseContext.Provider
      value={{
        children,
        testCaseHeaderInfo,
        useIsFocusedHook: {
          ...useIsFocusedHook(),
        },
      }}
    >
      <Flexbox
        flexDirections="col"
        alignItems="normal"
        style={{
          width: '100%',
        }}
      >
        {children}
      </Flexbox>
    </TestCaseContext.Provider>
  );
};

TestCase.Header = function Header() {
  const context = useTestCaseContext();
  const { isFocused, handleToggleIsFocused } = context.useIsFocusedHook;

  const onClickHeader = useCallback(
    throttle((e: React.MouseEvent) => {
      e.stopPropagation();
      handleToggleIsFocused();
    }, 500),
    [isFocused],
  );

  const statusCodeColor = context.testCaseHeaderInfo.statusCode
    .charAt(0)
    .match('2')
    ? 'originalGreen'
    : 'originalRed';

  return (
    <div
      className={s.headerContainerRecipe({ isOpen: isFocused })}
      onClick={onClickHeader}
    >
      <Flexbox
        flexDirections="row"
        alignItems="center"
        style={{
          gap: '1rem',
          height: '2.5rem',
        }}
      >
        <Typography size={0.85} weight="500" color={statusCodeColor}>
          {`${context.testCaseHeaderInfo.statusCode}  ${HTTP_STATUS_CODES[context.testCaseHeaderInfo.statusCode]}`}
        </Typography>
        <Typography size={0.8} weight="400" color={'disabled'}>
          {context.testCaseHeaderInfo.description}
        </Typography>
      </Flexbox>
      <Flexbox
        flexDirections="row"
        alignItems="center"
        style={{
          gap: '0.5rem',
        }}
      >
        <TestButton.TestCase />
        <CollapseIcon isOpen={false} />
        <TestResultTail testStatus={TEST_RESULTS.SUCCESS} />
      </Flexbox>
    </div>
  );
};

interface TabValue {
  value: number;
  type: 'params' | 'path variable' | 'headers' | 'req body';
}

TestCase.Body = function Body() {
  // const [tabValue, setTabValue] = useState(0);

  const [tabValue, setTabValue] = useState<TabValue>({
    value: 0,
    type: 'params',
  });
  const [isEditing, setIsEditing] = useState(false);

  const context = useTestCaseContext();
  const { isFocused } = context.useIsFocusedHook;

  // TestCaseTable 관련
  const [contentData, setContentData] = useState<ParamBase[]>(
    REQUEST_CONTENT_LIST_DUMMIES.PARAMS_DATA_LIST_DUMMY,
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);

    if (newValue === 0) {
      setTabValue({ type: 'params', value: newValue });
      setContentData(REQUEST_CONTENT_LIST_DUMMIES.PARAMS_DATA_LIST_DUMMY);
    } else if (newValue === 1) {
      setTabValue({ type: 'path variable', value: newValue });
      setContentData(
        REQUEST_CONTENT_LIST_DUMMIES.PATHVARIABLES_DATA_LIST_DUMMY,
      );
    } else if (newValue === 2) {
      setTabValue({ type: 'headers', value: newValue });
      setContentData(REQUEST_CONTENT_LIST_DUMMIES.HEADERS_DATA_LIST_DUMMY);
    } else if (newValue === 3) {
      setTabValue({ type: 'req body', value: newValue });
      setContentData(REQUEST_CONTENT_LIST_DUMMIES.REQUESTBODY_DATA_LIST_DUMMY);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={s.testBodyContainerRecipe({ isOpen: isFocused })}>
      {/* 1. 테이블 섹션 */}
      <Flexbox
        flexDirections="col"
        style={{
          gap: '0.5rem',
        }}
      >
        {/* 1.1 Tabs 메뉴 섹션 */}
        <Flexbox
          justifyContents="between"
          style={{
            width: '100%',
          }}
        >
          <CustomTabs value={tabValue.value} onChange={handleChange}>
            <CustomTab label="Params" />
            <CustomTab label="Path variables" />
            <CustomTab label="Header" />
            <CustomTab label="Req Body" />
          </CustomTabs>

          <Button onClick={toggleEditMode} rounded={0.5} color="grey">
            <Typography size={0.75}>{isEditing ? '완료' : '편집'}</Typography>
          </Button>
        </Flexbox>

        {/* 1.2 Tabs 컨텐츠: TestCaseTable */}
        {/* <TestCaseTable isEditing={isEditing}>
          <TestCaseTable.Section
            headers={testcaseDummyList[tabValue.value].headers}
            rows={testcaseDummyList[tabValue].rows}
            isEditing={isEditing}
          />
        </TestCaseTable> */}

        <TestCaseTable
          data={contentData}
          type={tabValue.type}
          isEditMode={isEditing}
          onChange={(newData) => setContentData(newData)}
        />
      </Flexbox>

      {/* Expected Responses */}
      <ExpectedResponse isEditing={isEditing}>
        <ExpectedResponse.Schema />
        <ExpectedResponse.Example />
      </ExpectedResponse>
    </div>
  );
};

//=============================================================
// 더미
const PARAMS_DATA_LIST_DUMMY = [
  {
    key: 'category',
    value: 'value1333',
    description: '검색대상 카테고리 지정하는 용도',
  },
];

const PATHVARIABLES_DATA_LIST_DUMMY = [
  {
    key: 'userId',
    value: 'value1234',
    description: '조회할 유저의 ID 명시',
  },
];

const HEADERS_DATA_LIST_DUMMY = [
  {
    key: 'customHeader',
    value: 'value5678',
    description: '커스텀 헤더',
  },
];

const REQUESTBODY_DATA_LIST_DUMMY = [
  {
    key: 'username',
    value: 'value123',
    description: '단순 username입니다.',
    type: 'Text',
  },
  {
    key: 'file',
    value: 'file123',
    description: '첨부 파일',
    type: 'File',
  },
];

const REQUEST_CONTENT_LIST_DUMMIES = {
  PARAMS_DATA_LIST_DUMMY: PARAMS_DATA_LIST_DUMMY,
  PATHVARIABLES_DATA_LIST_DUMMY: PATHVARIABLES_DATA_LIST_DUMMY,
  HEADERS_DATA_LIST_DUMMY: HEADERS_DATA_LIST_DUMMY,
  REQUESTBODY_DATA_LIST_DUMMY: REQUESTBODY_DATA_LIST_DUMMY,
};
