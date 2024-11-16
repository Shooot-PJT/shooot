import { createContext, ReactNode, useContext } from 'react';
import useIsFocusedHook, {
  useIsFocusedHookReturnType,
} from '../../hooks/useIsFocusedHook';
import { DomainHeader } from './DomainHeader/DomainHeader';
import { DomainBody } from './DomainBody/DomainBody';
import * as s from './Domain.css';
import { DomainInfo } from '../../types/data/Domain.data';

export interface DomainProps {
  children: ReactNode;
  domainInfo: DomainInfo;
}

export interface DomainContextProps extends DomainProps {
  useIsFocusedHook: useIsFocusedHookReturnType;
}

const DomainContext = createContext<DomainContextProps | null>(null);

export const useDomainContext = () => {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomainContext must be used within a DomainProvider');
  }
  return context;
};

export const Domain = ({ children, domainInfo }: DomainProps) => {
  const { isFocused, setIsFocused, handleToggleIsFocused } = useIsFocusedHook();

  return (
    <div
      className={s.domainContainerRecipe({
        isOpen: isFocused,
      })}
    >
      <DomainContext.Provider
        value={{
          children,
          domainInfo,
          useIsFocusedHook: { isFocused, setIsFocused, handleToggleIsFocused },
        }}
      >
        {children}
      </DomainContext.Provider>
    </div>
  );
};

Domain.Header = DomainHeader;
Domain.Body = DomainBody;
