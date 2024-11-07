import React, { useState } from 'react';
import Flexbox from '../../../../../../../components/Flexbox';
import { Table } from './Table/Table';

interface ParamBase {
  key: string;
  value: string;
  description: string;
  required: string;
}

interface ReqBodyParam extends ParamBase {
  type: string;
}

export const RequestDocs = () => {
  const [paramsData, setParamsData] = useState<ParamBase[]>([
    {
      key: 'category',
      value: 'value1333',
      description: '검색대상 카테고리 지정하는 용도',
      required: '선택',
    },
  ]);

  const [pathVariableData, setPathVariableData] = useState<ParamBase[]>([
    {
      key: 'userId',
      value: 'value1234',
      description: '조회할 유저의 ID 명시',
      required: '필수',
    },
  ]);

  const [headersData, setHeadersData] = useState<ParamBase[]>([
    {
      key: 'customHeader',
      value: 'value5678',
      description: '커스텀 헤더',
      required: '선택',
    },
  ]);

  const [reqBodyData, setReqBodyData] = useState<ReqBodyParam[]>([
    {
      key: 'username',
      value: 'value123',
      description: '단순 username입니다.',
      required: '선택',
      type: 'Text',
    },
    {
      key: 'file',
      value: 'file123',
      description: '첨부 파일',
      required: '필수',
      type: 'File',
    },
  ]);

  const [isParamsEditMode, setParamsEditMode] = useState(false);
  const [isPathVariableEditMode, setPathVariableEditMode] = useState(false);
  const [isHeadersEditMode, setHeadersEditMode] = useState(false);
  const [isReqBodyEditMode, setReqBodyEditMode] = useState(false);

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

  return (
    <Flexbox
      flexDirections="col"
      style={{
        gap: '2rem',
        width: '100%',
        height: 'max-content',
        backgroundColor: 'blue',
      }}
    >
      <div
        style={{ width: '100%', height: '8rem', backgroundColor: 'white' }}
      />

      {/* Params Table */}
      <div>
        <button
          onClick={() =>
            toggleEditMode(
              isParamsEditMode,
              setParamsEditMode,
              setParamsData,
              paramsData,
            )
          }
        >
          {isParamsEditMode ? 'View Mode' : 'Edit Mode'}
        </button>
        <Table
          data={paramsData}
          type="params"
          isEditMode={isParamsEditMode}
          onChange={(newData) => setParamsData(newData)}
        />
      </div>

      {/* Path Variable Table */}
      <div>
        <button
          onClick={() =>
            toggleEditMode(
              isPathVariableEditMode,
              setPathVariableEditMode,
              setPathVariableData,
              pathVariableData,
            )
          }
        >
          {isPathVariableEditMode ? 'View Mode' : 'Edit Mode'}
        </button>
        <Table
          data={pathVariableData}
          type="path variable"
          isEditMode={isPathVariableEditMode}
          onChange={(newData) => setPathVariableData(newData)}
        />
      </div>

      {/* Headers Table */}
      <div>
        <button
          onClick={() =>
            toggleEditMode(
              isHeadersEditMode,
              setHeadersEditMode,
              setHeadersData,
              headersData,
            )
          }
        >
          {isHeadersEditMode ? 'View Mode' : 'Edit Mode'}
        </button>
        <Table
          data={headersData}
          type="headers"
          isEditMode={isHeadersEditMode}
          onChange={(newData) => setHeadersData(newData)}
        />
      </div>

      {/* Req Body Table */}
      <div>
        <button
          onClick={() =>
            toggleEditMode(
              isReqBodyEditMode,
              setReqBodyEditMode,
              setReqBodyData,
              reqBodyData,
            )
          }
        >
          {isReqBodyEditMode ? 'View Mode' : 'Edit Mode'}
        </button>
        <Table
          data={reqBodyData}
          type="req body"
          isEditMode={isReqBodyEditMode}
          onChange={(newData) => setReqBodyData(newData)}
        />
      </div>

      <div
        style={{ width: '100%', height: '10rem', backgroundColor: 'white' }}
      />
    </Flexbox>
  );
};
