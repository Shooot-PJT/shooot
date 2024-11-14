import { useEffect, useRef, useState } from 'react';
import { useGetTestCaseDetail } from '../reactQueries';
import { editTestCase } from '../apis'; // editTestCase 함수 임포트
import Editor, { OnMount } from '@monaco-editor/react';
import { BodyNone } from '../components/API/subComponents/APIBody/RequestDocs/RequestContents/BodyNone/BodyNone';
import {
  CustomTab,
  CustomTabs,
} from '../../../components/CustomTabs/CustomTabs';
import * as styles from './KeyValueTable.css';
import * as bodyFormDataStyles from './BodyFormData.css';
import {
  TableData,
  TestCaseDetailInfo,
  TableValueFormat,
  CustomFormData,
  FileMeta,
} from '../types/data/TestCase.data';
import { useQueryClient } from '@tanstack/react-query';

// 타입 정의 수정
type Key = string;
type Value = string | number | boolean | null;
type Description = string | null;
type IsRequired = boolean | null;
type Type = 'Text' | 'File' | null;
type FileName = string;
type UUID = string;

interface DummyTestCaseProps {
  testCaseId: number;
}

export const DummyTestCase: React.FC<DummyTestCaseProps> = ({ testCaseId }) => {
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

  useEffect(() => {
    if (testCaseDetail) {
      setEditedTestCase(testCaseDetail);
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
          formData: null,
          raw: null,
        },
      },
    });
  };

  const toggleEditMode = async () => {
    if (isEditMode && editedTestCase) {
      // 저장 버튼을 눌렀을 때
      try {
        console.log('Editing TestCase with ID:', testCaseId);

        const formData = new FormData();

        // formData.append('title', editedTestCase.title);
        // formData.append(
        //   'httpStatusCode',
        //   String(editedTestCase.httpStatusCode),
        // );
        formData.append('type', editedTestCase.type); // 수정된 부분

        // content를 문자열로 변환하여 추가
        formData.append('content', JSON.stringify(editedTestCase.content));

        // FormData 내용 확인
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        await editTestCase(
          { testcaseId: testCaseId }, // testCaseId를 직접 사용
          formData,
        );
        // 업데이트 후, 테스트케이스 상세 정보를 다시 가져옵니다.
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
    if (section === 'body') {
      setEditedTestCase({
        ...editedTestCase,
        content: {
          ...editedTestCase.content,
          body: data,
        },
      });
    } else {
      setEditedTestCase({
        ...editedTestCase,
        content: {
          ...editedTestCase.content,
          [section]: data,
        },
      });
    }
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
          data={testCase.content.params}
          isEditMode={isEditMode}
          section="params"
          onDataChange={handleDataChange}
        />
      )}
      {activeTab === 1 && (
        <KeyValueTable
          data={testCase.content.pathvariable}
          isEditMode={isEditMode}
          section="pathvariable"
          onDataChange={handleDataChange}
        />
      )}
      {activeTab === 2 && (
        <KeyValueTable
          data={testCase.content.headers}
          isEditMode={isEditMode}
          section="headers"
          onDataChange={handleDataChange}
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
              onDataChange={handleDataChange}
            />
          )}
          {bodyType === 'form-data' && (
            <BodyFormData
              formData={testCase.content.body.formData}
              isEditMode={isEditMode}
              onDataChange={handleDataChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

interface KeyValueTableProps {
  data: TableData | null;
  isEditMode: boolean;
  section: string;
  onDataChange: (section: string, data: any) => void;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  data,
  isEditMode,
  section,
  onDataChange,
}) => {
  const [tableData, setTableData] = useState<TableData>(data || {});
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setTableData(data || {});
      isInitialMount.current = false;
    }
  }, [data]);

  const handleAddRow = () => {
    setTableData({
      ...tableData,
      ['']: ['', '', null, null],
    });
  };

  const handleDeleteRow = (keyToDelete: string) => {
    const { [keyToDelete]: _, ...rest } = tableData;
    setTableData(rest);
    onDataChange(section, rest);
  };

  const handleChange = (
    key: string,
    fieldIndex: number,
    value: any,
    newKey?: string,
  ) => {
    const newData = { ...tableData };

    if (newKey && newKey !== key) {
      newData[newKey] = [...newData[key]] as TableValueFormat;
      delete newData[key];
      key = newKey;
    }

    newData[key][fieldIndex] = value;
    setTableData(newData);
    onDataChange(section, newData);
  };

  return (
    <div>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th className={styles.headerCellStyle}>Key</th>
            <th className={styles.headerCellStyle}>Value</th>
            <th className={styles.headerCellStyle}>Description</th>
            {isEditMode && <th className={styles.headerCellStyle}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {Object.entries(tableData).map(
            ([key, [value, description]], index) => (
              <tr key={index} className={styles.rowStyle}>
                <td className={styles.keyCellStyle}>
                  {isEditMode ? (
                    <input
                      value={key}
                      onChange={(e) =>
                        handleChange(key, 0, value || '', e.target.value)
                      }
                    />
                  ) : (
                    <div className={styles.cellViewStyle}>{key}</div>
                  )}
                </td>
                <td className={styles.valueCellStyle}>
                  {isEditMode ? (
                    <input
                      value={
                        value !== null && value !== undefined
                          ? String(value)
                          : ''
                      }
                      onChange={(e) => handleChange(key, 0, e.target.value)}
                    />
                  ) : (
                    <div className={styles.cellViewStyle}>
                      {value !== null && value !== undefined
                        ? String(value)
                        : ''}
                    </div>
                  )}
                </td>
                <td className={styles.descriptionCellStyle}>
                  {isEditMode ? (
                    <input
                      value={description || ''}
                      onChange={(e) => handleChange(key, 1, e.target.value)}
                    />
                  ) : (
                    <div className={styles.cellViewStyle}>{description}</div>
                  )}
                </td>
                {isEditMode && (
                  <td className={styles.actionCellStyle}>
                    <button onClick={() => handleDeleteRow(key)}>삭제</button>
                  </td>
                )}
              </tr>
            ),
          )}
          {isEditMode && (
            <tr>
              <td colSpan={isEditMode ? 4 : 3}>
                <div
                  className={styles.addButtonContainer}
                  onClick={handleAddRow}
                >
                  <span>행 추가</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

interface BodyRawProps {
  raw: object | null;
  isEditMode: boolean;
  onDataChange: (section: string, data: any) => void;
}

const BodyRaw: React.FC<BodyRawProps> = ({ raw, isEditMode, onDataChange }) => {
  const [jsonData, setJsonData] = useState<string>(
    JSON.stringify(raw, null, 2) || '',
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setJsonData(JSON.stringify(raw, null, 2) || '');
  }, [raw]);

  const handleEditorChange = (value?: string) => {
    setJsonData(value || '');
    setError(null); // 에러 메시지 초기화
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    if (isEditMode) {
      editor.onDidBlurEditorWidget(() => {
        try {
          const value = editor.getValue();
          const parsedData = JSON.parse(value);
          onDataChange('body', {
            raw: parsedData,
            formData: null,
          });
          setError(null);
        } catch (e) {
          console.error('Invalid JSON:', e);
          setError('유효한 JSON 형식이 아닙니다.');
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

interface BodyFormDataProps {
  formData: CustomFormData | null;
  isEditMode: boolean;
  onDataChange: (section: string, data: any) => void;
}

const BodyFormData: React.FC<BodyFormDataProps> = ({
  formData,
  isEditMode,
  onDataChange,
}) => {
  const [formDataEntries, setFormDataEntries] = useState<
    Array<{
      key: string;
      type: 'Text' | 'File';
      value: string | File | null;
      description: string | null;
      s3Url?: string | null;
    }>
  >([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const entries: Array<{
        key: string;
        type: 'Text' | 'File';
        value: string | File | null;
        description: string | null;
        s3Url?: string | null;
      }> = [];

      if (formData && formData.datas) {
        for (const [key, [value, description, type]] of Object.entries(
          formData.datas,
        )) {
          entries.push({
            key,
            type: type as 'Text',
            value: value !== null && value !== undefined ? String(value) : '',
            description,
          });
        }
      }

      if (formData && formData.files) {
        for (const uuidObj of Object.values(formData.files)) {
          for (const [fileName, fileDataArray] of Object.entries(uuidObj)) {
            const [s3Url, fileMeta, type, nullValue] = fileDataArray as [
              string,
              FileMeta,
              string,
              any,
            ];

            // fileMeta가 존재하고 객체인지 확인
            if (fileMeta && typeof fileMeta === 'object') {
              entries.push({
                key: fileMeta.parameterVar,
                type: 'File',
                value: fileName,
                description: fileMeta.description,
                s3Url:
                  s3Url !== null && s3Url !== undefined ? String(s3Url) : '',
              });
            }
          }
        }
      }

      setFormDataEntries(entries);
      isInitialMount.current = false;
    }
  }, [formData]);

  const processEntries = async () => {
    const datas: CustomFormData['datas'] = {};
    const files: CustomFormData['files'] = {};

    for (const entry of formDataEntries) {
      if (entry.type === 'Text') {
        datas![entry.key] = [
          entry.value as string,
          entry.description,
          'Text',
          null,
        ];
      } else if (entry.type === 'File' && entry.value) {
        const uuid = 'UUID' + Math.random().toString(36).substr(2, 9);
        let base64: string | null = null;
        let fileName: string;

        if (entry.value instanceof File) {
          base64 = await fileToBase64(entry.value);
          fileName = entry.value.name;
        } else {
          // entry.value가 null이 아닌 string임을 확인
          base64 = entry.s3Url || '';
          fileName = entry.value as string;
        }

        files![uuid] = {
          [fileName]: [
            base64 || '',
            { parameterVar: entry.key, description: entry.description },
            'File',
            null,
          ],
        };
      }
    }

    const formDataResult =
      (datas && Object.keys(datas).length > 0) ||
      (files && Object.keys(files).length > 0)
        ? {
            datas: Object.keys(datas!).length > 0 ? datas : null,
            files: Object.keys(files!).length > 0 ? files : null,
          }
        : null;

    onDataChange('body', {
      formData: formDataResult,
      raw: null,
    });
  };

  useEffect(() => {
    processEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDataEntries]);

  const handleAddEntry = () => {
    setFormDataEntries([
      ...formDataEntries,
      { key: '', type: 'Text', value: '', description: '' },
    ]);
  };

  const handleDeleteEntry = (index: number) => {
    const newEntries = [...formDataEntries];
    newEntries.splice(index, 1);
    setFormDataEntries(newEntries);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (
    index: number,
    field: keyof (typeof formDataEntries)[0],
    value: any,
  ) => {
    const newEntries = [...formDataEntries];
    newEntries[index][field] = value;
    setFormDataEntries(newEntries);
  };

  return (
    <div>
      <table className={bodyFormDataStyles.tableStyle}>
        <thead>
          <tr>
            <th className={bodyFormDataStyles.headerCellStyle}>Key</th>
            <th className={bodyFormDataStyles.headerCellStyle}>Type</th>
            <th className={bodyFormDataStyles.headerCellStyle}>Value</th>
            <th className={bodyFormDataStyles.headerCellStyle}>Description</th>
            {isEditMode && (
              <th className={bodyFormDataStyles.headerCellStyle}>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {formDataEntries.map((entry, index) => (
            <tr key={index} className={bodyFormDataStyles.rowStyle}>
              <td className={bodyFormDataStyles.keyCellStyle}>
                {isEditMode ? (
                  <input
                    value={entry.key}
                    onChange={(e) => handleChange(index, 'key', e.target.value)}
                  />
                ) : (
                  <div className={bodyFormDataStyles.cellViewStyle}>
                    {entry.key}
                  </div>
                )}
              </td>
              <td className={bodyFormDataStyles.typeCellStyle}>
                {isEditMode ? (
                  <select
                    value={entry.type}
                    onChange={(e) =>
                      handleChange(
                        index,
                        'type',
                        e.target.value as 'Text' | 'File',
                      )
                    }
                  >
                    <option value="Text">Text</option>
                    <option value="File">File</option>
                  </select>
                ) : (
                  <div className={bodyFormDataStyles.cellViewStyle}>
                    {entry.type}
                  </div>
                )}
              </td>
              <td className={bodyFormDataStyles.valueCellStyle}>
                {entry.type === 'Text' ? (
                  isEditMode ? (
                    <input
                      value={
                        entry.value !== null && entry.value !== undefined
                          ? String(entry.value)
                          : ''
                      }
                      onChange={(e) =>
                        handleChange(index, 'value', e.target.value)
                      }
                    />
                  ) : (
                    <div className={bodyFormDataStyles.cellViewStyle}>
                      {entry.value !== null && entry.value !== undefined
                        ? String(entry.value)
                        : ''}
                    </div>
                  )
                ) : isEditMode ? (
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleChange(index, 'value', file);
                    }}
                  />
                ) : (
                  <div className={bodyFormDataStyles.cellViewStyle}>
                    <a
                      href={entry.s3Url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {entry.value instanceof File
                        ? entry.value.name
                        : entry.value !== null && entry.value !== undefined
                          ? String(entry.value)
                          : ''}
                    </a>
                  </div>
                )}
              </td>
              <td className={bodyFormDataStyles.descriptionCellStyle}>
                {isEditMode ? (
                  <input
                    value={entry.description || ''}
                    onChange={(e) =>
                      handleChange(index, 'description', e.target.value)
                    }
                  />
                ) : (
                  <div className={bodyFormDataStyles.cellViewStyle}>
                    {entry.description}
                  </div>
                )}
              </td>
              {isEditMode && (
                <td className={bodyFormDataStyles.actionCellStyle}>
                  <button onClick={() => handleDeleteEntry(index)}>삭제</button>
                </td>
              )}
            </tr>
          ))}
          {isEditMode && (
            <tr>
              <td colSpan={isEditMode ? 5 : 4}>
                <div
                  className={styles.addButtonContainer}
                  onClick={handleAddEntry}
                >
                  <span>행 추가</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
