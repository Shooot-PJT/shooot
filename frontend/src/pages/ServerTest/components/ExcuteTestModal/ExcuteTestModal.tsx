import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Graph from '../../../../components/Graph/Graph';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { Method } from '../../../APIDocs/types/methods';
import { useTestDataStore } from '../../stores/useTestDataStore';
import { convertTestDataTable } from '../../utils';
import { DataTable } from '../DataTable/DataTable';
import { EndServerTestModal } from '../EndServerTestModal/EndServerTestModal';
import { MethodChip } from '../MethodChip/MethodChip';
import * as s from './ExcuteTestModal.css';
import { useUploadStateStore } from '../../stores/useUploadStateStore';

interface ExcuteTestModalProps {
  testTime: number;
  projectJarFileId: number;
}

export const ExcuteTestModal = ({
  testTime,
  projectJarFileId,
}: ExcuteTestModalProps) => {
  const modal = useModal();
  const { state: testState, setState, testData } = useTestDataStore();
  const { setState: setUploadState } = useUploadStateStore();
  const [remainingTime, setRemainingTime] = useState(testTime);
  const [time, setTime] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [titleStatus, setTitleStatus] = useState<boolean>(false);
  const [animationFrameId, setAnimationFrameId] = useState(0);
  const dataIndexRef = useRef<number>(0);
  const dataTableBuffer = useRef<number>(-2);

  useEffect(() => {
    let animationFrameId: number;

    setUploadState('None');

    const animate = () => {
      setTime((prevTime) => prevTime + 1);
      setAnimationFrameId(requestAnimationFrame(animate));
    };

    setAnimationFrameId(requestAnimationFrame(animate));

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (
      time % 180 === 45 &&
      testData.length - 1 > dataIndexRef.current &&
      !isDone
    ) {
      dataIndexRef.current += 1;
    }
    if (isDone && time % 180 === 60) {
      dataTableBuffer.current += 1;
    }
  }, [testData, testData.length, time, isDone]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleEndTestModal = () => {
    modal.push({
      children: <EndServerTestModal id={projectJarFileId} />,
    });
  };
  const minutesDisplay = Math.max(0, Math.ceil(remainingTime / 60));

  useEffect(() => {
    return () => {
      modal.pop();
      setState('none');
    };
  }, []);

  useEffect(() => {
    if (testData.length - 1 === dataIndexRef.current && testState === 'end') {
      setIsDone(true);
    }
    if (isDone && time % 180 === 165) {
      setTitleStatus(true);
      dataTableBuffer.current += 1;
      cancelAnimationFrame(animationFrameId);
    }
  }, [animationFrameId, isDone, testData.length, testState, time]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div>
        <div className={s.title}>
          <Flexbox alignItems="center" style={{ gap: '1rem' }}>
            <Typography size={2} weight="700">
              서버 테스트
            </Typography>
            <div className={titleStatus ? s.endTest : s.progressTest}>
              <Typography
                size={1.5}
                color={titleStatus ? 'delete' : 'put'}
                weight="600"
              >
                {titleStatus ? '테스트 종료' : '진행중'}
              </Typography>
            </div>
          </Flexbox>
          <Button color="delete" onClick={handleEndTestModal}>
            테스트 종료
          </Button>
        </div>
        <div className={s.testIndicator}>
          <Flexbox style={{ gap: '1rem' }}>
            <Typography color="put" weight="700">
              예상 남은 시간
            </Typography>
            <Typography color={'primary'}>{minutesDisplay}분</Typography>
          </Flexbox>
          <Flexbox style={{ gap: '1rem' }}>
            <Typography color="put" weight="700">
              현재 테스트중인 API
            </Typography>
            {testData[dataIndexRef.current].method ? (
              <>
                <MethodChip
                  method={
                    testData[
                      dataIndexRef.current
                    ].method!.toLocaleLowerCase() as Method
                  }
                />
                <Typography>{testData[dataIndexRef.current].url}</Typography>
              </>
            ) : (
              <>대기중</>
            )}
          </Flexbox>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          gap: '1rem',
        }}
      >
        <div>
          <Typography size={1.25} weight="700">
            CPU 사용량
          </Typography>
          <Graph
            frameColor={'primary'}
            lineColor={'primary'}
            SSEData={testData}
            dataName={'cpu'}
            time={time}
            dataIndex={dataIndexRef.current}
          />
        </div>
        <div>
          <Typography size={1.25} weight="700">
            RAM 사용량
          </Typography>
          <Graph
            frameColor={'put'}
            lineColor={'put'}
            SSEData={testData}
            dataName={'memory'}
            time={time}
            dataIndex={dataIndexRef.current}
          />
        </div>
        <div>
          <Typography size={1.25} weight="700">
            네트워크 사용량
          </Typography>
          <Graph
            frameColor={'get'}
            lineColor={'get'}
            SSEData={testData}
            dataName={'network'}
            time={time}
            dataIndex={dataIndexRef.current}
          />
        </div>
        <div style={{ maxHeight: '280px', width: '100%', overflow: 'hidden' }}>
          <Typography size={1.25} weight="700">
            데이터 통계
          </Typography>
          <DataTable
            colWidths={[32, 17, 17, 17, 17]}
            headers={['데이터 항목', '현재값', '평균값', '최고값', '최저값']}
            data={convertTestDataTable(
              testData,
              Math.max(
                0,
                Math.min(
                  testData.length - 1,
                  dataIndexRef.current + dataTableBuffer.current,
                ),
              ),
            )}
          />
        </div>
      </div>
    </div>
  );
};
