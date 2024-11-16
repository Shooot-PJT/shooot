import React, { useState, useEffect } from 'react';
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
import {
  TableValueFormat,
  TableData,
} from '../../../../../types/data/TestCase.data';
import { APIDetailInfo } from '../../../API.data.types';

type ReqTabMenuTypes = 'params' | 'pathvariable' | 'headers' | 'req body';
type ReqBodyTypes = 'none' | 'form-data' | 'raw';

interface TabValue {
  value: number;
  type: ReqTabMenuTypes;
}

interface RequestDocsProps {
  requestDocs: APIDetailInfo['requestDocs'] | null;
}

export const RequestDocs = ({ requestDocs }: RequestDocsProps) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState<TabValue>({
    value: 0,
    type: 'params',
  });

  const [reqBodyMenu, setReqBodyMenu] = useState<ReqBodyTypes>('none');

  useEffect(() => {
    if (requestDocs?.body) {
      if (requestDocs.body.raw) {
        setReqBodyMenu('raw');
      } else if (requestDocs.body.formData) {
        setReqBodyMenu('form-data');
      } else {
        setReqBodyMenu('none');
      }
    } else {
      setReqBodyMenu('none');
    }
  }, [requestDocs]);

  // getDataByTabType 함수 수정
  const getDataByTabType = (
    type: ReqTabMenuTypes,
  ): Record<string, TableValueFormat> => {
    if (!requestDocs) return {};

    switch (type) {
      case 'params':
        return requestDocs.params || {};
      case 'pathvariable':
        return requestDocs.pathvariable || {};
      case 'headers':
        return requestDocs.headers || {};
      case 'req body':
        if (requestDocs.body?.formData) {
          const datas = requestDocs.body.formData.datas || {};
          const files = requestDocs.body.formData.files;

          const combinedData: Record<string, TableValueFormat> = { ...datas };

          if (files) {
            if (Array.isArray(files)) {
              // files가 배열인 경우 (단일 파일)
              combinedData['file'] = files as unknown as TableValueFormat;
            } else if (typeof files === 'object' && !Array.isArray(files)) {
              // files가 객체인 경우 (여러 파일)
              Object.entries(files).forEach(([key, value]) => {
                combinedData[key] = value as unknown as TableValueFormat;
              });
            } else {
              // 예상치 못한 타입인 경우 처리하지 않음
            }
          }

          return combinedData;
        }
        return {};
      default:
        return {};
    }
  };

  const [contentData, setContentData] = useState<ParamBase[]>([]);

  useEffect(() => {
    const data = getDataByTabType(tabValue.type);
    setContentData(convertTableDataToParamBase(data, tabValue.type));
  }, [requestDocs, tabValue.type]);

  if (!requestDocs) {
    return <div>요청 정의서가 없습니다.</div>;
  }

  const toggleEditMode = () => {
    if (isEditMode) {
      // 저장 시 키가 없는 행 제거
      const filteredData = contentData.filter((item) => item.key.trim() !== '');
      setContentData(filteredData);
      // TODO: 저장 로직 추가 (API 호출 등)
    }
    setEditMode(!isEditMode);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    let newType: ReqTabMenuTypes = 'params';
    if (newValue === 0) newType = 'params';
    else if (newValue === 1) newType = 'pathvariable';
    else if (newValue === 2) newType = 'headers';
    else if (newValue === 3) newType = 'req body';

    setTabValue({ type: newType, value: newValue });

    const data = getDataByTabType(newType);
    setContentData(convertTableDataToParamBase(data, newType));
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
          <Button color="grey" rounded={0.4} onClick={toggleEditMode}>
            <Typography>{isEditMode ? '저장' : '편집'}</Typography>
          </Button>
        </Flexbox>
      </Flexbox>
      <Flexbox flexDirections="col" style={{ gap: '3rem' }}>
        <ExampleUrl
          method={requestDocs.method || 'get'}
          exampleUrl={requestDocs.example_url || ''}
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
                <FormControlLabel value="raw" control={<Radio />} label="Raw" />
              </RadioGroup>
            </FormControl>
          )}

          {tabValue.value === 3 && reqBodyMenu === 'none' ? (
            <BodyNone />
          ) : tabValue.value === 3 && reqBodyMenu === 'raw' ? (
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

function convertTableDataToParamBase(
  tableData: Record<string, TableValueFormat>,
  type: ReqTabMenuTypes,
): ParamBase[] {
  return Object.entries(tableData).map(([key, value]) => {
    const [
      // val,
      description,
      fieldType,
      isRequired,
    ] = value;
    const requiredStr = isRequired === true ? '필수' : '선택';

    return {
      key,
      description: description || '',
      required: requiredStr,
      type:
        type === 'req body'
          ? fieldType || 'Text'
          : type === 'headers'
            ? fieldType || 'String'
            : undefined,
    };
  });
}
