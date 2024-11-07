import Lottie from 'lottie-react';
import rocket from '../../../../assets/Rocket.json';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import * as s from './UploadingModal.css';
import { useUploadStateStore } from '../../stores/useUploadStateStore';
import { useEffect } from 'react';
import useModal from '../../../../hooks/useModal';

export const UploadingModal = () => {
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
    <Flexbox flexDirections="col" justifyContents="center" alignItems="center">
      <Typography size={1.5} weight="600">
        업로드 중 입니다...
      </Typography>
      <Flexbox
        justifyContents="center"
        alignItems="center"
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className={s.moon}>
          <div className={s.pattern1} />
          <div className={s.pattern2} />
          <div className={s.pattern3} />
        </div>
        <div
          style={{
            width: '150px',
            height: '200px',
          }}
        >
          <Lottie animationData={rocket} />
        </div>
      </Flexbox>
    </Flexbox>
  );
};
