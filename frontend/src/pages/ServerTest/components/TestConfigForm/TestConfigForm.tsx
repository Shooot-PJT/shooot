import { useRef } from 'react';
import { HiCog6Tooth, HiMiniUser } from 'react-icons/hi2';
import { LuTimer } from 'react-icons/lu';
import Textfield from '../../../../components/Textfield';
import Typography from '../../../../components/Typography';
import { TestMethodType } from '../../types';
import { MethodSelectBox } from '../MethodSelectBox/MethodSelectBox';
import * as s from './TestConfigForm.css';

export interface TestConfigFormProps {
  vuser: number;
  duration: number;
  testMethod: TestMethodType;
  onChange: (
    key: 'vuserNum' | 'duration' | 'method',
    value: number | TestMethodType,
  ) => void;
}

export const TestConfigForm = ({
  vuser,
  duration,
  testMethod,
  onChange,
}: TestConfigFormProps) => {
  const userInputRef = useRef<HTMLInputElement>(null);
  const testTimeRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s.Container}>
      <div className={s.FormGrid}>
        <HiMiniUser size={32} />
        <Typography weight="600"> 가상유저</Typography>
        <div style={{ position: 'relative' }}>
          <Textfield
            ratio={2}
            ref={userInputRef}
            value={vuser || ''}
            type="number"
            onChange={(e) => onChange('vuserNum', Number(e.target.value))}
          />
          <div className={s.conditionIndicator}>
            명
            <Typography size={0.75} color="disabled">
              (1 ~ 1000명)
            </Typography>
          </div>
        </div>
      </div>
      <div className={s.FormGrid}>
        <LuTimer size={32} />
        <Typography weight="600"> 테스트 시간</Typography>
        <div style={{ position: 'relative' }}>
          <Textfield
            ratio={2}
            ref={testTimeRef}
            value={duration || ''}
            type="number"
            onChange={(e) => onChange('duration', Number(e.target.value))}
          />
          <div className={s.conditionIndicator}>
            초
            <Typography size={0.75} color="disabled">
              (10초 ~300초)
            </Typography>
          </div>
        </div>
      </div>
      <div className={s.FormGrid}>
        <HiCog6Tooth size={32} />
        <Typography weight="600"> 테스트 매서드 종류</Typography>
        <MethodSelectBox
          value={testMethod || ''}
          options={['FIXED', 'SPIKE', 'RAMP_UP']}
          onChange={(value) => onChange('method', value)}
        />
      </div>
    </div>
  );
};
