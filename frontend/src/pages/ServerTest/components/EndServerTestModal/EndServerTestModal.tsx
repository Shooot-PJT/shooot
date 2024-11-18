import { useEffect } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import usePopup from '../../../../hooks/usePopup';
import { useNavBarStore } from '../../../../stores/navbarStore';
import { stopApiTest } from '../../apis/TestApi';
import { useTestDataStore } from '../../stores/useTestDataStore';
import { useUploadStateStore } from '../../stores/useUploadStateStore';

interface EndServerTestModal {
  id: number;
}

export const EndServerTestModal = ({ id }: EndServerTestModal) => {
  const modal = useModal();
  const popup = usePopup();
  const { state, setState } = useTestDataStore();
  const { state: uploadState, setState: setUploadState } =
    useUploadStateStore();
  const { project } = useNavBarStore();

  const handleStopTest = () => {
    if (state === 'start') {
      stopApiTest({ projectJarFileId: id, projectId: project })
        .then(() => {
          setState('end');
          modal.pop();
        })
        .catch(() => {
          setUploadState('Error');
          popup.push({
            title: '중단 실패',
            children: '다시 시도해주세요',
            type: 'fail',
          });
        });
    } else {
      modal.pop();
    }
  };

  useEffect(() => {
    return () => {
      if (uploadState !== 'Error') {
        modal.pop();
      }
    };
  }, [state]);

  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      <Typography size={1.25} weight="700">
        서버 테스트 종료
      </Typography>
      <div>
        <Typography weight="500">테스트 창을 닫으시겠습니까?</Typography>
        <Typography weight="500" color="delete" size={0.8}>
          테스트가 중단됩니다.
        </Typography>
      </div>
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={() => modal.pop()}>
          취소
        </Button>
        <Button color="delete" onClick={handleStopTest}>
          종료
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
