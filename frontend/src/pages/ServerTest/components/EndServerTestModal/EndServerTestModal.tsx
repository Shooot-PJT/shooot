import { useEffect } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { useNavBarStore } from '../../../../stores/navbarStore';
import { stopApiTest } from '../../apis/TestApi';
import { useTestDataStore } from '../../stores/useTestDataStore';
import { useUploadStateStore } from '../../stores/useUploadStateStore';

interface EndServerTestModal {
  id: number;
}

export const EndServerTestModal = ({ id }: EndServerTestModal) => {
  const modal = useModal();
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
          modal.pop();
        });
    } else {
      setUploadState('Pending');
      modal.pop();
    }
  };

  useEffect(() => {
    return () => {
      if (uploadState !== 'None') {
        setUploadState('None');
        modal.pop();
      }
    };
  }, [uploadState]);

  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      <Typography size={1.25} weight="700">
        서버 테스트 종료
      </Typography>
      <div>
        {state === 'start' ? (
          <>
            <Typography weight="500">테스트를 중단하시겠습니까?</Typography>
            <Typography weight="500" color="delete" size={0.8}>
              진행중인 테스트는 중단됩니다.
            </Typography>
          </>
        ) : (
          <Typography weight="500">테스트 창을 닫으시겠습니까?</Typography>
        )}
      </div>
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button
          color="grey"
          onClick={() => {
            setUploadState('None');
            modal.pop();
          }}
        >
          취소
        </Button>
        <Button color="delete" onClick={handleStopTest}>
          종료
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
