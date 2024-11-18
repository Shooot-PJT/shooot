/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import {
  useGetTestCaseDetail,
  useAddTestCase,
  useEditTestCase,
} from '../../../../../../reactQueries/testcase';
import * as monaco from 'monaco-editor';
import draculaTheme from 'monaco-themes/themes/Dracula.json';
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
import * as s from './TestCaseTable.css';
import * as bodyFormDataStyles from './BodyFormData.css';
import { AddTestCaseRequestBody } from '../../../../../../apis/testcase/types';

import { v4 as uuidv4 } from 'uuid';
import Flexbox from '../../../../../../../../components/Flexbox';
import Typography from '../../../../../../../../components/Typography';
import { HTTP_STATUS_CODES } from '../../../../../../types/httpStatus';
import Button from '../../../../../../../../components/Button';
import Textfield from '../../../../../../../../components/Textfield';

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Editor, OnMount } from '@monaco-editor/react';
import Icon from '../../../../../../../../components/Icon';
import { FaTrash } from 'react-icons/fa';
import colorPalette from '../../../../../../../../styles/colorPalette';

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

  const [isOpenBody, setIsOpenBody] = useState<boolean>(false);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoInstance.editor.defineTheme(
      'dracula',
      draculaTheme as monaco.editor.IStandaloneThemeData,
    );
    monacoInstance.editor.setTheme('dracula');
  };

  useEffect(() => {
    if (isAddMode) {
      setIsOpenBody(true);
    }
  }, [isAddMode]);

  const handleHeaderClick = () => {
    setIsOpenBody((prev) => !prev);
  };

  const { data: testCaseDetail } = useGetTestCaseDetail(
    { testcaseId: testCaseId! },
    {
      enabled: !!testCaseId && !isAddMode,
    },
  );

  const [bodyType, setBodyType] = useState<'none' | 'raw' | 'form-data'>(
    'none',
  );

  const [editedTestCase, setEditedTestCase] =
    useState<TestCaseDetailInfo | null>(null);

  const statusColor =
    editedTestCase?.httpStatusCode.toString().charAt(0) === '2'
      ? 'originalGreen'
      : 'originalRed';

  const queryClient = useQueryClient();
  const addTestCaseMutation = useAddTestCase();
  const editTestCaseMutation = useEditTestCase();

  useEffect(() => {
    if (isAddMode) {
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
          },
        },
        testStatus: 'YET',
      });
      setBodyType('none');
    } else if (testCaseDetail) {
      setEditedTestCase({
        ...testCaseDetail,
        content: {
          ...testCaseDetail.content,
          expectedResponse: testCaseDetail.content.expectedResponse || {
            schema: null,
            example: null,
          },
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

  const testCase = editedTestCase || testCaseDetail;

  const tabLabels = ['Params', 'PathVariables', 'Header', 'Body'];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
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
      try {
        if (isAddMode) {
          const data: AddTestCaseRequestBody = {
            title: editedTestCase.title,
            httpStatusCode: editedTestCase.httpStatusCode,
            type: editedTestCase.type,
            content: editedTestCase.content,
          };

          await addTestCaseMutation.mutateAsync(
            { apiId: apiId, data },
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
          const data: AddTestCaseRequestBody = {
            title: editedTestCase.title,
            httpStatusCode: editedTestCase.httpStatusCode,
            type: editedTestCase.type,
            content: editedTestCase.content,
          };

          await editTestCaseMutation.mutateAsync(
            { testcaseId: testCaseId!, data },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ['testCaseDetail', testCaseId],
                });
              },
            },
          );
        }
        setIsEditMode(false);
      } catch (error) {
        console.error('테스트케이스 저장 실패:', error);
      }
    } else {
      setIsEditMode(!isEditMode);
    }
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

  // 추가된 취소 핸들러
  const handleCancel = () => {
    if (isAddMode && onCancel) {
      onCancel();
    } else {
      if (testCaseDetail) {
        setEditedTestCase({
          ...testCaseDetail,
          content: {
            ...testCaseDetail.content,
            expectedResponse: testCaseDetail.content.expectedResponse || {
              schema: null,
              example: null,
            },
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
      } else {
        setEditedTestCase(null);
        setBodyType('none');
      }
      setIsEditMode(false);
    }
  };

  return (
    <div>
      <div
        className={s.headerContainerRecipe({ isOpen: isOpenBody })}
        onClick={handleHeaderClick}
      >
        <Flexbox
          flexDirections="row"
          alignItems="center"
          style={{
            gap: '2rem',
            height: '2.5rem',
          }}
        >
          <Typography
            size={0.85}
            weight="500"
            color={
              testCase?.httpStatusCode?.toString().charAt(0).match('2')
                ? 'originalGreen'
                : 'originalRed'
            }
          >
            {`${testCase?.httpStatusCode}  ${HTTP_STATUS_CODES[testCase?.httpStatusCode as number]}`}
          </Typography>
          <Typography size={0.8} weight="400" color={'disabled'}>
            {testCase?.title}
          </Typography>
        </Flexbox>
      </div>
      {/* 바디 */}
      <div className={s.testBodyContainerRecipe({ isOpen: isOpenBody })}>
        <Flexbox justifyContents="between">
          {isEditMode ? (
            <div style={{ textAlign: 'start' }}>
              <Flexbox style={{ gap: '2.5rem' }}>
                <Textfield
                  label="테스트케이스 제목"
                  value={editedTestCase?.title || ''}
                  onChange={handleTitleChange}
                />

                <Textfield
                  label="HTTP Status Code"
                  type="number"
                  value={editedTestCase?.httpStatusCode}
                  onChange={handleStatusCodeChange}
                />
              </Flexbox>
            </div>
          ) : (
            <div style={{ textAlign: 'start' }}>
              <Flexbox flexDirections="col" style={{ gap: '1.5rem' }}>
                <Flexbox style={{ gap: '0.75rem' }}>
                  <Typography size={2.5} weight="700" color={statusColor}>
                    {editedTestCase?.httpStatusCode}
                  </Typography>
                  <Typography size={2.5} weight="700" color={statusColor}>
                    {
                      HTTP_STATUS_CODES[
                        editedTestCase?.httpStatusCode as number
                      ]
                    }
                  </Typography>
                </Flexbox>
                <Typography size={1.15} weight="600">
                  {editedTestCase?.title}
                </Typography>
                <div
                  style={{
                    backgroundColor:
                      statusColor === 'originalGreen'
                        ? colorPalette.originalGreen
                        : colorPalette.originalRed,
                    height: '0.25rem',
                    width: '90%',
                  }}
                />
              </Flexbox>
            </div>
          )}

          {isAddMode ? (
            <Flexbox
              flexDirections="row"
              style={{
                gap: '0.25rem',
              }}
            >
              <Button
                rounded={0.5}
                onClick={toggleEditMode}
                color={isEditMode ? 'primary' : 'grey'}
              >
                <Typography size={0.75}>
                  {isEditMode ? '저장' : '편집'}
                </Typography>
              </Button>
              {isEditMode && (
                <Button rounded={0.5} color="grey" onClick={handleCancel}>
                  <Typography size={0.75}>취소</Typography>
                </Button>
              )}
            </Flexbox>
          ) : (
            <Flexbox
              flexDirections="row"
              style={{
                gap: '0.25rem',
              }}
            >
              <Button
                rounded={0.5}
                onClick={toggleEditMode}
                color={isEditMode ? 'primary' : 'grey'}
              >
                <Typography size={0.75}>
                  {isEditMode ? '저장' : '편집'}
                </Typography>
              </Button>
              {isEditMode && (
                <Button rounded={0.5} color="grey" onClick={handleCancel}>
                  <Typography size={0.75}>취소</Typography>
                </Button>
              )}
            </Flexbox>
          )}
        </Flexbox>

        {/*  */}
        <Flexbox
          flexDirections="col"
          style={{
            gap: '2rem',
          }}
        >
          <Flexbox flexDirections="col" style={{ gap: '0.5rem' }}>
            <Flexbox
              flexDirections="col"
              alignItems="start"
              style={{
                gap: '0.25rem',
              }}
            >
              <Typography>요청 타입</Typography>
              <Typography color="disabled" size={1}>
                테스트 케이스에 어떤 요청을 보낼지 정의합니다.
              </Typography>
            </Flexbox>
            <CustomTabs value={activeTab} onChange={handleTabChange}>
              {tabLabels.map((label, index) => (
                <CustomTab key={index} label={label} />
              ))}
            </CustomTabs>

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
                <FormControl
                  component="fieldset"
                  sx={{
                    width: '100%',
                    padding: '0 0.5rem',
                  }}
                >
                  <RadioGroup
                    value={bodyType}
                    onChange={(e) =>
                      handleBodyTypeChange(
                        e.target.value as 'none' | 'raw' | 'form-data',
                      )
                    }
                    row
                    sx={{
                      gap: '1rem',
                    }}
                  >
                    <FormControlLabel
                      value="none"
                      control={
                        <Radio
                          color="secondary"
                          sx={{
                            '&.Mui-disabled': {
                              color: '#A020F0',
                            },
                          }}
                        />
                      }
                      label="None"
                      disabled={!isEditMode}
                      sx={{
                        '.MuiFormControlLabel-label': {
                          color: '#FFFFFF',
                        },
                        '&.Mui-disabled .MuiFormControlLabel-label': {
                          color: '#FFFFFF',
                        },
                      }}
                    />
                    <FormControlLabel
                      value="raw"
                      control={
                        <Radio
                          color="secondary"
                          sx={{
                            '&.Mui-disabled': {
                              color: '#A020F0',
                            },
                          }}
                        />
                      }
                      label="Raw"
                      disabled={!isEditMode}
                      sx={{
                        '.MuiFormControlLabel-label': {
                          color: '#FFFFFF',
                        },
                        '&.Mui-disabled .MuiFormControlLabel-label': {
                          color: '#FFFFFF',
                        },
                      }}
                    />
                    <FormControlLabel
                      value="form-data"
                      control={
                        <Radio
                          color="secondary"
                          sx={{
                            '&.Mui-disabled': {
                              color: '#A020F0',
                            },
                          }}
                        />
                      }
                      label="Form Data"
                      disabled={!isEditMode}
                      sx={{
                        '.MuiFormControlLabel-label': {
                          color: '#FFFFFF',
                        },
                        '&.Mui-disabled .MuiFormControlLabel-label': {
                          color: '#FFFFFF',
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>

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
          </Flexbox>
          {/* Expected Response Editors */}
          <div>
            <Flexbox
              flexDirections="col"
              alignItems="start"
              style={{
                width: '100%',
                gap: '2rem',
              }}
            >
              <Flexbox
                flexDirections="col"
                alignItems="start"
                style={{
                  gap: '0.25rem',
                }}
              >
                <Typography>응답 타입</Typography>
                <Typography color="disabled" size={1}>
                  자유 양식으로 응답 모습을 정의합니다.
                </Typography>
              </Flexbox>
              <Editor
                height="100px"
                defaultLanguage="plaintext"
                value={editedTestCase?.content.expectedResponse.schema || ''}
                onChange={(value) => {
                  if (!editedTestCase) return;
                  setEditedTestCase({
                    ...editedTestCase,
                    content: {
                      ...editedTestCase.content,
                      expectedResponse: {
                        ...editedTestCase.content.expectedResponse,
                        schema: value || '',
                      },
                    },
                  });
                }}
                onMount={handleEditorDidMount}
                theme="dracula"
                options={{
                  readOnly: !isEditMode, // isEditing은 위에서 내려주는거 써야함
                  lineNumbers: 'on',
                  folding: true,
                  minimap: { enabled: false },
                  renderLineHighlightOnlyWhenFocus: true,
                }}
              />

              <Flexbox
                flexDirections="col"
                alignItems="start"
                style={{
                  gap: '0.25rem',
                }}
              >
                <Typography>실제 응답</Typography>
                <Flexbox
                  flexDirections="col"
                  alignItems="start"
                  style={{
                    gap: '0.25rem',
                  }}
                >
                  <Typography color="disabled" size={1}>
                    JSON 형태로 활용할 응답 데이터를 작성하세요.
                  </Typography>
                </Flexbox>
              </Flexbox>
              <Editor
                height="200px"
                defaultLanguage="json"
                value={
                  editedTestCase?.content.expectedResponse.example
                    ? JSON.stringify(
                        editedTestCase.content.expectedResponse.example,
                        null,
                        2,
                      )
                    : ''
                }
                onMount={handleEditorDidMount}
                theme="dracula"
                options={{
                  readOnly: !isEditMode, // isEditing은 위에서 내려주는거 써야함
                  lineNumbers: 'on',
                  folding: true,
                  minimap: { enabled: false },
                  renderLineHighlightOnlyWhenFocus: true,
                }}
                onChange={(value) => {
                  if (!editedTestCase) return;

                  if (!isEditMode) return;

                  try {
                    const parsedValue = JSON.parse(value || '{}');
                    setEditedTestCase({
                      ...editedTestCase,
                      content: {
                        ...editedTestCase.content,
                        expectedResponse: {
                          ...editedTestCase.content.expectedResponse,
                          example: parsedValue,
                        },
                      },
                    });
                  } catch (error) {
                    console.error('Invalid JSON in Example editor:', error);
                  }
                }}
              />
            </Flexbox>
          </div>
        </Flexbox>
      </div>
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
  const idMapRef = useRef<Record<string, string>>({});
  const emptyRowIdRef = useRef<string[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (data && typeof data === 'object') {
        const rows: TableRowWithId[] = Object.entries(data).map(
          ([key, [value, description]]) => {
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

    emptyRowIdRef.current.push(newId);

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

    const rowToDelete = tableData.find((row) => row.id === id);
    if (rowToDelete && rowToDelete.key.trim() !== '') {
      delete idMapRef.current[rowToDelete.key];
    }

    emptyRowIdRef.current = emptyRowIdRef.current.filter(
      (rowId) => rowId !== id,
    );

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

    const updatedRow = tableData.find((row) => row.id === id);
    if (!updatedRow) return;

    if (field === 'key') {
      const oldKey = updatedRow.key;
      const newKey = value.trim();

      if (oldKey !== newKey) {
        if (oldKey in idMapRef.current) {
          delete idMapRef.current[oldKey];
        }

        if (newKey !== '') {
          if (newKey in idMapRef.current) {
            //
          } else {
            idMapRef.current[newKey] = id;
          }
        }
      }
    }

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
                    style={{
                      width: '-webkit-fill-available',
                    }}
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
                <td>
                  <Icon
                    background="none"
                    color="light"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <FaTrash />
                  </Icon>
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

interface BodyRawProps {
  raw: Raw | null;
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

  const handleEditorDidMount: OnMount = (editor) => {
    if (isEditMode) {
      editor.onDidBlurEditorWidget(() => {
        try {
          const value = editor.getValue();
          const parsedData = JSON.parse(value);

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
        height="200px"
        defaultLanguage="json"
        value={jsonData}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="dracula"
        options={{
          readOnly: !isEditMode, // isEditing은 위에서 내려주는거 써야함
          lineNumbers: 'on',
          folding: true,
          minimap: { enabled: false },
          renderLineHighlightOnlyWhenFocus: true,
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
            const [s3Url, fileMeta] = fileDataArray as [
              string,
              FileMeta,
              string,
              any,
            ];

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
      (datas && Object.keys(datas!).length > 0) ||
      (files && Object.keys(files!).length > 0)
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
                    style={{
                      width: '-webkit-fill-available',
                    }}
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
                      style={{
                        width: '-webkit-fill-available',
                      }}
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
                <td>
                  <Icon
                    background="none"
                    color="light"
                    onClick={() => handleDeleteEntry(index)}
                  >
                    <FaTrash />
                  </Icon>
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
