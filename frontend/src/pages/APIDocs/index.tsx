import Flexbox from '../../components/Flexbox';
import { API } from './components/API/API';
import { DUMMY_API_HEADER_INFO_LIST } from './dummies/api_header_info_list';

export const APIDocs = () => {
  return (
    <Flexbox
      alignItems="center"
      flexDirections="col"
      justifyContents="start"
      style={{
        gap: '0.9rem',
        width: '100%',
        height: '100%',
      }}
    >
      {DUMMY_API_HEADER_INFO_LIST.map((header_info) => {
        return (
          <API
            key={header_info.id}
            id={header_info.id}
            title={header_info.title}
            description={header_info.description}
            manager={header_info.manager}
            method={header_info.method}
            needAuthorize={header_info.needAuthorize}
            endPoint={header_info.endPoint}
            lastTestResult={header_info.lastTestResult}
          >
            <API.Header />
            <API.Body />
          </API>
        );
      })}
    </Flexbox>
  );
};
