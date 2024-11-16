// frontend/src/pages/APIDocs/components/API/subComponents/APIBody/TestCase/TestCaseTable/TestCaseTable.tsx

import { useEffect, useRef, useState } from 'react';
import { useGetTestCaseDetail } from '../../../../../../reactQueries';
import { editTestCase } from '../../../../../../apis'; // editTestCase 함수 임포트
import Editor, { OnMount } from '@monaco-editor/react';
import { BodyNone } from '../../RequestDocs/RequestContents/BodyNone/BodyNone';
import {
  CustomTab,
  CustomTabs,
} from '../../../../../../../../components/CustomTabs/CustomTabs';
import { TestCaseDetailInfo } from '../../../../../../types/data/TestCase.data';
import { useQueryClient } from '@tanstack/react-query';
import {
  TableRow,
  TableData,
  CustomFormData,
  FileMeta,
  TestCaseContent,
} from './TestCaseTable.types';

import * as styles from './KeyValueTable.css';
import * as bodyFormDataStyles from './BodyFormData.css';

import { v4 as uuidv4 } from 'uuid'; // UUID 생성용 라이브러리 추가

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

  useEffect(() => {
    if (testCaseDetail) {
      setEditedTestCase({
        ...testCaseDetail,
        content: {
          ...testCaseDetail.content,
          // params, pathvariable, headers는 여전히 객체 형태로 유지
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

        const formData = new FormData();

        formData.append('type', editedTestCase.type);
        console.log('TYPE: ', editedTestCase.type);

        // Serialize content as JSON
        const contentToSave: TestCaseContent = {
          ...editedTestCase.content,
          // params, pathvariable, headers는 이미 객체 형태로 유지
        };

        formData.append('content', JSON.stringify(contentToSave));

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

  const handleDataChange = (section: string, data: TableData) => {
    if (!editedTestCase) return;
    setEditedTestCase({
      ...editedTestCase,
      content: {
        ...editedTestCase.content,
        [section]: data, // data는 객체 형태로 전달
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
              body={testCase.content.body} // 추가된 부분
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
  onDataChange: (section: string, data: TableData) => void;
}

interface TableRowWithId extends TableRow {
  id: string;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  data,
  isEditMode,
  section,
  onDataChange,
}) => {
  const [tableData, setTableData] = useState<TableRowWithId[]>([]);
  const idMapRef = useRef<Record<string, string>>({}); // key to id mapping
  const emptyRowIdRef = useRef<string[]>([]); // IDs for rows with empty keys

  useEffect(() => {
    if (data && typeof data === 'object') {
      const rows: TableRowWithId[] = Object.entries(data).map(
        ([key, [value, description, type, isRequired]]) => {
          // Check if the key already has an ID
          let id = '';
          if (key in idMapRef.current) {
            id = idMapRef.current[key];
          } else {
            id = uuidv4();
            idMapRef.current[key] = id;
          }

          return {
            id,
            key,
            value: value !== null && value !== undefined ? String(value) : '',
            description: description || '',
          };
        },
      );

      setTableData(rows);
    } else {
      setTableData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleAddRow = () => {
    const newId = uuidv4();
    const newRow: TableRowWithId = {
      id: newId,
      key: '',
      value: '',
      description: '',
    };
    setTableData((prevRows) => [...prevRows, newRow]);

    // Update emptyRowIdRef
    emptyRowIdRef.current.push(newId);

    // Convert array back to Record (exclude empty keys)
    const updatedRecord: TableData = {};
    [...tableData, newRow].forEach((row) => {
      if (row.key.trim() !== '') {
        updatedRecord[row.key] = [row.value, row.description, null, null];
      }
    });
    onDataChange(section, updatedRecord);
  };

  const handleDeleteRow = (id: string) => {
    setTableData((prevRows) => prevRows.filter((row) => row.id !== id));

    // Remove from idMapRef if key is present
    const rowToDelete = tableData.find((row) => row.id === id);
    if (rowToDelete && rowToDelete.key.trim() !== '') {
      delete idMapRef.current[rowToDelete.key];
    }

    // Remove from emptyRowIdRef if present
    emptyRowIdRef.current = emptyRowIdRef.current.filter(
      (rowId) => rowId !== id,
    );

    // Convert array back to Record (exclude empty keys)
    const updatedRecord: TableData = {};
    tableData
      .filter((row) => row.id !== id)
      .forEach((row) => {
        if (row.key.trim() !== '') {
          updatedRecord[row.key] = [row.value, row.description, null, null];
        }
      });
    onDataChange(section, updatedRecord);
  };

  const handleChange = (id: string, field: keyof TableRow, value: any) => {
    setTableData((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      }),
    );

    // Find the row being updated
    const updatedRow = tableData.find((row) => row.id === id);
    if (!updatedRow) return;

    // Handle key changes to maintain idMapRef
    if (field === 'key') {
      const oldKey = updatedRow.key;
      const newKey = value.trim();

      if (oldKey !== newKey) {
        // Remove old key from idMapRef
        if (oldKey in idMapRef.current) {
          delete idMapRef.current[oldKey];
        }

        // Assign ID for new key
        if (newKey !== '') {
          if (newKey in idMapRef.current) {
            // If new key already exists, use existing ID
            // This might cause duplicate keys, which should be handled appropriately
            // Here we choose to overwrite
            // Alternatively, prevent duplicate keys
          } else {
            idMapRef.current[newKey] = id;
          }
        }
      }
    }

    // Convert array back to Record (exclude empty keys)
    const updatedRecord: TableData = {};
    tableData.forEach((row) => {
      if (row.id === id) {
        if (value.trim() !== '') {
          updatedRecord[value.trim()] = [
            row.value,
            row.description,
            null,
            null,
          ];
        }
      } else if (row.key.trim() !== '') {
        updatedRecord[row.key] = [row.value, row.description, null, null];
      }
    });
    onDataChange(section, updatedRecord);
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
          {tableData.map((row) => (
            <tr key={row.id} className={styles.rowStyle}>
              <td className={styles.keyCellStyle}>
                {isEditMode ? (
                  <input
                    value={row.key}
                    onChange={(e) =>
                      handleChange(row.id, 'key', e.target.value)
                    }
                  />
                ) : (
                  <div className={styles.cellViewStyle}>{row.key}</div>
                )}
              </td>
              <td className={styles.valueCellStyle}>
                {isEditMode ? (
                  <input
                    value={
                      row.value !== null && row.value !== undefined
                        ? String(row.value)
                        : ''
                    }
                    onChange={(e) =>
                      handleChange(row.id, 'value', e.target.value)
                    }
                  />
                ) : (
                  <div className={styles.cellViewStyle}>
                    {row.value !== null && row.value !== undefined
                      ? String(row.value)
                      : ''}
                  </div>
                )}
              </td>
              <td className={styles.descriptionCellStyle}>
                {isEditMode ? (
                  <input
                    value={row.description || ''}
                    onChange={(e) =>
                      handleChange(row.id, 'description', e.target.value)
                    }
                  />
                ) : (
                  <div className={styles.cellViewStyle}>{row.description}</div>
                )}
              </td>
              {isEditMode && (
                <td className={styles.actionCellStyle}>
                  <button onClick={() => handleDeleteRow(row.id)}>삭제</button>
                </td>
              )}
            </tr>
          ))}
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

// BodyRaw 및 BodyFormData 컴포넌트는 이전과 동일하게 유지

interface BodyRawProps {
  raw: object | null;
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
    if (raw && (raw as any).datas) {
      setJsonData(JSON.stringify((raw as any).datas, null, 2));
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
