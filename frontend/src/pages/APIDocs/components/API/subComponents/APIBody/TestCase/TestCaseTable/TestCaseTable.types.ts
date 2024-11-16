export type Key = string;
export type Value = string | number | boolean | null;
export type Description = string | null;
export type IsRequired = boolean | null;
export type Type = 'Text' | 'File' | string | null;
export type JsonData = object;
export type TableValueFormat = [Value, Description, Type, IsRequired];
export type TableData = Record<Key, TableValueFormat>;

export interface FileMeta {
  parameterVar: string;
  description: string | null;
}

export interface CustomFormData {
  datas: TableData | null;
  files: Record<string, Record<string, [string, FileMeta, Type, null]>> | null;
}

export interface Raw {
  datas: object | null;
  files: null;
}

export interface Body {
  formData: CustomFormData | null;
  raw: Raw | null;
}

export interface ExpectedResponse {
  schema: string | null;
  example: JsonData | null;
}

export interface TestCaseContent {
  params: TableData | null;
  headers: TableData | null;
  pathvariable: TableData | null;
  body: Body;
  expectedResponse: ExpectedResponse;
}

export interface TableRow {
  id: string;
  key: string;
  value: string;
  description: string;
}

export interface TestCaseDetailInfo {
  id: number;
  title: string;
  httpStatusCode: number;
  type: 'MULTIPART' | 'JSON' | 'NONE';
  content: TestCaseContent;
}
