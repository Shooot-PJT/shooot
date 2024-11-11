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

//=============================================================
// 더미
const PARAMS_DATA_LIST_DUMMY = [
  {
    key: 'category',
    value: 'value1333',
    description: '검색대상 카테고리 지정하는 용도',
    required: '선택',
  },
];

const PATHVARIABLES_DATA_LIST_DUMMY = [
  {
    key: 'userId',
    value: 'value1234',
    description: '조회할 유저의 ID 명시',
    required: '필수',
  },
];

const HEADERS_DATA_LIST_DUMMY = [
  {
    key: 'customHeader',
    value: 'value5678',
    description: '커스텀 헤더',
    required: '선택',
  },
];

const REQUESTBODY_DATA_LIST_DUMMY = [
  {
    key: 'username',
    value: 'value123',
    description: '단순 username입니다.',
    required: '선택',
    type: 'Text',
  },
  {
    key: 'file',
    value: 'file123',
    description: '첨부 파일',
    required: '필수',
    type: 'File',
  },
];

const REQUEST_CONENT_LIST_DUMMIES = {
  PARAMS_DATA_LIST_DUMMY: PARAMS_DATA_LIST_DUMMY,
  PATHVARIABLES_DATA_LIST_DUMMY: PATHVARIABLES_DATA_LIST_DUMMY,
  HEADERS_DATA_LIST_DUMMY: HEADERS_DATA_LIST_DUMMY,
  REQUESTBODY_DATA_LIST_DUMMY: REQUESTBODY_DATA_LIST_DUMMY,
};

const DUMMY_METHOD = 'get';
