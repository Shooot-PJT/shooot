import { ReactNode } from 'react';
import { DomainInfo } from './Domain.data.types';
import { useIsFocusedHookReturnType } from '../../hooks/useIsFocusedHook';

export interface DomainProps {
  children: ReactNode;
  domainInfo: DomainInfo;
}

export interface DomainContextProps extends DomainProps {
  useIsFocusedHook: useIsFocusedHookReturnType;
}
