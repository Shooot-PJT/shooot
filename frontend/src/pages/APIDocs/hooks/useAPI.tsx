import { useAddAPI, useEditAPI } from '../reactQueries/api';
import Typography from '../../../components/Typography';
import useModal from '../../../hooks/useModal';
import usePopup from '../../../hooks/usePopup';
import Flexbox from '../../../components/Flexbox';
import shooot_new from '/assets/shooot/shooot_new.png';
import shooot_oops from '/assets/shooot/shooot_oops.png';
import shooot_remove from '/assets/shooot/shooot_remove.png';
import { AddAPIModal } from '../components/API/subComponents/AddAPIModal/AddAPIModal';
import { EditAPIModal } from '../components/API/subComponents/EditAPIModal/EditAPIModal';
import { RequestDocs } from '../types/data/API.data';
import { AddAPIRequestBody, EditAPIRequestBody } from '../apis/api/types';
import { useTestCase } from './useTestCase';

export const useAPI = () => {
  const modal = useModal();
  const popup = usePopup();

  const { removeTestCase, isAdding, isRemoving, removeError } = useTestCase();

  const modalPopHandler = () => modal.pop();

  const { mutate: addAPIMutation } = useAddAPI();
  const { mutate: editAPIMutation } = useEditAPI();

  const addAPIModalHandler = (domainId: number) => {
    modal.push({
      children: (
        <AddAPIModal
          domainId={domainId}
          popHandler={modalPopHandler}
          addHandler={(info: AddAPIRequestBody) =>
            addAPIMutation(
              { domainId, body: info },
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
                          성공적으로 추가하였습니다.
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
                          API 추가에 실패했습니다. 다시 시도해주세요.
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

  const handleRemoveTestCase = (apiId: number, testcaseId: number) => {
    removeTestCase(apiId, testcaseId);

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
            src={shooot_remove}
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
    addAPIModalHandler,
    editAPIModalHandler,
    handleRemoveTestCase,
    isAdding,
    isRemoving,
  };
};
