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

type ReqTabMenuTypes = 'params' | 'path variable' | 'headers' | 'req body';
type ReqBodyTypes = 'none' | 'form-data' | 'row';

interface TabValue {
  value: number;
  type: ReqTabMenuTypes;
}

export const RequestDocs = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState<TabValue>({
    value: 0,
    type: 'params',
  });
  const [contentData, setContentData] = useState<ParamBase[]>(
    REQUEST_CONTENT_LIST_DUMMIES.PARAMS_DATA_LIST_DUMMY,
  );
  const [reqBodyMenu, setReqBodyMenu] = useState<ReqBodyTypes>('none');

  const toggleEditMode = <T extends ParamBase>(
    isEditMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    data: T[],
  ) => {
    if (isEditMode) {
      setData(data.filter((item) => item.key.trim() !== '') as T[]);
    }
    setEditMode(!isEditMode);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
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
        <ExampleUrl method={DUMMY_METHOD} isEditMode={isEditMode} />

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
              // jsonData={initial_json_dummy}
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

// 더미 데이터
const PARAMS_DATA_LIST_DUMMY = [
  {
    key: 'category',
    description: '검색대상 카테고리 지정하는 용도',
    required: '선택',
  },
];
const PATHVARIABLES_DATA_LIST_DUMMY = [
  { key: 'userId', description: '조회할 유저의 ID 명시', required: '필수' },
];
const HEADERS_DATA_LIST_DUMMY = [
  { key: 'customHeader', description: '커스텀 헤더', required: '선택' },
];
const REQUESTBODY_DATA_LIST_DUMMY = [
  {
    key: 'username',
    description: '단순 username입니다.',
    required: '선택',
    type: 'Text',
  },
  { key: 'file', description: '첨부 파일', required: '필수', type: 'File' },
];
const REQUEST_CONTENT_LIST_DUMMIES = {
  PARAMS_DATA_LIST_DUMMY,
  PATHVARIABLES_DATA_LIST_DUMMY,
  HEADERS_DATA_LIST_DUMMY,
  REQUESTBODY_DATA_LIST_DUMMY,
};
const DUMMY_METHOD = 'get';

const initial_json_dummy = {
  status: 'success',
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
  meta: {
    total: 2,
    page: 1,
  },
};
