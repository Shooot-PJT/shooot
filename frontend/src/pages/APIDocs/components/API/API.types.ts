import { ReactNode } from 'react';
import { APIBasicInfo, EndPoint, TestResult } from './API.data.types';
import { useIsFocusedHookReturnType } from '../../hooks/useIsFocusedHook';

export interface APIProps {
  children: ReactNode;
  // API 기본 입력 정보
  id: APIBasicInfo['id'];
  method: APIBasicInfo['method'];
  title: APIBasicInfo['title'];
  manager: APIBasicInfo['manager'];
  description?: APIBasicInfo['description'];
  needAuthorize?: boolean;
  endPoint?: EndPoint;
  lastTestResult?: TestResult;
}

export interface APIContextProps extends APIProps {
  useIsFocusedHook: useIsFocusedHookReturnType;
}
