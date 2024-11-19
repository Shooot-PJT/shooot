import { ReactNode } from 'react';
import { HiCog6Tooth, HiMiniUser } from 'react-icons/hi2';
import { LuTimer } from 'react-icons/lu';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import { GetTestRecordDetailResponse } from '../../types';
import { convertSecondsToTimeString } from '../../utils';
import { SelectBox } from '../SelectBox/SelectBox';
import * as s from './Header.css';

interface HeaderProps {
  Items: ReactNode[];
  selectedNum: number;
  handleSelectedNum: (n: number) => void;
  selectedApi: GetTestRecordDetailResponse;
  totalTime: number;
}

export const Header = ({
  Items,
  selectedNum,
  handleSelectedNum,
  selectedApi,
  totalTime,
}: HeaderProps) => {
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
          <Typography>{convertSecondsToTimeString(totalTime)}</Typography>
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
            <Typography>
              {convertSecondsToTimeString(selectedApi.duration)}
            </Typography>
          </div>
          <div className={s.SectionItem}>
            <Typography weight="600" color="put">
              해당 API 가상유저
            </Typography>
            <div>
              <HiMiniUser size={24} />
            </div>
            <Typography>{selectedApi.vuser}명</Typography>
          </div>
          <div className={s.SectionItem}>
            <Typography weight="600" color="put">
              해당 API 테스트 메서드
            </Typography>
            <div>
              <HiCog6Tooth size={24} />
            </div>
            <Typography>{selectedApi.testMethod}</Typography>
          </div>
        </div>
        <div className={s.RightSection}>
          <SelectBox
            options={Items}
            value={selectedNum}
            onChange={(n: number) => {
              handleSelectedNum(n);
            }}
          />
        </div>
      </div>
    </>
  );
};
