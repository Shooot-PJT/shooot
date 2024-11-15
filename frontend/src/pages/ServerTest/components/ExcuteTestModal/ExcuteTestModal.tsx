import { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Graph from '../../../../components/Graph/Graph';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { DataTable } from '../DataTable/DataTable';
import * as s from './ExcuteTestModal.css';
import { MethodChip } from '../MethodChip/MethodChip';
import Flexbox from '../../../../components/Flexbox';
import { useUploadStateStore } from '../../stores/useUploadStateStore';
import { EndServerTestModal } from '../EndServerTestModal/EndServerTestModal';
import { useTestSSE } from '../../hooks/useTestSSE';

interface ExcuteTestModalProps {
  projectJarFileId: number;
}

export const ExcuteTestModal = ({ projectJarFileId }: ExcuteTestModalProps) => {
  const modal = useModal();
  const { state } = useUploadStateStore();
  const [data, setData] = useState<number[]>([]);

  useTestSSE({
    projectJarFileId,
  });

  const handleEndTestModal = () => {
    modal.push({
      children: <EndServerTestModal />,
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prev = []) => [...prev, 120 - Math.floor(Math.random() * 120)]);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      // modal.pop();
    };
  }, []);

  useEffect(() => {
    if (state === 'End') {
      modal.pop();
    }
  }, [state]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div>
        <div className={s.title}>
          <Typography size={2} weight="700">
            서버 테스트
          </Typography>
          <Button color="delete" onClick={handleEndTestModal}>
            테스트 종료
          </Button>
        </div>
        <div className={s.testIndicator}>
          <Flexbox style={{ gap: '1rem' }}>
            <Typography color="put" weight="700">
              예상 남은 시간
            </Typography>
            <Typography>4 : 00</Typography>
          </Flexbox>
          <Flexbox style={{ gap: '1rem' }}>
            <Typography color="put" weight="700">
              현재 테스트중인 API
            </Typography>
            <MethodChip method="get" />
            <Typography>api/eggs/count</Typography>
          </Flexbox>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'start',
          gap: '0.25rem',
        }}
      >
        <div>
          <div>
            <Typography weight="700">CPU 사용량</Typography>
            <Graph
              frameColor={'primary'}
              lineColor={'primary'}
              SSEData={data}
            />
          </div>
          <div>
            <Typography weight="700">RAM 사용량</Typography>
            <Graph frameColor={'put'} lineColor={'put'} SSEData={data} />
          </div>
          <div>
            <Typography weight="700">디스크 사용량</Typography>
            <Graph frameColor={'get'} lineColor={'get'} SSEData={data} />
          </div>
        </div>
      </div>
      <DataTable
        colWidths={[32, 17, 17, 17, 17]}
        headers={['1번', '2번', '3번', '4번', '5번']}
        data={[]}
      />
    </div>
  );
};
