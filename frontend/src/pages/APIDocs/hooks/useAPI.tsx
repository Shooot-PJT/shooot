// frontend/src/pages/APIDocs/hooks/useAPI.tsx

import { useEditAPI } from '../reactQueries/api';
import Typography from '../../../components/Typography';
import useModal from '../../../hooks/useModal';
import usePopup from '../../../hooks/usePopup';
import Flexbox from '../../../components/Flexbox';
import shooot_new from '/assets/shooot/shooot_new.png';
import shooot_oops from '/assets/shooot/shooot_oops.png';
import shooot_remove from '/assets/shooot/shooot_remove.png'; // 삭제 성공 이미지 추가
import { EditAPIModal } from '../components/API/subComponents/EditAPIModal/EditAPIModal';
import { RequestDocs } from '../types/data/API.data'; // 올바른 타입 임포트
import { EditAPIRequestBody } from '../apis/api/types';
import { useTestCase } from './useTestCase';
// import { AddTestCaseModal } from '../components/API/subComponents/APIBody/AddTestCaseModal/AddTestCaseModal';

export const useAPI = () => {
  const modal = useModal();
  const popup = usePopup();

  const {
    addTestCase,
    removeTestCase,
    isAdding,
    addError,
    isRemoving,
    removeError,
  } = useTestCase();

  const modalPopHandler = () => modal.pop();

  const { mutate: editAPIMutation } = useEditAPI();

  const editAPIModalHandler = (initialData: RequestDocs) => {
    modal.push({
      children: (
        <EditAPIModal
          apiId={initialData.id}
          initialData={initialData}
          popHandler={modalPopHandler}
          editHandler={(info: EditAPIRequestBody) =>
            editAPIMutation(
              { apiId: initialData.id, body: info },
              {
                onSuccess: () => {
                  popup.push({
                    type: 'success',
                    title: '',
                    children: (
                      <Flexbox
                        flexDirections="col"
                        style={{
                          gap: '2rem',
                          alignItems: 'center',
                          padding: '2rem 0rem',
                        }}
                      >
                        <img
                          height="100px"
                          src={shooot_new}
                          style={{ width: '12.5rem', height: 'auto' }}
                        />
                        <Typography size={1.5} weight="600">
                          성공적으로 수정되었습니다.
                        </Typography>
                      </Flexbox>
                    ),
                    onClose: modalPopHandler,
                  });
                },
                onError: () => {
                  popup.push({
                    type: 'fail',
                    title: '',
                    children: (
                      <Flexbox
                        flexDirections="col"
                        style={{
                          gap: '2rem',
                          alignItems: 'center',
                          padding: '2rem 0rem',
                        }}
                      >
                        <img
                          height="100px"
                          src={shooot_oops}
                          style={{ width: '12.5rem', height: 'auto' }}
                        />
                        <Typography size={1.5} weight="600">
                          수정에 실패했습니다. 다시 시도해주세요.
                        </Typography>
                      </Flexbox>
                    ),
                  });
                },
              },
            )
          }
        />
      ),
    });
  };

  const addTestCaseModalHandler = (apiId: number) => {
    // modal.push({
    //   children: (
    //     <AddTestCaseModal
    //       apiId={apiId}
    //       popHandler={modalPopHandler}
    //       addHandler={(testCaseData) => {
    //         addTestCase(apiId, testCaseData);
    //         popup.push({
    //           type: 'success',
    //           title: '',
    //           children: (
    //             <Flexbox
    //               flexDirections="col"
    //               style={{
    //                 gap: '2rem',
    //                 alignItems: 'center',
    //                 padding: '2rem 0rem',
    //               }}
    //             >
    //               <img
    //                 height="100px"
    //                 src={shooot_new}
    //                 style={{ width: '12.5rem', height: 'auto' }}
    //               />
    //               <Typography size={1.5} weight="600">
    //                 성공적으로 테스트케이스가 추가되었습니다.
    //               </Typography>
    //             </Flexbox>
    //           ),
    //           onClose: modalPopHandler,
    //         });
    //         if (addError) {
    //           popup.push({
    //             type: 'fail',
    //             title: '',
    //             children: (
    //               <Flexbox
    //                 flexDirections="col"
    //                 style={{
    //                   gap: '2rem',
    //                   alignItems: 'center',
    //                   padding: '2rem 0rem',
    //                 }}
    //               >
    //                 <img
    //                   height="100px"
    //                   src={shooot_oops}
    //                   style={{ width: '12.5rem', height: 'auto' }}
    //                 />
    //                 <Typography size={1.5} weight="600">
    //                   테스트케이스 추가에 실패했습니다. 다시 시도해주세요.
    //                 </Typography>
    //               </Flexbox>
    //             ),
    //           });
    //         }
    //       }}
    //     />
    //   ),
    // });
  };

  const handleRemoveTestCase = (apiId: number, testcaseId: number) => {
    removeTestCase(apiId, testcaseId); // 올바르게 호출

    popup.push({
      type: 'success',
      title: '',
      children: (
        <Flexbox
          flexDirections="col"
          style={{
            gap: '2rem',
            alignItems: 'center',
            padding: '2rem 0rem',
          }}
        >
          <img
            height="100px"
            src={shooot_remove} // 삭제 성공 이미지 사용
            style={{ width: '12.5rem', height: 'auto' }}
          />
          <Typography size={1.5} weight="600">
            성공적으로 테스트케이스가 삭제되었습니다.
          </Typography>
        </Flexbox>
      ),
      onClose: modalPopHandler,
    });

    if (removeError) {
      popup.push({
        type: 'fail',
        title: '',
        children: (
          <Flexbox
            flexDirections="col"
            style={{
              gap: '2rem',
              alignItems: 'center',
              padding: '2rem 0rem',
            }}
          >
            <img
              height="100px"
              src={shooot_oops}
              style={{ width: '12.5rem', height: 'auto' }}
            />
            <Typography size={1.5} weight="600">
              테스트케이스 삭제에 실패했습니다. 다시 시도해주세요.
            </Typography>
          </Flexbox>
        ),
      });
    }
  };

  return {
    editAPIModalHandler,
    addTestCaseModalHandler,
    handleRemoveTestCase, // 함수로 반환됨
    isAdding,
    isRemoving,
  };
};
