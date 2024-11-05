import { useEffect, useRef } from 'react';
import { HiCog6Tooth, HiMiniUser } from 'react-icons/hi2';
import { LuTimer } from 'react-icons/lu';
import Textfield from '../../../../components/Textfield';
import Typography from '../../../../components/Typography';
import * as s from './TestConfigForm.css';
import { Method } from '../../../APIDocs/types/methods';

export interface TestConfigFormProps {
  vuser: number;
  duration: number;
  testMethod: Method;
}

export const TestConfigForm = ({
  vuser,
  duration,
  testMethod,
}: TestConfigFormProps) => {
  const userInputRef = useRef<HTMLInputElement>(null);
  const testTimeRef = useRef<HTMLInputElement>(null);
  const testMethodRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s.Container}>
      <div className={s.FormGrid}>
        <HiMiniUser size={32} />
        <Typography weight="600"> 가상유저</Typography>
        <div style={{ position: 'relative' }}>
          <Textfield
            ratio={2}
            ref={userInputRef}
            value={vuser}
            type="number"
            style={{ paddingRight: '101000rem' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '32%',
              fontWeight: '700',
            }}
          >
            명
          </div>
        </div>
      </div>
      <div className={s.FormGrid}>
        <LuTimer size={32} />
        <Typography weight="600"> 테스트 시간</Typography>
        <div style={{ position: 'relative' }}>
          <Textfield ratio={2} ref={testTimeRef} value={duration} />
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '32%',
              fontWeight: '700',
            }}
          >
            분
          </div>
        </div>
      </div>
      <div className={s.FormGrid}>
        <HiCog6Tooth size={32} />
        <Typography weight="600"> 테스트 매서드 종류</Typography>
        <Textfield ref={testMethodRef} value={testMethod} />
      </div>
    </div>
  );
};
