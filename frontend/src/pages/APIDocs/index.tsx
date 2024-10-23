import Flexbox from '../../components/Flexbox';
import { API } from './components/API/API';
import { fullBoxStyle } from './components/API/API.css';
import { DUMMY_API_HEADER_INFO_LIST } from './dummies/api_header_info_list';

export const APIDocs = () => {
  return (
    <Flexbox
      bg="transparent"
      alignItems="center"
      flexDirection="column"
      justifyContent="start"
      rowGap={0.9}
      className={fullBoxStyle}
    >
      {DUMMY_API_HEADER_INFO_LIST.map((header_info) => {
        return (
          <API>
            <API.Header
              title={header_info.title}
              manager={header_info.manager}
              method={header_info.method}
              needAuthorize={header_info.needAuthorize}
              endPoint={header_info.endPoint}
              lastTestResult={header_info.lastTestResult}
            />
          </API>
        );
      })}
    </Flexbox>
  );
};
