import { useEffect, useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { BodyNone } from '../components/API/subComponents/APIBody/RequestDocs/RequestContents/BodyNone/BodyNone';
import {
  CustomTab,
  CustomTabs,
} from '../../../components/CustomTabs/CustomTabs';
import * as styles from './KeyValueTable.css';
import * as bodyFormDataStyles from './BodyFormData.css';

type Key = string;
type Value = string | null;
type Description = string | null;
type IsRequired = boolean | null;
type Type = 'Text' | 'File' | null;
type FileName = string;
type FileMeta = { parameterVar: Key; description: Description };
type UUID = string;

type TableValueFormatParams = [Value, Description, null, null];
type TableValueFormatPathVariable = [Value, Description, null, null];
type TableValueFormatHeader = [Value, Description, null, null];
type TableValueFormatBody_FormData_datas = [Value, Description, Type, null];
type TableValueFormatBody_FormData_files = [Value, FileMeta, Type, null];

type TableData_Params = Record<Key, TableValueFormatParams> | null;
type TableData_PathVariable = Record<Key, TableValueFormatPathVariable> | null;
type TableData_Header = Record<Key, TableValueFormatHeader> | null;
type TableData_Body_FormData_datas = Record<
  Key,
  TableValueFormatBody_FormData_datas
> | null;
type TableData_Body_FormData_files = Record<
  UUID,
  Record<FileName, TableValueFormatBody_FormData_files>
> | null;

interface TestCase {
  title: string;
  httpStatusCode: number;
  type: 'MULTIPART' | 'JSON' | 'NONE';
  content: {
    params: TableData_Params;
    pathvariable: TableData_PathVariable;
    headers: TableData_Header;
    body: {
      formData: {
        datas: TableData_Body_FormData_datas;
        files: TableData_Body_FormData_files;
      } | null;
      raw: object | null;
    };
    expectedResponse: null | {
      schema: string | null;
      example: object | null;
    };
  };
}

const dummyTestCase: TestCase = {
  title: '회원가입 응답',
  httpStatusCode: 200,
  type: 'MULTIPART',
  content: {
    params: {
      locale: ['ko_KR', '사용자 언어 설정', null, null],
    },
    pathvariable: null,
    headers: {
      ContentType: ['multipart/form-data', null, null, null],
    },
    body: {
      formData: {
        datas: {
          username: ['홍길동', '사용자 이름', 'Text', null],
          email: ['gildong@example.com', '사용자 이메일', 'Text', null],
          password: ['securepassword123', '비밀번호', 'Text', null],
          phoneNumber: ['010-1234-5678', '휴대전화 번호', 'Text', null],
        },
        files: {
          UUID1: {
            'profile.jpg': [
              's3주소.com',
              { parameterVar: 'profile_image', description: '프로필 이미지' },
              'File',
              null,
            ],
          },
        },
      },
      raw: null,
    },
    expectedResponse: {
      schema:
        "[{\n  'userId': number,\n  'userName': string,\n  'email': string\n }...]\n",
      example: [
        {
          userId: 123,
          userName: '홍길동',
          email: 'gildong@example.com',
        },
      ],
    },
  },
};

export const DummyTestCase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [testCase, setTestCase] = useState<TestCase>(dummyTestCase);

  const tabLabels = ['Params', 'PathVariables', 'Header', 'Body'];

  // Body 타입에 따른 기본 선택
  const getDefaultBodyType = () => {
    switch (testCase.type) {
      case 'MULTIPART':
        return 'form-data';
      case 'JSON':
        return 'raw';
      case 'NONE':
      default:
        return 'none';
    }
  };

  const [bodyType, setBodyType] = useState<'none' | 'raw' | 'form-data'>(
    getDefaultBodyType(),
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBodyTypeChange = (type: 'none' | 'raw' | 'form-data') => {
    setBodyType(type);

    // TestCase의 type 필드 업데이트
    let newType: 'MULTIPART' | 'JSON' | 'NONE' = 'NONE';
    if (type === 'form-data') newType = 'MULTIPART';
    else if (type === 'raw') newType = 'JSON';
    else if (type === 'none') newType = 'NONE';

    setTestCase({ ...testCase, type: newType });
    console.log('Updated TestCase:', { ...testCase, type: newType });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // 저장 버튼을 눌렀을 때
      console.log('Final TestCase Data:', testCase);
    }
  };

  const handleDataChange = (section: string, data: any) => {
    setTestCase({
      ...testCase,
      content: {
        ...testCase.content,
        [section]: data,
      },
    });
    console.log('Updated TestCase:', {
      ...testCase,
      content: {
        ...testCase.content,
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
  data: Record<string, [Value, Description, null, null]> | null;
  isEditMode: boolean;
  section: string;
  onDataChange: (section: string, data: any) => void;
}

// KeyValueTable 컴포넌트 수정
const KeyValueTable: React.FC<KeyValueTableProps> = ({
  data,
  isEditMode,
  section,
  onDataChange,
}) => {
  const [tableData, setTableData] = useState<
    Record<string, [Value, Description, null, null]>
  >(data || {});

  useEffect(() => {
    setTableData(data || {});
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
  };

  const handleChange = (
    key: string,
    fieldIndex: number,
    value: string,
    newKey?: string,
  ) => {
    const newData = { ...tableData };

    if (newKey && newKey !== key) {
      newData[newKey] = [...newData[key]];
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
                      value={value || ''}
                      onChange={(e) => handleChange(key, 0, e.target.value)}
                    />
                  ) : (
                    <div className={styles.cellViewStyle}>{value}</div>
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
            ...dummyTestCase.content.body,
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
  formData: {
    datas: TableData_Body_FormData_datas;
    files: TableData_Body_FormData_files;
  } | null;
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
    const entries: Array<{
      key: string;
      type: 'Text' | 'File';
      value: string | File | null;
      description: string | null;
      s3Url?: string | null;
    }> = [];

    if (formData?.datas) {
      for (const [key, [value, description, type]] of Object.entries(
        formData.datas,
      )) {
        entries.push({
          key,
          type: type as 'Text',
          value,
          description,
        });
      }
    }

    if (formData?.files) {
      for (const uuidObj of Object.values(formData.files)) {
        for (const [fileName, [s3Url, fileMeta]] of Object.entries(uuidObj)) {
          entries.push({
            key: fileMeta.parameterVar,
            type: 'File',
            value: fileName,
            description: fileMeta.description,
            s3Url,
          });
        }
      }
    }

    setFormDataEntries(entries);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // 데이터 변경 시 호출
    const datas: TableData_Body_FormData_datas = {};
    const files: TableData_Body_FormData_files = {};

    formDataEntries.forEach((entry) => {
      if (entry.type === 'Text') {
        datas[entry.key] = [
          entry.value as string,
          entry.description,
          'Text',
          null,
        ];
      } else if (entry.type === 'File') {
        const uuid = 'UUID' + Math.random().toString(36).substr(2, 9);
        files[uuid] = {
          [(entry.value instanceof File
            ? entry.value.name
            : entry.value) as string]: [
            entry.s3Url || '',
            { parameterVar: entry.key, description: entry.description },
            'File',
            null,
          ],
        };
      }
    });

    onDataChange('body', {
      ...dummyTestCase.content.body,
      formData: {
        datas: Object.keys(datas).length > 0 ? datas : null,
        files: Object.keys(files).length > 0 ? files : null,
      },
      raw: null,
    });
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
                      handleChange(index, 'type', e.target.value)
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
                      value={typeof entry.value === 'string' ? entry.value : ''}
                      onChange={(e) =>
                        handleChange(index, 'value', e.target.value)
                      }
                    />
                  ) : (
                    <div className={bodyFormDataStyles.cellViewStyle}>
                      {typeof entry.value === 'string' ? entry.value : ''}
                    </div>
                  )
                ) : isEditMode ? (
                  <input
                    type="file"
                    onChange={(e) =>
                      handleChange(index, 'value', e.target.files?.[0] || null)
                    }
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
                        : typeof entry.value === 'string'
                          ? entry.value
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
              <td colSpan={isEditMode ? 4 : 3}>
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
