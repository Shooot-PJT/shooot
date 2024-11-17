import { useState, useEffect, useRef } from 'react';
import * as styles from './RequestSchemaTable.css';
import CellTextField from './CellTextfield/CellTextfield';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Icon from '../../../../../../../../../components/Icon';
import { FaPlus, FaTrash } from 'react-icons/fa';

export interface ParamBase {
  key: string;
  description: string;
  required?: string;
  type?: string;
}

interface TableProps {
  data: ParamBase[];
  type: 'params' | 'pathvariable' | 'headers' | 'req body';
  isEditMode?: boolean;
  onChange: (newData: ParamBase[]) => void;
}

export const RequestSchemaTable = ({
  data,
  type,
  isEditMode = false,
  onChange,
}: TableProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const keyInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isEditMode && keyInputRefs.current[0]) {
      keyInputRefs.current[0].focus();
    }
  }, [isEditMode]);

  const handleRowClick = (index: number) => {
    if (isEditMode) setSelectedRow(index);
  };

  const handleTextFieldChange = (
    index: number,
    field: keyof ParamBase,
    newValue: string,
  ) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: newValue,
    };
    onChange(updatedData);
  };

  const handleDropdownChange = (
    index: number,
    field: keyof ParamBase,
    newValue: string,
  ) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: newValue,
    };
    onChange(updatedData);
  };

  const handleAddRow = () => {
    const newRow: ParamBase =
      type === 'req body'
        ? {
            key: '',
            description: '',
            required: '선택',
            type: 'Text',
          }
        : type === 'pathvariable'
          ? {
              key: '',
              description: '',
            }
          : {
              key: '',
              description: '',
              required: '선택',
            };
    const newData = [...data, newRow];
    onChange(newData);
  };

  const handleDeleteRow = (index: number) => {
    const updatedData = data.filter((_, idx) => idx !== index);
    onChange(updatedData);
  };

  return (
    <div>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th className={styles.headerCellStyle} style={{ width: '20%' }}>
              Key
            </th>
            {type === 'req body' && (
              <th className={styles.headerCellStyle} style={{ width: '10%' }}>
                Type
              </th>
            )}
            {type !== 'pathvariable' && (
              <th className={styles.headerCellStyle} style={{ width: '10%' }}>
                필수 여부
              </th>
            )}
            <th className={styles.headerCellStyle} style={{ width: '50%' }}>
              Description
            </th>
            {isEditMode && (
              <th className={styles.headerCellStyle} style={{ width: '10%' }}>
                삭제
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((param, index) => (
            <tr
              key={index}
              className={
                selectedRow === index && isEditMode
                  ? styles.selectedRowStyle
                  : styles.rowStyle
              }
              onClick={() => handleRowClick(index)}
              style={{ cursor: isEditMode ? 'pointer' : 'default' }}
            >
              <td className={styles.keyCellStyle}>
                {isEditMode ? (
                  <CellTextField
                    value={param.key}
                    onChange={(newValue: string) =>
                      handleTextFieldChange(index, 'key', newValue)
                    }
                  />
                ) : (
                  <div className={styles.cellViewStyle}>{param.key}</div>
                )}
              </td>
              {type === 'req body' && (
                <td className={styles.typeCellStyle}>
                  {isEditMode ? (
                    <DropdownMenu
                      options={['Text', 'File']}
                      selected={param.type || 'Text'}
                      onSelect={(newValue: string) =>
                        handleDropdownChange(index, 'type', newValue)
                      }
                    />
                  ) : (
                    <div className={styles.cellViewStyle}>
                      {param.type || 'Text'}
                    </div>
                  )}
                </td>
              )}
              {type !== 'pathvariable' && (
                <td className={styles.requiredCellStyle}>
                  {isEditMode ? (
                    <DropdownMenu
                      options={['선택', '필수']}
                      selected={param.required || '선택'}
                      onSelect={(newValue: string) =>
                        handleDropdownChange(index, 'required', newValue)
                      }
                    />
                  ) : (
                    <div className={styles.cellViewStyle}>
                      {param.required || '선택'}
                    </div>
                  )}
                </td>
              )}
              <td className={styles.descriptionCellStyle}>
                {isEditMode ? (
                  <CellTextField
                    value={param.description}
                    onChange={(newValue: string) =>
                      handleTextFieldChange(index, 'description', newValue)
                    }
                  />
                ) : (
                  <div className={styles.cellViewStyle}>
                    {param.description}
                  </div>
                )}
              </td>
              {isEditMode && (
                <td>
                  <Icon
                    background="none"
                    color="light"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <FaTrash />
                  </Icon>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isEditMode && (
        <div className={styles.addButtonContainer} onClick={handleAddRow}>
          <Icon background="none" color="light">
            <FaPlus />
          </Icon>
        </div>
      )}
    </div>
  );
};
