import React, { useState } from 'react';
import Flexbox from '../../../../../../../components/Flexbox';
import { ParamBase, RequestSchemaTable } from './Table/RequestSchemaTable';
import {
  CustomTab,
  CustomTabs,
} from '../../../../../../../components/CustomTabs/CustomTabs';
import Button from '../../../../../../../components/Button';
import Typography from '../../../../../../../components/Typography';
import { ExampleUrl } from './ExampleUrl/ExampleUrl';

interface TabValue {
  value: number;
  type: 'params' | 'path variable' | 'headers' | 'req body';
}

// data 6종류 :
// type 6종류 : Params, Path variables, Header, ( Req Body-1: none ), ( Req Body-1: form-data ), ( Req Body-1: row )
type TabValueTypes = 0 | 1 | 2 | 3; // Params, Path variables, headers, Req Body
type ReqBodyTypes = 0 | 1 | 2; // none, form-data, row;

export const RequestDocs = () => {
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

  const [isEditMode, setEditMode] = useState(false);

  const [tabValue, setTabValue] = useState<TabValue>({
    value: 0,
    type: 'params',
  });

  const [contentData, setContentData] = useState<ParamBase[]>(
    REQUEST_CONTENT_LIST_DUMMIES.PARAMS_DATA_LIST_DUMMY,
  );
  const [reqBodyMode, setReqBodyMode] = useState<number>(0);

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

  return (
    <Flexbox
      flexDirections="col"
      style={{
        width: '100%',
        height: 'max-content',
      }}
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
        <Flexbox
          style={{
            justifyContent: 'end',
          }}
        >
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
      <Flexbox
        flexDirections="col"
        style={{
          gap: '3rem',
        }}
      >
        {' '}
        <ExampleUrl method={DUMMY_METHOD} isEditMode={isEditMode} />
        {/* 테이블 컨텐츠 */}
        <Flexbox flexDirections="col" style={{ gap: '0.7rem' }}>
          <CustomTabs value={tabValue.value} onChange={handleChange}>
            <CustomTab label="Params" />
            <CustomTab label="Path variables" />
            <CustomTab label="Header" />
            <CustomTab label="Req Body" />
          </CustomTabs>
          <RequestSchemaTable
            data={contentData}
            type={tabValue.type}
            isEditMode={isEditMode}
            onChange={(newData) => setContentData(newData)}
          />
        </Flexbox>
        {/* --------------*/}
      </Flexbox>

      {/* ========================================== */}
    </Flexbox>
  );
};

// 더미
const PARAMS_DATA_LIST_DUMMY = [
  {
    key: 'category',
    description: '검색대상 카테고리 지정하는 용도',
    required: '선택',
  },
];

const PATHVARIABLES_DATA_LIST_DUMMY = [
  {
    key: 'userId',
    description: '조회할 유저의 ID 명시',
    required: '필수',
  },
];

const HEADERS_DATA_LIST_DUMMY = [
  {
    key: 'customHeader',
    description: '커스텀 헤더',
    required: '선택',
  },
];

const REQUESTBODY_DATA_LIST_DUMMY = [
  {
    key: 'username',
    description: '단순 username입니다.',
    required: '선택',
    type: 'Text',
  },
  {
    key: 'file',
    description: '첨부 파일',
    required: '필수',
    type: 'File',
  },
];

const REQUEST_CONTENT_LIST_DUMMIES = {
  PARAMS_DATA_LIST_DUMMY: PARAMS_DATA_LIST_DUMMY,
  PATHVARIABLES_DATA_LIST_DUMMY: PATHVARIABLES_DATA_LIST_DUMMY,
  HEADERS_DATA_LIST_DUMMY: HEADERS_DATA_LIST_DUMMY,
  REQUESTBODY_DATA_LIST_DUMMY: REQUESTBODY_DATA_LIST_DUMMY,
};

const DUMMY_METHOD = 'get';
