import { ReactNode } from 'react';
import { APIHeaderInfo } from './API.data.types';
import { useIsFocusedHookReturnType } from '../../hooks/useIsFocusedHook';

export interface APIProps {
  children: ReactNode;
  headerInfo: APIHeaderInfo;
}

export interface APIContextProps extends APIProps {
  useIsFocusedHook: useIsFocusedHookReturnType;
}
