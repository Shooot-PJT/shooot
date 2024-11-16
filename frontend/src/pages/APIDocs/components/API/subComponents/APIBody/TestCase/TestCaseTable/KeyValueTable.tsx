import React, { memo, useCallback } from 'react';
import { TableRow } from './TestCaseTable.types';
import * as styles from './KeyValueTable.css';
import { v4 as uuidv4 } from 'uuid';

interface TableRowComponentProps {
  row: TableRow;
  isEditMode: boolean;
  onChange: (id: string, field: keyof TableRow, value: any) => void;
  onDelete: (id: string) => void;
}

const TableRowComponent: React.FC<TableRowComponentProps> = memo(
  ({ row, isEditMode, onChange, onDelete }) => {
    return (
      <tr className={styles.rowStyle}>
        <td className={styles.keyCellStyle}>
          {isEditMode ? (
            <input
              value={row.key}
              onChange={(e) => onChange(row.id, 'key', e.target.value)}
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
              onChange={(e) => onChange(row.id, 'value', e.target.value)}
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
              onChange={(e) => onChange(row.id, 'description', e.target.value)}
            />
          ) : (
            <div className={styles.cellViewStyle}>{row.description}</div>
          )}
        </td>
        {isEditMode && (
          <td className={styles.actionCellStyle}>
            <button onClick={() => onDelete(row.id)}>삭제</button>
          </td>
        )}
      </tr>
    );
  },
);

interface KeyValueTableProps {
  rows: TableRow[];
  setRows: React.Dispatch<React.SetStateAction<TableRow[]>>;
  isEditMode: boolean;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  rows,
  setRows,
  isEditMode,
}) => {
  // 행 변경 핸들러
  const handleChange = useCallback(
    (id: string, field: keyof TableRow, value: any) => {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      });
      setRows(updatedRows);
    },
    [rows, setRows],
  );

  // 행 삭제 핸들러
  const handleDelete = useCallback(
    (id: string) => {
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    },
    [rows, setRows],
  );

  // 행 추가 핸들러
  const handleAddRow = useCallback(() => {
    const newRow: TableRow = {
      id: uuidv4(),
      key: '',
      value: '',
      description: '',
      type: 'Text',
      isRequired: false,
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
  }, [rows, setRows]);

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
          {rows.map((row) => (
            <TableRowComponent
              key={row.id}
              row={row}
              isEditMode={isEditMode}
              onChange={handleChange}
              onDelete={handleDelete}
            />
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

export default KeyValueTable;
