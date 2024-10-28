import { useState } from 'react';
import Typography from '../../../../../../../components/Typography';
import themeCss from '../../../../../../../styles/theme.css';
import { CollapseIcon } from '../../APICommon/CollapseIcon/CollapseIcon';
import TestButton from '../../APICommon/TestButton/TestButton';
import { ExpectedResponse } from './ExpectedResponse/ExpectedResponse';
import { TestCaseTable } from './TestCaseTable/TestCaseTable';
import Button from '../../../../../../../components/Button';
import { testcaseDummyList } from '../../../../../dummies/testcase_dummy_list';
import colorPalette from '../../../../../../../styles/colorPalette';
import {
  CustomTab,
  CustomTabs,
} from '../../../../../../../components/CustomTabs/CustomTabs';
import Flexbox from '../../../../../../../components/Flexbox';

interface TestCaseProps {
  children: React.ReactNode;
}

export const TestCase = ({ children }: TestCaseProps) => {
  return (
    <Flexbox
      flexDirections="col"
      alignItems="normal"
      style={{
        width: '100%',
      }}
    >
      {children}
    </Flexbox>
  );
};

TestCase.Header = function Header() {
  return (
    <Flexbox
      flexDirections="row"
      justifyContents="between"
      style={{
        padding: '0rem 1.5rem 0rem 0rem',
        backgroundColor: themeCss.color.background[300],
        border: '0.05rem solid',
        borderColor: colorPalette.util[400],
        borderRadius: '0.6rem',
        overflow: 'hidden',
      }}
    >
      <Flexbox
        flexDirections="row"
        alignItems="center"
        style={{
          gap: '1rem',
          height: '2.5rem',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '0.6rem',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
        />
        <Typography size={0.85} weight="500" color={'originalRed'}>
          401 (Unauthorized)
        </Typography>
        <Typography size={0.8} weight="400" color={'disabled'}>
          비인가 테스트용입니다. 슈웃 해주세요.
        </Typography>
      </Flexbox>
      <Flexbox
        flexDirections="row"
        alignItems="center"
        style={{
          gap: '0.5rem',
        }}
      >
        <TestButton.API />
        <CollapseIcon isOpen={false} />
      </Flexbox>
    </Flexbox>
  );
};

TestCase.Body = function Body() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Flexbox
      flexDirections="col"
      alignItems="normal"
      style={{
        gap: '4rem',
        borderLeft: '0.07rem solid',
        borderRight: '0.07rem solid',
        borderBottom: '0.07rem solid',
        borderRadius: '0rem 0rem 0.5rem 0.5rem',
        borderColor: colorPalette.util[400],
        backgroundColor: themeCss.color.background[200],
        padding: '0.75rem',
      }}
    >
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

          <Button onClick={toggleEditMode} rounded={0.5}>
            <Typography size={0.75}>{isEditing ? '완료' : '편집'}</Typography>
          </Button>
        </Flexbox>

        {/* 1.2 Tabs 컨텐츠: TestCaseTable */}
        <TestCaseTable>
          <TestCaseTable.Section
            headers={testcaseDummyList[tabValue].headers}
            rows={testcaseDummyList[tabValue].rows}
            isEditing={isEditing}
          />
        </TestCaseTable>
      </Flexbox>

      {/* Expected Responses */}
      <ExpectedResponse>
        <ExpectedResponse.Schema />
        <ExpectedResponse.Example />
      </ExpectedResponse>
    </Flexbox>
  );
};
