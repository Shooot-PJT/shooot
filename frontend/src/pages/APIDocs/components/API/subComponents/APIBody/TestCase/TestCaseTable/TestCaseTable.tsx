import React, { useEffect, useState, useCallback } from 'react';
import { useGetTestCaseDetail } from '../../../../../../reactQueries/testcase';
import { editTestCase } from '../../../../../../apis';
import Editor, { OnMount } from '@monaco-editor/react';
import { BodyNone } from '../../RequestDocs/RequestContents/BodyNone/BodyNone';
import {
  CustomTab,
  CustomTabs,
} from '../../../../../../../../components/CustomTabs/CustomTabs';
import { TestCaseDetailInfo } from '../../../../../../types/data/TestCase.data';
import { useQueryClient } from '@tanstack/react-query';
import {
  CustomFormData,
  FileMeta,
  TableRow,
  TableValueFormat,
} from './TestCaseTable.types';

import KeyValueTable from './KeyValueTable';
import BodyFormData from './BodyFormData';

import * as styles from './KeyValueTable.css';
import * as bodyFormDataStyles from './BodyFormData.css';
import { v4 as uuidv4 } from 'uuid';

interface TestCaseTableProps {
  testCaseId: number;
}

export const TestCaseTable: React.FC<TestCaseTableProps> = ({ testCaseId }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const {
    data: testCaseDetail,
    isLoading,
    isError,
  } = useGetTestCaseDetail({ testcaseId: testCaseId });

  const [bodyType, setBodyType] = useState<'none' | 'raw' | 'form-data'>(
    'none',
  );

  const [editedTestCase, setEditedTestCase] =
    useState<TestCaseDetailInfo | null>(null);

  const queryClient = useQueryClient();

  // params, headers, pathvariable 데이터를 배열로 관리
  const [paramsRows, setParamsRows] = useState<TableRow[]>([]);
  const [headersRows, setHeadersRows] = useState<TableRow[]>([]);
  const [pathvariableRows, setPathvariableRows] = useState<TableRow[]>([]);

  useEffect(() => {
    if (testCaseDetail) {
      setEditedTestCase({
        ...testCaseDetail,
        content: {
          ...testCaseDetail.content,
          body: testCaseDetail.content.body || { raw: null, formData: null },
        },
      });

      switch (testCaseDetail.type) {
        case 'MULTIPART':
          setBodyType('form-data');
          break;
        case 'JSON':
          setBodyType('raw');
          break;
        case 'NONE':
        default:
          setBodyType('none');
          break;
      }

      // params 데이터를 배열로 변환하여 저장
      const paramsData = testCaseDetail.content.params || {};
      const paramsArray = Object.entries(paramsData).map(([key, value]) => {
        const [val, description, type, isRequired] = value as TableValueFormat;
        return {
          id: uuidv4(),
          key,
          value: val,
          description,
          type: (type as 'Text' | 'File') || 'Text',
          isRequired: isRequired || false,
        } as TableRow;
      });
      setParamsRows(paramsArray);

      // headers 데이터를 배열로 변환하여 저장
      const headersData = testCaseDetail.content.headers || {};
      const headersArray = Object.entries(headersData).map(([key, value]) => {
        const [val, description, type, isRequired] = value as TableValueFormat;
        return {
          id: uuidv4(),
          key,
          value: val,
          description,
          type: (type as 'Text' | 'File') || 'Text',
          isRequired: isRequired || false,
        } as TableRow;
      });
      setHeadersRows(headersArray);

      // pathvariable 데이터를 배열로 변환하여 저장
      const pathvariableData = testCaseDetail.content.pathvariable || {};
      const pathvariableArray = Object.entries(pathvariableData).map(
        ([key, value]) => {
          const [val, description, type, isRequired] =
            value as TableValueFormat;
          return {
            id: uuidv4(),
            key,
            value: val,
            description,
            type: (type as 'Text' | 'File') || 'Text',
            isRequired: isRequired || false,
          } as TableRow;
        },
      );
      setPathvariableRows(pathvariableArray);
    }
  }, [testCaseDetail]);

  if (isLoading) {
    return <div>테스트케이스 로딩 중...</div>;
  }

  if (isError || !testCaseDetail) {
    return <div>테스트케이스를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const testCase = editedTestCase || testCaseDetail;

  const tabLabels = ['Params', 'PathVariables', 'Header', 'Body'];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBodyTypeChange = (type: 'none' | 'raw' | 'form-data') => {
    setBodyType(type);

    let newRequestType: 'MULTIPART' | 'JSON' | 'NONE' = 'NONE';
    if (type === 'form-data') newRequestType = 'MULTIPART';
    else if (type === 'raw') newRequestType = 'JSON';
    else if (type === 'none') newRequestType = 'NONE';

    if (!editedTestCase) return;
    setEditedTestCase({
      ...editedTestCase,
      type: newRequestType,
      content: {
        ...editedTestCase.content,
        body: {
          raw: null,
          formData: null,
        },
      },
    });
  };

  const toggleEditMode = async () => {
    if (isEditMode && editedTestCase) {
      // 저장 버튼을 눌렀을 때
      try {
        console.log('Editing TestCase with ID:', testCaseId);

        // paramsRows, headersRows, pathvariableRows를 객체 형태로 변환하여 저장
        const paramsData: TableData = {};
        paramsRows.forEach((row) => {
          paramsData[row.key] = [
            row.value,
            row.description,
            row.type || 'Text',
            row.isRequired || false,
          ];
        });

        const headersData: TableData = {};
        headersRows.forEach((row) => {
          headersData[row.key] = [
            row.value,
            row.description,
            row.type || 'Text',
            row.isRequired || false,
          ];
        });

        const pathvariableData: TableData = {};
        pathvariableRows.forEach((row) => {
          pathvariableData[row.key] = [
            row.value,
            row.description,
            row.type || 'Text',
            row.isRequired || false,
          ];
        });

        // editedTestCase 업데이트
        const updatedTestCase = {
          ...editedTestCase,
          content: {
            ...editedTestCase.content,
            params: paramsData,
            headers: headersData,
            pathvariable: pathvariableData,
          },
        };

        const formData = new FormData();

        formData.append('type', updatedTestCase.type);
        console.log('TYPE: ', updatedTestCase.type);

        formData.append('content', JSON.stringify(updatedTestCase.content));

        console.log('FormData entries:');
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        await editTestCase(
          { testcaseId: testCaseId }, // testCaseId를 직접 사용
          formData,
        );

        await queryClient.invalidateQueries({
          queryKey: ['testCaseDetail', testCaseId],
        });
        console.log('TestCase updated successfully');
      } catch (error) {
        console.error('Failed to update TestCase:', error);
      }
    }
    setIsEditMode(!isEditMode);
  };

  const handleDataChange = (section: string, data: any) => {
    if (!editedTestCase) return;
    setEditedTestCase({
      ...editedTestCase,
      content: {
        ...editedTestCase.content,
        [section]: data,
      },
    });
  };

  return (
    <div>
      <h1>{testCase.title}</h1>
      <button onClick={toggleEditMode}>{isEditMode ? '저장' : '편집'}</button>

      {/* CustomTabs로 탭 구성 */}
      <CustomTabs value={activeTab} onChange={handleTabChange}>
        {tabLabels.map((label, index) => (
          <CustomTab key={index} label={label} />
        ))}
      </CustomTabs>

      {/* 탭 콘텐츠 렌더링 */}
      {activeTab === 0 && (
        <KeyValueTable
          rows={paramsRows}
          setRows={setParamsRows}
          isEditMode={isEditMode}
        />
      )}
      {activeTab === 1 && (
        <KeyValueTable
          rows={pathvariableRows}
          setRows={setPathvariableRows}
          isEditMode={isEditMode}
        />
      )}
      {activeTab === 2 && (
        <KeyValueTable
          rows={headersRows}
          setRows={setHeadersRows}
          isEditMode={isEditMode}
        />
      )}
      {activeTab === 3 && (
        <div>
          {/* Body 타입 선택 라디오 버튼 */}
          <div>
            <label>
              <input
                type="radio"
                value="none"
                checked={bodyType === 'none'}
                onChange={() => handleBodyTypeChange('none')}
                disabled={!isEditMode}
              />
              None
            </label>
            <label>
              <input
                type="radio"
                value="raw"
                checked={bodyType === 'raw'}
                onChange={() => handleBodyTypeChange('raw')}
                disabled={!isEditMode}
              />
              Raw
            </label>
            <label>
              <input
                type="radio"
                value="form-data"
                checked={bodyType === 'form-data'}
                onChange={() => handleBodyTypeChange('form-data')}
                disabled={!isEditMode}
              />
              Form Data
            </label>
          </div>

          {/* Body 콘텐츠 렌더링 */}
          {bodyType === 'none' && <BodyNone />}
          {bodyType === 'raw' && (
            <BodyRaw
              raw={testCase.content.body.raw || {}}
              isEditMode={isEditMode}
              onDataChange={(section: string, data: any) => {
                if (!editedTestCase) return;
                setEditedTestCase({
                  ...editedTestCase,
                  content: {
                    ...editedTestCase.content,
                    body: {
                      ...editedTestCase.content.body,
                      raw: data,
                    },
                  },
                });
              }}
              body={testCase.content.body}
            />
          )}
          {bodyType === 'form-data' && (
            <BodyFormData
              formData={testCase.content.body.formData}
              isEditMode={isEditMode}
              onDataChange={(section: string, data: any) => {
                if (!editedTestCase) return;
                setEditedTestCase({
                  ...editedTestCase,
                  content: {
                    ...editedTestCase.content,
                    body: {
                      ...editedTestCase.content.body,
                      formData: data,
                    },
                  },
                });
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

interface BodyRawProps {
  raw: any; // raw의 정확한 타입을 지정해 주시면 좋습니다.
  isEditMode: boolean;
  onDataChange: (section: string, data: any) => void;
  body: any;
}

const BodyRaw: React.FC<BodyRawProps> = ({
  raw,
  isEditMode,
  onDataChange,
  body,
}) => {
  const [jsonData, setJsonData] = useState<string>('');

  useEffect(() => {
    if (raw && raw.datas) {
      setJsonData(JSON.stringify(raw.datas, null, 2));
    } else {
      setJsonData('');
    }
  }, [raw]);

  const handleEditorChange = (value?: string) => {
    setJsonData(value || '');
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    if (isEditMode) {
      editor.onDidBlurEditorWidget(() => {
        try {
          const value = editor.getValue();
          const parsedData = JSON.parse(value);

          // 'raw' 데이터를 포맷팅
          onDataChange('body', {
            ...body,
            raw: {
              datas: parsedData,
              files: null,
            },
          });
        } catch (e) {
          console.error('Invalid JSON:', e);
        }
      });
    }
  };

  return (
    <div>
      <Editor
        height="400px"
        defaultLanguage="json"
        value={jsonData}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly: !isEditMode,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};
