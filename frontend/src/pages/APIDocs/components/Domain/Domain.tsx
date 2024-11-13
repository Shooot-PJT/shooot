// import { createContext, useContext } from 'react';
// import { DomainContextProps, DomainProps } from './Domain.types';
// import useIsFocusedHook from '../../hooks/useIsFocusedHook';
// import { Header } from './Header/Header';
// import { Body } from './Body/Body';
// import * as s from './Domain.css';
// const DomainContext = createContext<DomainContextProps | null>(null);

// export const useDomainContext = () => {
//   const context = useContext(DomainContext);
//   if (!context) {
//     throw new Error('');
//   }
//   return context;
// };

// export const Domain = ({ children, domainInfo }: DomainProps) => {
//   const { isFocused, setIsFocused, handleToggleIsFocused } = useIsFocusedHook();
//   return (
//     <div
//       className={s.domainContainerRecipe({
//         isOpen: isFocused,
//       })}
//     >
//       <DomainContext.Provider
//         value={{
//           children,
//           domainInfo,
//           useIsFocusedHook: { isFocused, setIsFocused, handleToggleIsFocused },
//         }}
//       >
//         {children}
//       </DomainContext.Provider>
//     </div>
//   );
// };

// Domain.Header = Header;
// Domain.Body = Body;

// frontend/src/pages/APIDocs/components/Domain/Domain.tsx
import { createContext, useContext } from 'react';
import { DomainContextProps, DomainProps } from './Domain.types';
import useIsFocusedHook from '../../hooks/useIsFocusedHook';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import * as s from './Domain.css';

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

Domain.Header = Header;
Domain.Body = Body;
