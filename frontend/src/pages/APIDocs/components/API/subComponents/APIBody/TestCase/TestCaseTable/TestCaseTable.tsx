import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Typography from '../../../../../../../../components/Typography';
import * as s from './TestCaseTable.css';
import {
  CustomTableCell,
  CustomTableRow,
} from '../../../../../../../../components/CustomTable/CustomTable';
import { ReactNode } from 'react';
import Textfield from '../../../../../../../../components/Textfield';

interface TableData {
  key: string;
  value: string;
  description: string;
}

interface TestCaseTableProps {
  children: ReactNode;
}

export const TestCaseTable = ({ children }: TestCaseTableProps) => {
  const url = getUrlFromParamsAndPath();
  return (
    <div className={s.container}>
      {children}
      <UrlViewerBar url={url} />
    </div>
  );
};

TestCaseTable.Section = function Section({
  headers,
  rows,
  isEditing,
}: {
  headers: string[];
  rows: TableData[];
  isEditing: boolean;
}) {
  return (
    <TableContainer component={Paper} className={s.tableSection}>
      <Table aria-label="dynamic table" size="small">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <CustomTableCell key={index}>{header}</CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <CustomTableRow key={index}>
              <CustomTableCell>{row.key}</CustomTableCell>
              <CustomTableCell>
                {isEditing ? <Textfield color="none" /> : row.value}
              </CustomTableCell>
              <CustomTableCell>{row.description}</CustomTableCell>
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface UrlViewerBarProps {
  url: string;
}

const UrlViewerBar = ({ url }: UrlViewerBarProps) => {
  return (
    <div className={s.urlViewerBar}>
      <Typography size={0.85}>{url}</Typography>
    </div>
  );
};

const getUrlFromParamsAndPath = () => {
  const params = [
    { key: 'query', value: '영화' },
    { key: 'category', value: '액션' },
  ];
  const pathVariables = [
    { key: 'id', value: '123' },
    { key: 'lang', value: 'kr' },
  ];

  const paramsString = params.map((p) => `${p.key}=${p.value}`).join('&');
  const pathString = pathVariables.map((p) => p.value).join('/');

  return `https://www.example.com/${pathString}?${paramsString}`;
};
