import { createContext, ReactNode, useContext } from 'react';
import * as style from './API.css';
import useIsFocusedHook, {
  useIsFocusedHookReturnType,
} from '../../hooks/useIsFocusedHook';
import { APIBody } from './subComponents/APIBody/APIBody';
import { APIHeader } from './subComponents/APIHeader/APIHeader';
import { APIDetailInfo } from '../../types/data/API.data';

export interface APIProps {
  children: ReactNode;
  requestDocs: APIDetailInfo['requestDocs'];
}

export interface APIContextProps extends APIProps {
  useIsFocusedHook: useIsFocusedHookReturnType;
}

const APIContext = createContext<APIContextProps | null>(null);

export const useAPIContext = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

export const API = ({ children, requestDocs }: APIProps) => {
  return (
    <div className={style.apiRootContainer}>
      <APIContext.Provider
        value={{
          children,
          requestDocs,
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
