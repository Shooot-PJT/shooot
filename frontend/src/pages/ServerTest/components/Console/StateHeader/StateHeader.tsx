import { HiCheck } from 'react-icons/hi';
import { RiEmotionNormalFill } from 'react-icons/ri';
import { LuServerOff } from 'react-icons/lu';
import { ProjectStatus } from '../../../types';
import * as s from './StateHeader.css';

interface StateHeaderProps {
  state: ProjectStatus;
}

export const StateHeader = ({ state }: StateHeaderProps) => {
  switch (state) {
    case 'RUN':
      return (
        <>
          <div className={s.BuildingCircle} />
          <div className={s.BuildingHeader}>프로젝트를 빌드중입니다</div>
        </>
      );
    case 'DEPLOY':
      return (
        <div className={s.headerContainer}>
          <div className={s.DistributingCircle}></div>
          <div className={s.DistributingHeader}>프로젝트를 배포중입니다</div>
        </div>
      );
    case 'DONE':
      return (
        <div className={s.StopDeployHeader}>
          <div className={s.StopDeployIcon}>
            <HiCheck size={16} />
          </div>
          정상적으로 배포가 중단되었습니다.
        </div>
      );
    case 'NONE':
      return (
        <div className={s.IdleHeader}>
          <RiEmotionNormalFill size={24} />
          배포중인 프로젝트가 없습니다
        </div>
      );
    case 'BUILD_ERROR':
      return (
        <div className={s.DisconnectingHeader}>
          <LuServerOff size={20} />
          빌드중 에러가 발생했습니다.
        </div>
      );
    case 'RUNTIME_ERROR':
      return (
        <div className={s.DisconnectingHeader}>
          <LuServerOff size={20} />
          배포중 런타임 에러가 발생했습니다.
        </div>
      );
    default:
      return null;
  }
};
