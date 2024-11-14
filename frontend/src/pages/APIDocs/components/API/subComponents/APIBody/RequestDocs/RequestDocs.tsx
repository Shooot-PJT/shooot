// frontend/src/pages/APIDocs/components/API/subComponents/APIBody/RequestDocs/RequestDocs.tsx
import React, { useState } from 'react';
import Flexbox from '../../../../../../../components/Flexbox';
import {
  RequestSchemaTable,
  ParamBase,
} from './RequestContents/RequestSchemaTable/RequestSchemaTable';
import {
  CustomTab,
  CustomTabs,
} from '../../../../../../../components/CustomTabs/CustomTabs';
import Button from '../../../../../../../components/Button';
import Typography from '../../../../../../../components/Typography';
import { ExampleUrl } from './ExampleUrl/ExampleUrl';

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { BodyNone } from './RequestContents/BodyNone/BodyNone';
import JsonEditor from '../../APICommon/JsonEditor/JsonEditor';
import { APIRequestDocsContent } from '../../../API.data.types';
import { TableValueFormat } from '../TestCase/TestCase.data.types';

type ReqTabMenuTypes = 'params' | 'path variable' | 'headers' | 'req body';
type ReqBodyTypes = 'none' | 'form-data' | 'row';

interface TabValue {
  value: number;
  type: ReqTabMenuTypes;
}

interface RequestDocsProps {
  requestDocs: APIRequestDocsContent;
}

export const RequestDocs = ({ requestDocs }: RequestDocsProps) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState<TabValue>({
    value: 0,
    type: 'params',
  });

  const [reqBodyMenu, setReqBodyMenu] = useState<ReqBodyTypes>(
    requestDocs.body
      ? requestDocs.body.raw
        ? 'row'
        : requestDocs.body.formData
          ? 'form-data'
          : 'none'
      : 'none',
  );

  const [contentData, setContentData] = useState<ParamBase[]>(
    convertTableDataToParamBase(
      requestDocs.params || {},
      tabValue.type,
      isEditMode,
    ),
  );

  const toggleEditMode = (
    isEditMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    setData: React.Dispatch<React.SetStateAction<ParamBase[]>>,
    data: ParamBase[],
  ) => {
    if (isEditMode) {
      setData(data.filter((item) => item.key.trim() !== ''));
    }
    setEditMode(!isEditMode);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    let newType: ReqTabMenuTypes = 'params';
    if (newValue === 0) newType = 'params';
    else if (newValue === 1) newType = 'path variable';
    else if (newValue === 2) newType = 'headers';
    else if (newValue === 3) newType = 'req body';

    setTabValue({ type: newType, value: newValue });

    const data =
      newType === 'params'
        ? requestDocs.params || {}
        : newType === 'path variable'
          ? requestDocs.pathvariable || {}
          : newType === 'headers'
            ? requestDocs.headers || {}
            : requestDocs.body?.formData?.datas || {};

    setContentData(convertTableDataToParamBase(data, newType, isEditMode));
  };

  const handleChangeReqBodyMenu = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReqBodyMenu(event.target.value as ReqBodyTypes);
  };

  return (
    <Flexbox
      flexDirections="col"
      style={{ width: '100%', height: 'max-content' }}
    >
      <Flexbox flexDirections="row" justifyContents="between">
        <Typography
          style={{
            textAlign: 'start',
            fontSize: '1.4rem',
            fontWeight: '600',
            marginBottom: '2rem',
          }}
        >
          API 요청 정의서
        </Typography>
        <Flexbox style={{ justifyContent: 'end' }}>
          <Button
            color="grey"
            rounded={0.4}
            onClick={() =>
              toggleEditMode(
                isEditMode,
                setEditMode,
                setContentData,
                contentData,
              )
            }
          >
            <Typography>{isEditMode ? '저장' : '편집'}</Typography>
          </Button>
        </Flexbox>
      </Flexbox>
      <Flexbox flexDirections="col" style={{ gap: '3rem' }}>
        <ExampleUrl
          method={requestDocs.method}
          exampleUrl={requestDocs.example_url}
          isEditMode={isEditMode}
        />

        <Flexbox flexDirections="col" style={{ gap: '0.7rem' }}>
          <CustomTabs value={tabValue.value} onChange={handleChangeTab}>
            <CustomTab label="Params" />
            <CustomTab label="Path variables" />
            <CustomTab label="Header" />
            <CustomTab label="Req Body" />
          </CustomTabs>

          {tabValue.value === 3 && (
            <FormControl component="fieldset">
              <RadioGroup
                value={reqBodyMenu}
                onChange={handleChangeReqBodyMenu}
                row
              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
                <FormControlLabel
                  value="form-data"
                  control={<Radio />}
                  label="Form Data"
                />
                <FormControlLabel value="row" control={<Radio />} label="Row" />
              </RadioGroup>
            </FormControl>
          )}

          {tabValue.value === 3 && reqBodyMenu === 'none' ? (
            <BodyNone />
          ) : tabValue.value === 3 && reqBodyMenu === 'row' ? (
            <JsonEditor
              isEditing={isEditMode}
              jsonData={requestDocs.body?.raw?.datas || {}}
            />
          ) : (
            <RequestSchemaTable
              data={contentData}
              type={tabValue.type}
              isEditMode={isEditMode}
              onChange={(newData) => setContentData(newData)}
            />
          )}
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

// 유틸리티 함수: TableData를 ParamBase 배열로 변환
function convertTableDataToParamBase(
  tableData: Record<string, TableValueFormat>,
  type: ReqTabMenuTypes,
  isEditMode: boolean,
): ParamBase[] {
  return Object.entries(tableData).map(([key, value]) => {
    const [val, description, fieldType, isRequired] = value;
    return {
      key,
      value: val,
      description: description || '',
      required: isRequired ? '필수' : '선택',
      type: fieldType || '',
    };
  });
}
