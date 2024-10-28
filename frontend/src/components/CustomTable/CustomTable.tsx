import { styled } from '@mui/material/styles';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import themeCss from '../../styles/theme.css';
import colorPalette from '../../styles/colorPalette';

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: themeCss.color.background[100],
    color: theme.palette.common.white,
    borderColor: colorPalette.util[400],
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: themeCss.color.background[300],
    color: theme.palette.common.white,
    borderColor: colorPalette.util[400],
  },
}));

export const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
