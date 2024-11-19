import Lottie from 'lottie-react';
import { useEffect } from 'react';
import rocket from '../../../../assets/Rocket.json';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { useUploadStateStore } from '../../stores/useUploadStateStore';
import * as s from './UploadingModal.css';
import StarFieldAnimation from './StarFieldAnimation';
import Typography from '../../../../components/Typography';

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
    <div className={s.container}>
      <Typography size={2} weight="600">
        업로드 중입니다.
      </Typography>
      <Flexbox
        flexDirections="col"
        justifyContents="center"
        alignItems="center"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: 'rgba(0,0,0,1)',
        }}
      >
        <StarFieldAnimation />
        <div
          style={{
            position: 'absolute',
            width: '175px',
            height: '225px',
            top: '24%',
          }}
        >
          <Lottie animationData={rocket} />
        </div>
        <div className={s.moon}>
          <div className={s.pattern1} />
          <div className={s.pattern2} />
          <div className={s.pattern3} />
        </div>
        <div className={s.moon2} />
      </Flexbox>
      {/* </Flexbox> */}
    </div>
  );
};
