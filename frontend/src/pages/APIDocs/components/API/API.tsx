import { createContext, useContext } from 'react';
import * as style from './API.css';
import { APIContextProps } from './API.types';
import { APIProps } from './API.types';

import useIsFocusedHook from '../../hooks/useIsFocusedHook';
import { APIBody } from './subComponents/APIBody/APIBody';
import { APIHeader } from './subComponents/APIHeader/APIHeader';

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

API.Header = APIHeader;
API.Body = APIBody;
