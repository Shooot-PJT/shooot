import { useEditAPI } from '../reactQueries/api';
import Typography from '../../../components/Typography';
import useModal from '../../../hooks/useModal';
import usePopup from '../../../hooks/usePopup';
import Flexbox from '../../../components/Flexbox';
import shooot_new from '/assets/shooot/shooot_new.png';
import shooot_oops from '/assets/shooot/shooot_oops.png';
import { EditAPIModal } from '../components/API/subComponents/EditAPIModal/EditAPIModal';
import { APIRequestDocsInfo } from '../types/data/API.data'; // 올바른 타입 임포트
import { EditAPIRequestBody } from '../apis/api/types';

export const useAPI = () => {
  const modal = useModal();
  const popup = usePopup();

  const modalPopHandler = () => modal.pop();

  const { mutate: editAPIMutation } = useEditAPI();

  const editAPIModalHandler = (initialData: APIRequestDocsInfo) => {
    modal.push({
      children: (
        <EditAPIModal
          apiId={initialData.id} // apiId 전달
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

  return {
    editAPIModalHandler,
  };
};
