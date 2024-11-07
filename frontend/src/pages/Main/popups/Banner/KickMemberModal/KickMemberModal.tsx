import { HiUser, HiXMark } from 'react-icons/hi2';
import Flexbox from '../../../../../components/Flexbox';
import Typography from '../../../../../components/Typography';
import { ProjectMember } from '../../../../MyProject/types';
import Icon from '../../../../../components/Icon';
import { CustomTooltip } from '../../../../../components/CustomToolTip';
import Button from '../../../../../components/Button';
import useModal from '../../../../../hooks/useModal';
import { ConfirmKickModal } from './ConfirmKickModal';
import { UserInfo } from '../../../types';

interface KickMemberModalProps {
  projectId: number;
  memberInfo: ProjectMember[];
  userInfo: UserInfo;
  popHandler: () => void;
}

export const KickMemberModal = ({
  projectId,
  memberInfo,
  userInfo,
  popHandler,
}: KickMemberModalProps) => {
  const modal = useModal();

  const kickHandler = (member: ProjectMember) => {
    modal.push({
      children: <ConfirmKickModal projectId={projectId} member={member} />,
    });
  };

  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      {/* 타이틀 */}
      <Flexbox justifyContents="between" alignItems="center">
        <Typography size={1.25} weight="600">
          팀원 관리
        </Typography>
        <Icon
          color="light"
          background="none"
          size={0.875}
          onClick={() => popHandler()}
        >
          <HiXMark />
        </Icon>
      </Flexbox>

      {/* 팀원 목록 */}
      <Flexbox
        flexDirections="col"
        style={{ rowGap: '1rem', padding: '0 1rem' }}
      >
        {memberInfo.map((member) => (
          <>
            {member.email !== userInfo.email && (
              <Flexbox justifyContents="between" alignItems="center">
                {/* 프로필 */}
                <Flexbox alignItems="center" style={{ columnGap: '1rem' }}>
                  <CustomTooltip title={member.email}>
                    <div>
                      <Icon color="primary">
                        <HiUser />
                      </Icon>
                    </div>
                  </CustomTooltip>
                  <Typography size={0.875} weight="700">
                    {member.nickname}
                  </Typography>
                </Flexbox>

                {/* 추방 버튼 */}
                <Button color="delete" onClick={() => kickHandler(member)}>
                  <Typography size={0.8125} weight="600">
                    추방
                  </Typography>
                </Button>
              </Flexbox>
            )}
          </>
        ))}
      </Flexbox>
    </Flexbox>
  );
};
