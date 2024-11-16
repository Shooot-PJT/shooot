import { useState } from 'react';
import { HiCog6Tooth, HiMiniUser } from 'react-icons/hi2';
import { LuTimer } from 'react-icons/lu';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import { MethodChip } from '../MethodChip/MethodChip';
import { SelectBox } from '../SelectBox/SelectBox';
import * as s from './Header.css';

export const Header = () => {
  const [selectedAPI, setSelectedAPI] = useState<number>(0);
  return (
    <>
      <Flexbox justifyContents="between">
        <Typography size={1.5} weight="700">
          테스트 결과 상세 조회
        </Typography>
        <div className={s.TotalTimeIndicator}>
          <Typography weight="700" color="post">
            총 진행 시간
          </Typography>
          <div>
            <LuTimer size={24} />
          </div>
          <Typography>4분 17초</Typography>
        </div>
      </Flexbox>
      <div className={s.FullSection}>
        <div className={s.LeftSection}>
          <div className={s.SectionItem}>
            <Typography weight="600" color="put">
              해당 API 테스트 시간
            </Typography>
            <div>
              <LuTimer size={24} />
            </div>
            <Typography>1분</Typography>
          </div>
          <div className={s.SectionItem}>
            <Typography weight="600" color="put">
              해당 API 가상유저
            </Typography>
            <div>
              <HiMiniUser size={24} />
            </div>
            <Typography>10명</Typography>
          </div>
          <div className={s.SectionItem}>
            <Typography weight="600" color="put">
              해당 API 테스트 메서드
            </Typography>
            <div>
              <HiCog6Tooth size={24} />
            </div>
            <Typography>Fixed</Typography>
          </div>
        </div>
        <div className={s.RightSection}>
          <SelectBox
            options={[
              <div className={s.option}>
                <MethodChip method="get" />
                <div>api/eggs/count</div>
              </div>,
              <div className={s.option}>
                <MethodChip method="post" />
                <div>api/eggs/count</div>
              </div>,
            ]}
            value={selectedAPI}
            onChange={(n: number) => {
              setSelectedAPI(n);
            }}
          />
        </div>
      </div>
    </>
  );
};
