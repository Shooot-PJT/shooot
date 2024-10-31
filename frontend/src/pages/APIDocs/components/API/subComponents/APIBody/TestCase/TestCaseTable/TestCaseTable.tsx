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
import Textfield from '../../../../../../../../components/Textfield';
import {
  TestCaseTableProps,
  TestCaseTableSectionProps,
  UrlViewerBarProps,
} from './TestCaseTable.types';
import { getUrlFromParamsAndPath } from '../../../../../../utils';

{
  /*
  TODO:
  1. Params, Path variable, Header, Req Body에 따라
  테이블 종류 달라야한다면 식별, 종류별 개발

  2. Body에는 none/formData/json 택1 드랍다운메뉴 있어야함

  3. 
  */
}
export const TestCaseTable = ({ children, isEditing }: TestCaseTableProps) => {
  const url = getUrlFromParamsAndPath();

  return (
    <div className={s.container}>
      {children}
      <UrlViewerBar url={url} isEditing={isEditing} />
    </div>
  );
};

const UrlViewerBar = ({ url, isEditing }: UrlViewerBarProps) => {
  return (
    <div className={s.urlViewerBar}>
      {isEditing ? (
        <Textfield color="none" value={url} fullWidth />
      ) : (
        <Typography size={0.85}>{url}</Typography>
      )}
    </div>
  );
};

TestCaseTable.Section = function Section({
  headers,
  rows,
  isEditing,
}: TestCaseTableSectionProps) {
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
              {Object.entries(row).map((key, idx) => (
                <CustomTableCell key={idx}>
                  {isEditing ? (
                    <Textfield color="none" fullWidth value={key[1]} />
                  ) : (
                    <Typography
                      style={{
                        paddingTop: '0.4rem',
                        paddingBottom: '0.4rem',
                      }}
                      size={1.05}
                    >
                      {key[1]}
                    </Typography>
                  )}
                </CustomTableCell>
              ))}
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
