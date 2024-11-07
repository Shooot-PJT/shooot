import { createContext, useContext } from 'react';
import * as style from './API.css';
import { APIContextProps } from './API.types';
import { APIProps } from './API.types';

import useIsFocusedHook from '../../hooks/useIsFocusedHook';
import { Body } from './subComponents/APIBody';
import { Header } from './subComponents/APIHeader';

const APIContext = createContext<APIContextProps | null>(null);

export const useAPIContext = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

export const API = ({ children, headerInfo }: APIProps) => {
  return (
    <div className={style.apiRootContainer}>
      <APIContext.Provider
        value={{
          children,
          headerInfo,
          useIsFocusedHook: { ...useIsFocusedHook() },
        }}
      >
        {children}
      </APIContext.Provider>
    </div>
  );
};

API.Header = Header;
API.Body = Body;