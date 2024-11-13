import Flexbox from '../../components/Flexbox';
import { API } from './components/API/API';
import { AuthorizeButton } from './components/AuthorizeButton/AuthorizeButton';
import { Domain } from './components/Domain/Domain';
import { AddDomainButton } from './components/Domain/DomainButtons/DomainButtons';
import { useGetDomainList } from './reactQueries/domain';
import { DUMMY_API_HEADER_INFO_LIST } from './dummies/api_header_info_list';
import { useNavBarStore } from '../../stores/navbarStore';
import { useEffect } from 'react';

export const APIDocs = () => {
  const currentProjectId = useNavBarStore((state) => state.project);

  const {
    data: domainList,
    isLoading,
    refetch,
  } = useGetDomainList({
    projectId: Number(currentProjectId),
  });

  useEffect(() => {
    refetch();
  }, [currentProjectId, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flexbox
      flexDirections="col"
      style={{
        gap: '1rem',
        padding: '2rem',
      }}
    >
      <Flexbox
        flexDirections="row"
        justifyContents="between"
        style={{ gap: '1rem', width: '100%' }}
      >
        <AuthorizeButton isAuthorized={true} />
        <AddDomainButton />
      </Flexbox>
      {domainList?.map((domainInfo) => (
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

// import React from 'react';
// import Flexbox from '../../components/Flexbox';
// import * as testcaseAPI from './apis/testcase';
// import * as domainAPI from './apis/domain';
// import * as apiAPI from './apis/api';
// import * as AT from './apis/testcase/types';
// import * as DT from './apis/domain/types';
// import * as APT from './apis/api/types';
// import { useNavBarStore } from '../../stores/navbarStore';
// import { useEffect } from 'react';

// export const APIDocs = () => {
//   const currentProjectId = useNavBarStore((state) => state.project);

//   useEffect(() => {
//     // Any necessary side effects can be handled here
//   }, [currentProjectId]);

//   const handleAddTestCase = async () => {
//     try {
//       const apiId = 1; // Dummy apiId
//       const requestBody: AT.AddTestCaseRequestBody = {
//         title: 'Dummy Test Case Title',
//         httpStatusCode: 200,
//         type: 'JSON', // Assuming 'JSON' is a valid TestCaseType
//         content: {
//           params: null,
//           headers: null,
//           pathvariable: null,
//           body: {
//             formData: null,
//             raw: null,
//           },
//           expectedResponse: {
//             schema: null,
//             example: null,
//           },
//         },
//       };
//       const response = await testcaseAPI.addTestCase({ apiId }, requestBody);
//       console.log('addTestCase response:', response);
//     } catch (error) {
//       console.error('addTestCase error:', error);
//     }
//   };

//   const handleGetTestCaseDetail = async () => {
//     try {
//       const testcaseId = 1; // Dummy testcaseId
//       const response = await testcaseAPI.getTestCaseDetail({ testcaseId });
//       console.log('getTestCaseDetail response:', response);
//     } catch (error) {
//       console.error('getTestCaseDetail error:', error);
//     }
//   };

//   const handleEditTestCase = async () => {
//     try {
//       const testcaseId = 1; // Dummy testcaseId
//       const requestBody: AT.EditTestCaseRequestBody = {
//         title: 'Updated Test Case Title',
//         // Other fields can be added as needed
//       };
//       const response = await testcaseAPI.editTestCase(
//         { testcaseId },
//         requestBody,
//       );
//       console.log('editTestCase response:', response);
//     } catch (error) {
//       console.error('editTestCase error:', error);
//     }
//   };

//   const handleRemoveTestCase = async () => {
//     try {
//       const testcaseId = 1; // Dummy testcaseId
//       await testcaseAPI.removeTestCase({ testcaseId });
//       console.log('removeTestCase response: success');
//     } catch (error) {
//       console.error('removeTestCase error:', error);
//     }
//   };

//   const handleGetDomainList = async () => {
//     try {
//       const projectId = 1; // Dummy projectId
//       const response = await domainAPI.getDomainList({ projectId });
//       console.log('getDomainList response:', response);
//     } catch (error) {
//       console.error('getDomainList error:', error);
//     }
//   };

//   const handleAddDomain = async () => {
//     try {
//       const requestData: DT.AddDomainRequest = {
//         projectId: 1,
//         title: 'Dummy Domain Title',
//         description: 'Dummy Domain Description',
//       };
//       const response = await domainAPI.addDomain(requestData);
//       console.log('addDomain response:', response);
//     } catch (error) {
//       console.error('addDomain error:', error);
//     }
//   };

//   const handleEditDomain = async () => {
//     try {
//       const requestData: DT.EditDomainRequest = {
//         domainId: 1,
//         title: 'Updated Domain Title',
//         description: 'Updated Domain Description',
//       };
//       const response = await domainAPI.editDomain(requestData);
//       console.log('editDomain response:', response);
//     } catch (error) {
//       console.error('editDomain error:', error);
//     }
//   };

//   const handleRemoveDomain = async () => {
//     try {
//       const domainId = 1; // Dummy domainId
//       await domainAPI.removeDomain({ domainId });
//       console.log('removeDomain response: success');
//     } catch (error) {
//       console.error('removeDomain error:', error);
//     }
//   };

//   const handleSubscribeNotification = async () => {
//     try {
//       const domainId = 1; // Dummy domainId
//       await domainAPI.subscribeNotification({ domainId });
//       console.log('subscribeNotification response: success');
//     } catch (error) {
//       console.error('subscribeNotification error:', error);
//     }
//   };

//   const handleAddAPI = async () => {
//     try {
//       const domainId = 1; // Dummy domainId
//       const requestBody: APT.AddAPIRequestBody = {
//         managerId: 1, // Dummy managerId
//         title: 'Dummy API Title',
//         description: 'Dummy API Description',
//         url: '/dummy/api/url',
//       };
//       const response = await apiAPI.addAPI({ domainId }, requestBody);
//       console.log('addAPI response:', response);
//     } catch (error) {
//       console.error('addAPI error:', error);
//     }
//   };

//   const handleGetAPIList = async () => {
//     try {
//       const domainId = 1; // Dummy domainId
//       const response = await apiAPI.getAPIList({ domainId });
//       console.log('getAPIList response:', response);
//     } catch (error) {
//       console.error('getAPIList error:', error);
//     }
//   };

//   const handleGetAPIDetail = async () => {
//     try {
//       const apiId = 1; // Dummy apiId
//       const response = await apiAPI.getAPIDetail({ apiId });
//       console.log('getAPIDetail response:', response);
//     } catch (error) {
//       console.error('getAPIDetail error:', error);
//     }
//   };

//   const handleEditAPI = async () => {
//     try {
//       const apiId = 1; // Dummy apiId
//       const requestBody: APT.EditAPIRequestBody = {
//         title: 'Updated API Title',
//         description: 'Updated API Description',
//         url: '/updated/api/url',
//         method: 'GET',
//       };
//       const response = await apiAPI.editAPI({ apiId }, requestBody);
//       console.log('editAPI response:', response);
//     } catch (error) {
//       console.error('editAPI error:', error);
//     }
//   };

//   const handleToggleAPIState = async () => {
//     try {
//       const apiId = 1; // Dummy apiId
//       const requestBody: APT.ToggleAPIStateRequestBody = {
//         isSecure: true,
//         isDeveloped: true,
//       };
//       await apiAPI.toggleAPIState({ apiId }, requestBody);
//       console.log('toggleAPIState response: success');
//     } catch (error) {
//       console.error('toggleAPIState error:', error);
//     }
//   };

//   const handleRemoveAPI = async () => {
//     try {
//       const apiId = 1; // Dummy apiId
//       await apiAPI.removeAPI({ apiId });
//       console.log('removeAPI response: success');
//     } catch (error) {
//       console.error('removeAPI error:', error);
//     }
//   };

//   return (
//     <Flexbox
//       flexDirections="col"
//       style={{
//         gap: '1rem',
//         padding: '2rem',
//       }}
//     >
//       {/* Existing code and comments are preserved */}
//       {/* <Flexbox
//         flexDirections="row"
//         justifyContents="between"
//         style={{ gap: '1rem', width: '100%' }}
//       >
//         <AuthorizeButton isAuthorized={true} />
//         <AddDomainButton />
//       </Flexbox>
//       {domainList?.map((domainInfo) => (
//         <Domain key={domainInfo.domainId} domainInfo={domainInfo}>
//           <Domain.Header />
//           <Domain.Body>
//             {DUMMY_API_HEADER_INFO_LIST.map((headerInfo) => (
//               <API key={headerInfo.apiId} headerInfo={headerInfo}>
//                 <API.Header />
//                 <API.Body />
//               </API>
//             ))}
//           </Domain.Body>
//         </Domain>
//       ))} */}
//       <Flexbox flexDirections="col" style={{ gap: '1rem' }}>
//         <button onClick={handleAddTestCase}>Test addTestCase</button>
//         <button onClick={handleGetTestCaseDetail}>
//           Test getTestCaseDetail
//         </button>
//         <button onClick={handleEditTestCase}>Test editTestCase</button>
//         <button onClick={handleRemoveTestCase}>Test removeTestCase</button>
//         <button onClick={handleGetDomainList}>Test getDomainList</button>
//         <button onClick={handleAddDomain}>Test addDomain</button>
//         <button onClick={handleEditDomain}>Test editDomain</button>
//         <button onClick={handleRemoveDomain}>Test removeDomain</button>
//         <button onClick={handleSubscribeNotification}>
//           Test subscribeNotification
//         </button>
//         <button onClick={handleAddAPI}>Test addAPI</button>
//         <button onClick={handleGetAPIList}>Test getAPIList</button>
//         <button onClick={handleGetAPIDetail}>Test getAPIDetail</button>
//         <button onClick={handleEditAPI}>Test editAPI</button>
//         <button onClick={handleToggleAPIState}>Test toggleAPIState</button>
//         <button onClick={handleRemoveAPI}>Test removeAPI</button>
//       </Flexbox>
//     </Flexbox>
//   );
// };
