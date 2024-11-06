import { useState, useEffect, useRef, ReactNode } from 'react';
import * as s from './DataTable.css';
import React from 'react';

interface DataTableProps {
  colWidths: number[];
  headers: string[];
  data: ReactNode[][];
  selectable?: boolean;
  expandedRowIndex?: number;
  ExpandedRow?: ReactNode;
}

export const DataTable = ({
  colWidths: initialColWidths,
  headers,
  selectable = false,
  data,
  expandedRowIndex,
  ExpandedRow,
}: DataTableProps) => {
  const [colWidths, setColWidths] = useState<number[]>(initialColWidths);
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const startX = useRef<number | null>(null);
  const startWidth = useRef<number | null>(null);
  const currentIndex = useRef<number | null>(null);

  useEffect(() => {
    setColWidths(initialColWidths);
  }, []);

  const handleSelectRow = (rowIndex: number) => {
    if (!selectable) return;
    if (rowIndex !== selectedRow) {
      setSelectedRow(rowIndex);
    } else {
      setSelectedRow(-1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, idx: number) => {
    startX.current = e.clientX;
    startWidth.current = colWidths[idx];
    currentIndex.current = idx;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (
      startX.current !== null &&
      startWidth.current !== null &&
      currentIndex.current !== null &&
      currentIndex.current < colWidths.length - 1
    ) {
      const delta = e.clientX - startX.current;
      const newWidth = startWidth.current + delta * 0.07;
      const nextWidth = colWidths[currentIndex.current + 1] - delta * 0.07;

      if (newWidth > 5 && nextWidth > 5) {
        setColWidths((prevWidths) => {
          const updatedWidths = [...prevWidths];
          updatedWidths[currentIndex.current!] = newWidth;
          updatedWidths[currentIndex.current! + 1] = nextWidth;
          return updatedWidths;
        });
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    startX.current = null;
    startWidth.current = null;
    currentIndex.current = null;
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        {headers.map((item, idx) => (
          <React.Fragment key={`RF-${idx}`}>
            <div
              className={s.headerItem}
              key={idx}
              style={
                {
                  '--width': `${colWidths[idx]}%`,
                } as React.CSSProperties
              }
            >
              {item}
            </div>
            {idx < headers.length - 1 && (
              <div
                key={`bar-${idx}`}
                className={s.resizeBar}
                onMouseDown={(e) => handleMouseDown(e, idx)}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className={s.body}>
        {data.map((row, rowIndex) => (
          <React.Fragment key={data.length - rowIndex}>
            <div
              className={`${rowIndex === selectedRow ? s.selectedRow : s.row} ${selectable ? s.hoverRow : ''}`}
              key={data.length - rowIndex}
              onClick={() => {
                handleSelectRow(rowIndex);
              }}
            >
              {row.map((item, colIndex) => (
                <div
                  className={s.rowItem}
                  key={`${data.length - rowIndex}-${colIndex}-${item}`}
                  style={
                    {
                      '--width': `${colWidths[colIndex]}%`,
                    } as React.CSSProperties
                  }
                >
                  {item}
                </div>
              ))}
            </div>
            {ExpandedRow && (
              <div
                className={`${s.expandedRowContainer} ${expandedRowIndex === rowIndex ? 'expanded' : ''}`}
              >
                {ExpandedRow}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
