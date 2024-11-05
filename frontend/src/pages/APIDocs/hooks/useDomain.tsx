import { useMutation } from '@tanstack/react-query';
import Typography from '../../../components/Typography';
import useModal from '../../../hooks/useModal';
import usePopup from '../../../hooks/usePopup';
import { useNavBarStore } from '../../../stores/navbarStore';
import { addDomain, editDomain, removeDomain } from '../apis';
import { AddDomainModal } from '../components/Domain/AddDomainModal/AddDomainModal';
import {
  AddDomainRequest,
  EditDomainRequest,
} from '../components/Domain/types/domain.types';
import { DomainInfo } from '../components/Domain/Domain.data.types';
import { RemoveDomainModal } from '../components/Domain/RemoveDomainModal/RemoveDomainModal';
import Flexbox from '../../../components/Flexbox';
import shooot_remove from '/assets/shooot_remove.png';

export const useDomain = () => {
  const modal = useModal();
  const popup = usePopup();
  const currentProjectId = useNavBarStore((state) => state.project);

  const modalPopHandler = () => modal.pop();

  const addDomainMutation = useMutation({
    mutationKey: ['add-domain'],
    mutationFn: async (info: AddDomainRequest) => await addDomain(info),
    onSuccess: () => {
      popup.push({
        type: 'success',
        title: '도메인 생성',
        children: <Typography>도메인을 생성하였습니다.</Typography>,
        onClose: () => {
          modal.pop();
        },
      });
    },
    onError: () => {
      popup.push({
        type: 'fail',
        title: '도메인 생성 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
      });
    },
  });

  const editDomainMutation = useMutation({
    mutationKey: ['edit-domain'],
    mutationFn: async (params: EditDomainRequest) =>
      await removeDomain({
        domainId: params.domainId,
      }),
    onSuccess: () => {
      popup.push({
        type: 'success',
        title: '도메인 편집 성공',
        children: <Typography>도메인을 편집하였습니다.</Typography>,
        onClose: () => {
          modal.pop();
        },
      });
    },
    onError: () => {
      popup.push({
        type: 'fail',
        title: '도메인 편집 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
      });
    },
  });

  const removeDomainMutation = useMutation({
    mutationKey: ['remove-domain'],
    mutationFn: async (params: EditDomainRequest) =>
      await editDomain({
        domainId: params.domainId,
      }),
    onSuccess: () => {
      popup.push({
        title: '',
        type: 'success',
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
              style={{
                width: '12.5rem',
                height: 'auto',
              }}
            />

            <Typography size={1.5} weight="600">
              성공적으로 제거되었습니다.
            </Typography>
          </Flexbox>
        ),
        onClose: () => {
          modal.pop();
        },
      });
    },
    onError: () => {
      popup.push({
        type: 'fail',
        title: '도메인 삭제 실패',
        children: <Typography>다시 시도해주세요.</Typography>,
      });
    },
  });

  const editDomainModalHandler = (domainInfo: DomainInfo) => {
    modal.push({
      children: (
        <AddDomainModal
          type="edit"
          projectId={currentProjectId}
          domainInfo={domainInfo}
          popHandler={modalPopHandler}
          editHandler={editDomainMutation.mutate}
        />
      ),
    });
  };

  const addDomainModalHandler = () => {
    modal.push({
      children: (
        <AddDomainModal
          type="add"
          projectId={currentProjectId}
          popHandler={modalPopHandler}
          addHandler={addDomainMutation.mutate}
        />
      ),
    });
  };

  const removeDomainModalHandler = (domainId: DomainInfo['domainId']) => {
    modal.push({
      children: (
        <RemoveDomainModal
          domainId={domainId}
          popHandler={modalPopHandler}
          removeHandler={removeDomainMutation.mutate}
        />
      ),
    });
  };

  return {
    addDomainModalHandler,
    editDomainModalHandler,
    removeDomainModalHandler,
  };
};
