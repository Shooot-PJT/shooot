import { ReactNode } from 'react';

export interface TableData {
  key: string;
  value: string;
  description: string;
}

export interface TestCaseTableProps {
  children: ReactNode;
  isEditing: boolean;
}

export interface UrlViewerBarProps {
  url: string;
  isEditing: boolean;
}

export interface TestCaseTableSectionProps {
  headers: string[];
  rows: TableData[];
  isEditing: boolean;
}
