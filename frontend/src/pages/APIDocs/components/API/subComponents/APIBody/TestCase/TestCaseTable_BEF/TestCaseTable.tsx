import { useState } from 'react';
import * as styles from './TestCaseTable.css';
import CellTextField from '../../RequestDocs/RequestContents/RequestSchemaTable/CellTextfield/CellTextfield';
import DropdownMenu from '../../RequestDocs/RequestContents/RequestSchemaTable/DropdownMenu/DropdownMenu';
import Icon from '../../../../../../../../components/Icon';
import { FaPlus } from 'react-icons/fa';

export interface ParamBase {
  key: string;
  value: string;
  description: string;
  type?: string;
}

interface ReqBodyParam extends ParamBase {
  type: string;
}

type Param = ParamBase | ReqBodyParam;

interface TableProps<T extends Param> {
  data: T[];
  type: 'params' | 'path variable' | 'headers' | 'req body';
  isEditMode?: boolean;
  onChange: (newData: T[]) => void;
}

export const TestCaseTable = <T extends Param>({
  data,
  type,
  isEditMode = false,
  onChange,
}: TableProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    if (isEditMode) setSelectedRow(index);
  };

  const handleTextFieldChange = <K extends keyof T>(
    index: number,
    field: K,
    newValue: string,
  ) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: newValue,
    };
    onChange(updatedData);
  };

  const handleDropdownChange = <K extends keyof T>(
    index: number,
    field: K,
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
    let newRow: T;
    if (type === 'req body') {
      newRow = {
        key: '',
        type: 'Text',
        value: '',
        description: '',
      } as T;
    } else {
      newRow = {
        key: '',
        value: '',
        description: '',
      } as T;
    }

    onChange([...data, newRow]);
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
            <th className={styles.headerCellStyle} style={{ width: '30%' }}>
              Value
            </th>
            <th className={styles.headerCellStyle} style={{ width: '40%' }}>
              Description
            </th>
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
              {type === 'req body' && 'type' in param && (
                <td className={styles.typeCellStyle}>
                  {isEditMode ? (
                    <DropdownMenu
                      options={['Text', 'File']}
                      selected={(param as ReqBodyParam).type || 'Text'}
                      onSelect={(newValue: string) =>
                        handleDropdownChange(index, 'type' as keyof T, newValue)
                      }
                    />
                  ) : (
                    <div className={styles.cellViewStyle}>
                      {(param as ReqBodyParam).type || 'Text'}
                    </div>
                  )}
                </td>
              )}
              <td className={styles.keyCellStyle}>
                {isEditMode ? (
                  <CellTextField
                    value={param.value}
                    onChange={(newValue: string) =>
                      handleTextFieldChange(index, 'value', newValue)
                    }
                  />
                ) : (
                  <div className={styles.cellViewStyle}>{param.value}</div>
                )}
              </td>
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
