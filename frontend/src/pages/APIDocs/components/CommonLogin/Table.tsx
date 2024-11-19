import { ReactNode } from 'react';
import { AddRow } from './AddRow';
import { Body } from './Body';
import { Header } from './Header';

interface TableProps {
  children?: ReactNode;
}

export const Table = ({ children }: TableProps) => {
  return <div style={{ width: '100%' }}>{children}</div>;
};

Table.Header = Header;
Table.Body = Body;
Table.AddRow = AddRow;
