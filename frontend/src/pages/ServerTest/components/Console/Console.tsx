import { useEffect, useRef, useState } from 'react';
import Typography from '../../../../components/Typography';
import { stopDeployFile } from '../../apis/DistributeApi';
import { ProjectStatus } from '../../types';
import * as s from './Console.css';
import { StateHeader } from './StateHeader/StateHeader';
import { useNavBarStore } from '../../../../stores/navbarStore';
export interface ConsoleProps {
  state?: ProjectStatus;
  data: string[];
  deployedFileId: number;
  handleInitialDeploy: () => void;
}

export const Console = ({
  state = 'NONE',
  data,
  deployedFileId = -1,
  handleInitialDeploy,
}: ConsoleProps) => {
  const [displayedData, setDisplayedData] = useState<string[]>([]);
  const currentIndexRef = useRef(0);
  const bodyContentRef = useRef<HTMLDivElement>(null);
  const { project } = useNavBarStore();

  useEffect(() => {
    setDisplayedData([]);
  }, [project]);

  const handleStopDeploy = () => {
    console.log(deployedFileId);
    if (deployedFileId !== -1 && state === 'DEPLOY') {
      stopDeployFile({ projectJarFileId: deployedFileId })
        .then(() => {
          handleInitialDeploy();
          console.log('중단');
        })
        .catch(() => {
          console.log('실패');
        });
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
    <div className={s.container}>
      <div style={{ marginBottom: '3rem' }}>
        <Typography size={1.5} weight="600">
          배포 프로젝트 로그 조회
        </Typography>
      </div>
      <div className={s.Header}>
        <div className={s.HeaderWrapper}>
          <div className={s.stateHeader}>
            <StateHeader state={state} />
          </div>
          <div
            className={
              state === 'DEPLOY' ? s.stopButtonActive : s.stopButtonDisabled
            }
            onClick={handleStopDeploy}
          >
            배포 중단
            <div
              className={
                state === 'DEPLOY' ? s.stopSquareActive : s.stopSquareDisabled
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
