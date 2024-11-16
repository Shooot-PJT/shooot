import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FileMeta, CustomFormData } from './TestCaseTable.types';
import * as bodyFormDataStyles from './BodyFormData.css';
import * as styles from './KeyValueTable.css';

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

  const prevFormDataRef = useRef<CustomFormData | null>(null);

  // formData가 변경될 때만 formDataEntries를 초기화
  useEffect(() => {
    if (JSON.stringify(formData) === JSON.stringify(prevFormDataRef.current)) {
      return;
    }

    prevFormDataRef.current = formData;

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

          if (fileMeta && typeof fileMeta === 'object') {
            entries.push({
              key: fileMeta.parameterVar,
              type: 'File',
              value: fileName,
              description: fileMeta.description,
              s3Url: s3Url !== null && s3Url !== undefined ? String(s3Url) : '',
            });
          }
        }
      }
    }

    setFormDataEntries(entries);
  }, [formData]);

  // 이전에 전송한 데이터 저장
  const prevFormDataResultRef = useRef<CustomFormData | null>(null);

  // processEntries 함수 정의
  const processEntries = useCallback(async () => {
    if (!isEditMode) return; // 편집 모드가 아니면 실행하지 않음

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

    const formDataResult: CustomFormData | null =
      (datas && Object.keys(datas).length > 0) ||
      (files && Object.keys(files).length > 0)
        ? {
            datas: Object.keys(datas!).length > 0 ? datas : null,
            files: Object.keys(files!).length > 0 ? files : null,
          }
        : null;

    // 이전에 전송한 데이터와 비교하여 변경 사항이 있을 때만 onDataChange 호출
    if (
      JSON.stringify(formDataResult) !==
      JSON.stringify(prevFormDataResultRef.current)
    ) {
      onDataChange('body', {
        formData: formDataResult,
        raw: null,
      });
      prevFormDataResultRef.current = formDataResult;
    }
  }, [formDataEntries, isEditMode, onDataChange]);

  // formDataEntries가 변경될 때 processEntries 호출
  useEffect(() => {
    processEntries();
  }, [formDataEntries, processEntries]);

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

export default BodyFormData;
