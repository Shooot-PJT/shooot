import { useEffect } from 'react';
import Button from '../../../../components/Button';
import Graph from '../../../../components/Graph/Graph';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { getRandomThree } from '../../utils';
import { DataTable } from '../DataTable/DataTable';
import * as s from './ExcuteTestModal.css';
import { MethodChip } from '../MethodChip/MethodChip';
import Flexbox from '../../../../components/Flexbox';

export const ExcuteTestModal = () => {
  const randomColor = getRandomThree();
  const modal = useModal();

  useEffect(() => {
    return () => {
      modal.pop();
    };
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <div>
        <div className={s.title}>
          <Typography size={2}>서버 테스트</Typography>
          <Button color="delete" onClick={modal.pop}>
            테스트 종료
          </Button>
        </div>
        <Typography>예상 남은 시간</Typography>
        <Flexbox style={{ gap: '1rem' }}>
          <Typography>현재 테스트중인 API</Typography>
          <MethodChip method="get" />
          <div>api/eggs/count</div>
        </Flexbox>
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
            <Typography color={randomColor[0]} weight="700">
              CPU 사용량
            </Typography>
            <Graph frameColor={randomColor[0]} lineColor={randomColor[0]} />
          </div>
          <div>
            <Typography color={randomColor[1]} weight="700">
              RAM 사용량
            </Typography>
            <Graph frameColor={randomColor[1]} lineColor={randomColor[1]} />
          </div>
          <div>
            <Typography color={randomColor[2]} weight="700">
              디스크 사용량
            </Typography>
            <Graph frameColor={randomColor[2]} lineColor={randomColor[2]} />
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
