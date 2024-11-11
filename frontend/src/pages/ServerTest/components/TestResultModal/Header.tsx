import * as s from './Header.css';
import { LuTimer } from 'react-icons/lu';
import { HiCog6Tooth, HiMiniUser } from 'react-icons/hi2';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import { SelectBox } from '../SelectBox/SelectBox';
import { TestMethodType } from '../../types';
import { MethodChip } from '../MethodChip/MethodChip';

export const Header = () => {
  return (
    <>
      <Flexbox justifyContents="between">
        <Typography size={1.5}>테스트 결과 상세 조회</Typography>
        <div className={s.TotalTimeIndicator}>
          <Typography weight="600">총 진행 시간</Typography>
          <div>
            <LuTimer size={24} />
          </div>
          <Typography color="primary">4분 17초</Typography>
        </div>
      </Flexbox>
      <div className={s.FullSection}>
        <div className={s.LeftSection}>
          <div className={s.SectionItem}>
            <Typography weight="600">해당 API 테스트 시간</Typography>
            <div>
              <LuTimer size={24} />
            </div>
            <Typography color="primary">1분</Typography>
          </div>
          <div className={s.SectionItem}>
            <Typography weight="600">해당 API 가상유저</Typography>
            <div>
              <HiMiniUser size={24} />
            </div>
            <Typography color="primary">10명</Typography>
          </div>
          <div className={s.SectionItem}>
            <Typography weight="600">해당 API 테스트 메서드</Typography>
            <div>
              <HiCog6Tooth size={24} />
            </div>
            <Typography color="primary">Fixed</Typography>
          </div>
        </div>
        <div className={s.RightSection}>
          <SelectBox
            options={[
              <MethodChip method="get" />,
              <MethodChip method="post" />,
            ]}
            value={0}
            onChange={(n: number) => {}}
          />
        </div>
      </div>
    </>
  );
};
