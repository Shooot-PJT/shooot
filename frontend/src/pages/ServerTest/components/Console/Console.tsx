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
  const bodyContentRef = useRef<HTMLDivElement>(null);
  const { project } = useNavBarStore();

  useEffect(() => {
    setDisplayedData([]);
  }, [project]);

  const handleStopDeploy = () => {
    if (deployedFileId !== -1 && state === 'DEPLOY') {
      stopDeployFile({ projectJarFileId: deployedFileId })
        .then(() => {
          handleInitialDeploy();
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    setDisplayedData(data);
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
