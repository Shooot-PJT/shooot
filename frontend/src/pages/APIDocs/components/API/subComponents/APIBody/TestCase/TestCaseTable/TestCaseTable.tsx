import { useEffect, useRef, useState } from 'react';
import {
  useGetTestCaseDetail,
  useAddTestCase,
} from '../../../../../../reactQueries/testcase';
import { editTestCase } from '../../../../../../apis/testcase';
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
  Raw,
} from './TestCaseTable.types';

import * as styles from './KeyValueTable.css';
import * as bodyFormDataStyles from './BodyFormData.css';

import { v4 as uuidv4 } from 'uuid';

interface TestCaseTableProps {
  testCaseId?: number;
  isAddMode?: boolean;
  apiId: number;
  onAddSuccess?: () => void;
  onCancel?: () => void;
}

export const TestCaseTable: React.FC<TestCaseTableProps> = ({
  testCaseId,
  isAddMode = false,
  apiId,
  onAddSuccess,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(isAddMode);

  const {
    data: testCaseDetail,
    isLoading,
    isError,
  } = useGetTestCaseDetail(
    { testcaseId: testCaseId! },
    {
      enabled: !!testCaseId && !isAddMode, // 추가 모드가 아닐 때만 가져오기
    },
  );

  const [bodyType, setBodyType] = useState<'none' | 'raw' | 'form-data'>(
    'none',
  );

  const [editedTestCase, setEditedTestCase] =
    useState<TestCaseDetailInfo | null>(null);

  const queryClient = useQueryClient();
  const addTestCaseMutation = useAddTestCase();

  useEffect(() => {
    if (isAddMode) {
      // 빈 테스트케이스 데이터로 초기화
      setEditedTestCase({
        id: 0,
        apiId: apiId,
        title: '',
        httpStatusCode: 200,
        type: 'NONE',
        content: {
          params: {},
          pathvariable: {},
          headers: {},
          body: {
            raw: null,
            formData: null,
          },
          expectedResponse: {
            schema: null,
            example: null,
          }, // expectedResponse 추가
        },
        testStatus: 'YET',
      });
      setBodyType('none');
    } else if (testCaseDetail) {
      setEditedTestCase({
        ...testCaseDetail,
        content: {
          ...testCaseDetail.content,
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
  }, [testCaseDetail, isAddMode, apiId]);

  if (!isAddMode && isLoading) {
    return <div>테스트케이스 로딩 중...</div>;
  }

  if (!isAddMode && (isError || !testCaseDetail)) {
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
      // 저장 버튼 클릭 시
      try {
        if (isAddMode) {
          // 테스트케이스 추가 처리
          const formData = new FormData();

          formData.append('title', editedTestCase.title);
          formData.append(
            'httpStatusCode',
            String(editedTestCase.httpStatusCode),
          );
          formData.append('type', editedTestCase.type);

          // content를 JSON 문자열로 직렬화
          const contentToSave = {
            ...editedTestCase.content,
          };

          formData.append('content', JSON.stringify(contentToSave));

          await addTestCaseMutation.mutateAsync(
            { apiId: apiId, formData },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ['apiDetail', apiId],
                });
                if (onAddSuccess) onAddSuccess();
              },
            },
          );
        } else {
          // 테스트케이스 수정 처리
          const formData = new FormData();

          formData.append('title', editedTestCase.title);
          formData.append(
            'httpStatusCode',
            String(editedTestCase.httpStatusCode),
          );
          formData.append('type', editedTestCase.type);

          // content를 JSON 문자열로 직렬화
          const contentToSave = {
            ...editedTestCase.content,
          };

          formData.append('content', JSON.stringify(contentToSave));

          await editTestCase({ testcaseId: testCaseId! }, formData);

          queryClient.invalidateQueries({
            queryKey: ['testCaseDetail', testCaseId],
          });
        }
        setIsEditMode(false);
      } catch (error) {
        console.error('테스트케이스 저장 실패:', error);
      }
    }
    if (isAddMode && !isEditMode && onCancel) {
      onCancel();
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  const handleDataChange = (section: string, data: TableData) => {
    if (!editedTestCase) return;
    setEditedTestCase({
      ...editedTestCase,
      content: {
        ...editedTestCase.content,
        [section]: data,
      },
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedTestCase) return;
    const value = e.target.value;
    setEditedTestCase({ ...editedTestCase, title: value });
  };

  const handleStatusCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedTestCase) return;
    const value = e.target.value;
    setEditedTestCase({
      ...editedTestCase,
      httpStatusCode: parseInt(value, 10),
    });
  };

  return (
    <div>
      <h1>
        {isAddMode
          ? isEditMode
            ? '새 테스트케이스 추가'
            : '새 테스트케이스 미리보기'
          : testCase?.title}
      </h1>
      {isAddMode ? (
        <div>
          <button onClick={toggleEditMode}>
            {isEditMode ? '저장' : '편집'}
          </button>
          {isEditMode && (
            <button
              onClick={() => {
                if (onCancel) onCancel();
              }}
            >
              취소
            </button>
          )}
        </div>
      ) : (
        <button onClick={toggleEditMode}>{isEditMode ? '저장' : '편집'}</button>
      )}

      {/* 제목과 HTTP Status Code 입력 필드 */}
      <div>
        {isEditMode ? (
          <div>
            <label>
              제목:
              <input
                type="text"
                value={editedTestCase?.title || ''}
                onChange={handleTitleChange}
              />
            </label>
            <label>
              HTTP Status Code:
              <input
                type="number"
                value={editedTestCase?.httpStatusCode || 200}
                onChange={handleStatusCodeChange}
              />
            </label>
          </div>
        ) : (
          <div>
            <p>제목: {testCase?.title}</p>
            <p>HTTP Status Code: {testCase?.httpStatusCode}</p>
          </div>
        )}
      </div>

      {/* CustomTabs로 탭 구성 */}
      <CustomTabs value={activeTab} onChange={handleTabChange}>
        {tabLabels.map((label, index) => (
          <CustomTab key={index} label={label} />
        ))}
      </CustomTabs>

      {/* 탭 콘텐츠 렌더링 */}
      <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        <KeyValueTable
          data={testCase?.content?.params ?? null}
          isEditMode={isEditMode}
          section="params"
          onDataChange={handleDataChange}
        />
      </div>
      <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <KeyValueTable
          data={testCase?.content?.pathvariable ?? null}
          isEditMode={isEditMode}
          section="pathvariable"
          onDataChange={handleDataChange}
        />
      </div>
      <div style={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <KeyValueTable
          data={testCase?.content?.headers ?? null}
          isEditMode={isEditMode}
          section="headers"
          onDataChange={handleDataChange}
        />
      </div>
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
              raw={testCase?.content.body?.raw ?? null}
              isEditMode={isEditMode}
              onDataChange={handleDataChange}
              body={testCase?.content?.body || {}}
            />
          )}
          {bodyType === 'form-data' && (
            <BodyFormData
              formData={testCase?.content.body?.formData ?? null}
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
  const idMapRef = useRef<Record<string, string>>({}); // key to id 매핑
  const emptyRowIdRef = useRef<string[]>([]); // 키가 비어있는 행의 ID
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (data && typeof data === 'object') {
        const rows: TableRowWithId[] = Object.entries(data).map(
          ([
            key,
            [
              value,
              description,
              // type, isRequired
            ],
          ]) => {
            // 이미 ID가 있는지 확인
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
      isInitialMount.current = false;
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

    // emptyRowIdRef 업데이트
    emptyRowIdRef.current.push(newId);

    // 배열을 다시 Record 형태로 변환 (빈 키는 제외)
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

    // 키가 있을 경우 idMapRef에서 제거
    const rowToDelete = tableData.find((row) => row.id === id);
    if (rowToDelete && rowToDelete.key.trim() !== '') {
      delete idMapRef.current[rowToDelete.key];
    }

    // emptyRowIdRef에서 제거
    emptyRowIdRef.current = emptyRowIdRef.current.filter(
      (rowId) => rowId !== id,
    );

    // 배열을 다시 Record 형태로 변환 (빈 키는 제외)
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

  const handleChange = (id: string, field: keyof TableRow, value: string) => {
    setTableData((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      }),
    );

    // 업데이트된 행 찾기
    const updatedRow = tableData.find((row) => row.id === id);
    if (!updatedRow) return;

    // 키 변경 시 idMapRef 유지
    if (field === 'key') {
      const oldKey = updatedRow.key;
      const newKey = value.trim();

      if (oldKey !== newKey) {
        // 이전 키를 idMapRef에서 제거
        if (oldKey in idMapRef.current) {
          delete idMapRef.current[oldKey];
        }

        // 새 키에 ID 할당
        if (newKey !== '') {
          if (newKey in idMapRef.current) {
            // 키 중복 방지를 위한 추가 로직 가능
          } else {
            idMapRef.current[newKey] = id;
          }
        }
      }
    }

    // 배열을 다시 Record 형태로 변환 (빈 키는 제외)
    const updatedRecord: TableData = {};
    tableData.forEach((row) => {
      if (row.id === id) {
        const key = field === 'key' ? value.trim() : row.key;
        if (key !== '') {
          updatedRecord[key] = [
            field === 'value' ? value : row.value,
            field === 'description' ? value : row.description,
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

// BodyRaw 및 BodyFormData 컴포넌트는 이전과 동일합니다.

interface BodyRawProps {
  raw: Raw | null;
  isEditMode: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDataChange: (section: string, data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleEditorDidMount: OnMount = (
    editor,
    // monaco
  ) => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            const [
              s3Url,
              fileMeta,
              // type, nullValue
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] = fileDataArray as [string, FileMeta, string, any];

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
