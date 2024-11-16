import { HiUser, HiXMark } from 'react-icons/hi2';
import Flexbox from '../../../../../components/Flexbox';
import Typography from '../../../../../components/Typography';
import { ProjectMember } from '../../../../MyProject/types';
import Icon from '../../../../../components/Icon';
import { CustomTooltip } from '../../../../../components/CustomToolTip';
import Button from '../../../../../components/Button';
import useModal from '../../../../../hooks/useModal';
import { ConfirmKickModal } from './ConfirmKickModal';
import { useNavBarStore } from '../../../../../stores/navbarStore';
import { useReadMembersByProjectId, useReadUserInfo } from '../../../hooks';
import { IconColor } from '../../../../../components/Icon/Icon.types';

export const KickMemberModal = () => {
  const modal = useModal();
  const navbarStore = useNavBarStore();
  const { user } = useReadUserInfo();
  const { members, isLoading } = useReadMembersByProjectId(navbarStore.project);

  const kickHandler = (member: ProjectMember) => {
    modal.push({
      children: <ConfirmKickModal member={member} />,
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
          onClick={() => modal.pop()}
        >
          <HiXMark />
        </Icon>
      </Flexbox>

      {/* 팀원 목록 */}
      <Flexbox
        flexDirections="col"
        style={{ rowGap: '1rem', padding: '0 1rem' }}
      >
        {isLoading ? (
          <Typography>로딩중</Typography>
        ) : (
          <>
            {members?.data.map((member) => (
              <>
                {member.email !== user?.data.email && (
                  <Flexbox justifyContents="between" alignItems="center">
                    {/* 프로필 */}
                    <Flexbox alignItems="center" style={{ columnGap: '1rem' }}>
                      <CustomTooltip title={member.email}>
                        <div>
                          <Icon color={member.color.toLowerCase() as IconColor}>
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
          </>
        )}
      </Flexbox>
    </Flexbox>
  );
};
