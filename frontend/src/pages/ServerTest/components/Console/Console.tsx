import { useEffect, useRef, useState } from 'react';
import * as s from './Console.css';
import Typography from '../../../../components/Typography';

export interface ConsoleProps {
  state?: 'building' | 'distributing' | 'idle' | 'disconnecting';
  data: string[];
}

export const Console = ({ state = 'distributing', data }: ConsoleProps) => {
  const [displayedData, setDisplayedData] = useState<string[]>([]);
  const currentIndexRef = useRef(0);
  const bodyContentRef = useRef<HTMLDivElement>(null);

  const stateHeaderRender = () => {
    switch (state) {
      case 'building':
        return (
          <>
            <div className={s.BuildingCircle}> </div>
            <div className={s.BuildingHeader}>프로젝트를 빌드중입니다</div>
          </>
        );
      case 'distributing':
        return (
          <>
            <div className={s.DistributingCircle}> </div>
            <div className={s.DistributingHeader}>프로젝트를 배포중입니다</div>
          </>
        );
      case 'idle':
        return <div className={s.IdleHeader}>배포중인 프로젝트가 없습니다</div>;
      case 'disconnecting':
        return (
          <div className={s.DisconnectingHeader}>
            배포 서버와 연결할 수 없습니다
          </div>
        );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndexRef.current < data.length) {
        setDisplayedData((prev) => [...prev, data[currentIndexRef.current]]);
        currentIndexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (bodyContentRef.current) {
      bodyContentRef.current.scrollTop = bodyContentRef.current.scrollHeight;
    }
  }, [displayedData]);

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Typography size={1.5} weight="600">
          배포 프로젝트 로그 조회
        </Typography>
      </div>
      <div className={s.Header}>
        <div className={s.HeaderWrapper}>
          <div className={s.stateHeader}>{stateHeaderRender()}</div>
          <div
            className={
              state === 'building' || state === 'distributing'
                ? s.stopButtonActive
                : s.stopButtonDisabled
            }
          >
            배포 중단
            <div
              className={
                state === 'building' || state === 'distributing'
                  ? s.stopSquareActive
                  : s.stopSquareDisabled
              }
            ></div>
          </div>
        </div>
      </div>
      <div className={s.BodyWrapper}>
        <div className={s.Body} ref={bodyContentRef}>
          <div className={s.BodyContent}>
            {displayedData.map((item, idx) => (
              <div className={s.BodyContentItem} key={idx}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
