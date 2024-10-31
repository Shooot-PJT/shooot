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
          <API key={header_info.apiId} header_info={header_info}>
            <API.Header />
            <API.Body />
          </API>
        );
      })}
    </Flexbox>
  );
};
