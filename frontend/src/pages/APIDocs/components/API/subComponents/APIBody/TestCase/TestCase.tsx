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
import { TestCaseTable } from './TestCaseTable/TestCaseTable';
import Button from '../../../../../../../components/Button';
import {
  testcaseDummyList,
  TestCaseHeaderInfo,
} from '../../../../../dummies/testcase_dummy_list';
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

TestCase.Body = function Body() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const context = useTestCaseContext();
  const { isFocused } = context.useIsFocusedHook;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setTabValue(newValue);
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
          <CustomTabs value={tabValue} onChange={handleChange}>
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
        <TestCaseTable isEditing={isEditing}>
          <TestCaseTable.Section
            headers={testcaseDummyList[tabValue].headers}
            rows={testcaseDummyList[tabValue].rows}
            isEditing={isEditing}
          />
        </TestCaseTable>
      </Flexbox>

      {/* Expected Responses */}
      <ExpectedResponse isEditing={isEditing}>
        <ExpectedResponse.Schema />
        <ExpectedResponse.Example />
      </ExpectedResponse>
    </div>
  );
};