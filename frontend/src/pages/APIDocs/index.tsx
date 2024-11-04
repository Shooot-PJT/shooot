import Flexbox from '../../components/Flexbox';
import { API } from './components/API/API';
import { AuthorizeButton } from './components/AuthorizeButton/AuthorizeButton';
import { Domain } from './components/Domain/Domain';
import { DUMMY_API_HEADER_INFO_LIST } from './dummies/api_header_info_list';
import { DOMAIN_INFO_LIST_DUMMY } from './dummies/domain_list_dummy';

export const APIDocs = () => {
  return (
    <Flexbox
      flexDirections="col"
      style={{
        gap: '1rem',
        padding: '2rem',
      }}
    >
      <AuthorizeButton isAuthorized={true} />
      {DOMAIN_INFO_LIST_DUMMY.map((domainInfo) => (
        <Domain key={domainInfo.domainId} domainInfo={domainInfo}>
          <Domain.Header />
          <Domain.Body>
            {DUMMY_API_HEADER_INFO_LIST.map((headerInfo) => (
              <API key={headerInfo.apiId} headerInfo={headerInfo}>
                <API.Header />
                <API.Body />
              </API>
            ))}
          </Domain.Body>
        </Domain>
      ))}
    </Flexbox>
  );
};
