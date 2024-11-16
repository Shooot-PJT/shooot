import { useEffect } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { useUploadStateStore } from '../../stores/useUploadStateStore';

export const EndServerTestModal = () => {
  const modal = useModal();
  const { state, setState } = useUploadStateStore();

  useEffect(() => {
    return () => {
      if (state === 'End') {
        modal.pop();
        setState('None');
      }
    };
  }, [state]);
  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      <Typography size={1.25} weight="700">
        서버 테스트 종료
      </Typography>
      <div>
        <Typography weight="500">정말로 테스트를 종료하시겠습니까?</Typography>
        <Typography weight="500" color="delete" size={0.8}>
          테스트가 중단됩니다.
        </Typography>
      </div>
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={() => modal.pop()}>
          취소
        </Button>
        <Button
          color="delete"
          onClick={() => {
            setState('End');
            modal.pop();
          }}
        >
          종료
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
