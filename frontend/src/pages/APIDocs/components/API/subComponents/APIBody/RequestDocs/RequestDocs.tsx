import React, { useState, useEffect, useRef } from 'react';
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
import {
  TableValueFormat,
  ExampleContent,
} from '../../../../../types/data/API.data';
import { APIDetailInfo } from '../../../../../types/data/API.data';
import { Editor } from '@monaco-editor/react';

import { useEditAPIExampleContent } from '../../../../../reactQueries/api';
import { useQueryClient } from '@tanstack/react-query';
import * as monaco from 'monaco-editor';

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
  const [rawBodyContent, setRawBodyContent] = useState<string>('');

  const [updatedExampleContent, setUpdatedExampleContent] =
    useState<ExampleContent | null>(null);

  const queryClient = useQueryClient();
  const { mutate: editAPIExampleContent } = useEditAPIExampleContent();

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (requestDocs?.example_content) {
      setUpdatedExampleContent(requestDocs.example_content);
    } else {
      setUpdatedExampleContent({
        params: null,
        pathvariable: null,
        headers: null,
        body: null,
      });
    }
  }, [requestDocs]);

  useEffect(() => {
    if (!isEditMode) {
      if (updatedExampleContent?.body) {
        if (updatedExampleContent.body.formData) {
          setReqBodyMenu('form-data');
        } else if (updatedExampleContent.body.raw) {
          setReqBodyMenu('raw');
          setRawBodyContent(updatedExampleContent.body.raw || '');
        } else {
          setReqBodyMenu('none');
        }
      } else {
        setReqBodyMenu('none');
      }
    }
  }, [updatedExampleContent, isEditMode]);

  const getDataByTabType = (
    type: ReqTabMenuTypes,
  ): Record<string, TableValueFormat> => {
    if (!updatedExampleContent) return {};

    switch (type) {
      case 'params':
        return updatedExampleContent.params || {};
      case 'pathvariable':
        return updatedExampleContent.pathvariable || {};
      case 'headers':
        return updatedExampleContent.headers || {};
      case 'req body':
        if (
          reqBodyMenu === 'form-data' &&
          updatedExampleContent.body?.formData
        ) {
          const datas = updatedExampleContent.body.formData.datas || {};
          const files = updatedExampleContent.body.formData.files || {};

          const combinedData: Record<string, TableValueFormat> = { ...datas };

          if (files) {
            Object.entries(files).forEach(([key, value]) => {
              combinedData[key] = value as TableValueFormat;
            });
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
  }, [updatedExampleContent, tabValue, reqBodyMenu]);

  if (!requestDocs || !updatedExampleContent) {
    return <div>요청 정의서가 없습니다.</div>;
  }

  const handleSave = () => {
    const updatedData: ExampleContent = { ...updatedExampleContent };

    const filteredData = contentData.filter((item) => item.key.trim() !== '');

    if (tabValue.type === 'params') {
      updatedData.params = convertParamBaseToTableData(
        filteredData,
        tabValue.type,
      );
    } else if (tabValue.type === 'pathvariable') {
      updatedData.pathvariable = convertParamBaseToTableData(
        filteredData,
        tabValue.type,
      );
    } else if (tabValue.type === 'headers') {
      updatedData.headers = convertParamBaseToTableData(
        filteredData,
        tabValue.type,
      );
    } else if (tabValue.type === 'req body') {
      if (reqBodyMenu === 'raw') {
        updatedData.body = {
          raw: rawBodyContent,
          formData: null,
        };
      } else if (reqBodyMenu === 'form-data') {
        const formDataDatas: Record<string, TableValueFormat> = {};
        filteredData.forEach((param) => {
          const tableValue: TableValueFormat = [
            null,
            param.description,
            param.type || 'Text',
            param.required === '필수' ? true : false,
          ];
          formDataDatas[param.key] = tableValue;
        });
        updatedData.body = {
          raw: null,
          formData: {
            datas: formDataDatas,
            files: null,
          },
        };
      } else {
        updatedData.body = null;
      }
    }

    setUpdatedExampleContent(updatedData);

    editAPIExampleContent(
      {
        apiId: requestDocs.id,
        body: {
          exampleContent: updatedData,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['apiDetail', requestDocs.id],
          });
          setEditMode(false);
        },
        onError: (error) => {
          console.error('Failed to update API example content:', error);
        },
      },
    );
  };

  const handleCancelEdit = () => {
    if (requestDocs?.example_content) {
      setUpdatedExampleContent(requestDocs.example_content);
    }
    setEditMode(false);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    const updatedData: ExampleContent = { ...updatedExampleContent };

    const filteredData = contentData.filter((item) => item.key.trim() !== '');
    if (tabValue.type === 'params') {
      updatedData.params = convertParamBaseToTableData(
        filteredData,
        tabValue.type,
      );
    } else if (tabValue.type === 'pathvariable') {
      updatedData.pathvariable = convertParamBaseToTableData(
        filteredData,
        tabValue.type,
      );
    } else if (tabValue.type === 'headers') {
      updatedData.headers = convertParamBaseToTableData(
        filteredData,
        tabValue.type,
      );
    } else if (tabValue.type === 'req body') {
      if (reqBodyMenu === 'form-data') {
        const formDataDatas: Record<string, TableValueFormat> = {};
        filteredData.forEach((param) => {
          const tableValue: TableValueFormat = [
            null,
            param.description,
            param.type || 'Text',
            param.required === '필수' ? true : false,
          ];
          formDataDatas[param.key] = tableValue;
        });
        updatedData.body = {
          raw: null,
          formData: {
            datas: formDataDatas,
            files: null,
          },
        };
      }
    }

    setUpdatedExampleContent(updatedData);

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
    const newMenu = event.target.value as ReqBodyTypes;

    if (updatedExampleContent) {
      const newContent = { ...updatedExampleContent };
      if (newMenu === 'raw') {
        newContent.body = {
          raw: '',
          formData: null,
        };
        setRawBodyContent('');
      } else if (newMenu === 'form-data') {
        newContent.body = {
          raw: null,
          formData: {
            datas: {},
            files: null,
          },
        };
      } else {
        newContent.body = null;
      }
      setUpdatedExampleContent(newContent);
    }

    setReqBodyMenu(newMenu);
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
        <Flexbox style={{ justifyContent: 'end', gap: '1rem' }}>
          {isEditMode && (
            <Button color="grey" rounded={0.4} onClick={handleCancelEdit}>
              <Typography>취소</Typography>
            </Button>
          )}
          <Button
            color="grey"
            rounded={0.4}
            onClick={isEditMode ? handleSave : () => setEditMode(true)}
          >
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
              </RadioGroup>
            </FormControl>
          )}

          {tabValue.value === 3 && reqBodyMenu === 'none' ? (
            <BodyNone />
          ) : tabValue.value === 3 && reqBodyMenu === 'raw' ? (
            <Editor
              height="400px"
              defaultLanguage="json"
              value={rawBodyContent}
              onChange={(value) => {
                if (isEditMode) {
                  setRawBodyContent(value || '');
                  setUpdatedExampleContent((prev) => {
                    if (prev) {
                      return {
                        ...prev,
                        body: {
                          raw: value || '',
                          formData: null,
                        },
                      };
                    }
                    return prev;
                  });
                }
              }}
              options={{
                readOnly: !isEditMode,
                minimap: { enabled: false },
              }}
              onMount={(editor) => {
                editorRef.current = editor;
                if (isEditMode) {
                  editor.focus();
                }
              }}
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
    const [_value, description, fieldType, isRequired] = value;
    const requiredStr = isRequired === true ? '필수' : '선택';

    console.log(_value);
    return {
      key,
      description: description || '',
      required: type === 'pathvariable' ? undefined : requiredStr,
      type: type === 'req body' ? fieldType || 'Text' : undefined,
    };
  });
}

function convertParamBaseToTableData(
  paramBaseArray: ParamBase[],
  type: ReqTabMenuTypes,
): Record<string, TableValueFormat> {
  const tableData: Record<string, TableValueFormat> = {};
  paramBaseArray.forEach((param) => {
    const isRequired = param.required === '필수' ? true : false;
    const tableValue: TableValueFormat = [
      null,
      param.description,
      type === 'req body' ? param.type || 'Text' : null,
      type === 'pathvariable' ? null : isRequired,
    ];
    tableData[param.key] = tableValue;
  });
  return tableData;
}
