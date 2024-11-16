import { HiUser } from 'react-icons/hi2';
import { useNavBarStore } from '../../../../stores/navbarStore';
import {
  useNavBar,
  useReadMembersByProjectId,
  useReadProjectByProjectId,
} from '../../hooks';
import { IconColor } from '../../../../components/Icon/Icon.types';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import { CustomTooltip } from '../../../../components/CustomToolTip';
import Icon from '../../../../components/Icon';
const colors: IconColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'disabled',
  'get',
  'post',
  'put',
  'patch',
  'delete',
];

export const ProjectContents = () => {
  const navbarStore = useNavBarStore();
  const project = useReadProjectByProjectId(navbarStore.project);
  const members = useReadMembersByProjectId(navbarStore.project);
  const {
    inviteMembersModalHandler,
    kickMemberModalHandler,
    editProjectModalHandler,
    removeProjectModalHandler,
  } = useNavBar();

  return (
    <>
      <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
        <Flexbox alignItems="center" style={{ columnGap: '0.25rem' }}>
          {!project.isLoading && (
            <>
              <Typography color="secondary" size={1.25} weight="700">
                {project.project?.data.name}
              </Typography>
              <Typography color="light" weight="700" size={0.875}>
                {project.project?.data.englishName}
              </Typography>
            </>
          )}
        </Flexbox>
        <Flexbox style={{ columnGap: '0.5rem' }}>
          {members.members?.data.length ? (
            <>
              {members.members?.data.map((member, idx: number) => (
                <CustomTooltip key={idx} title={member.nickname}>
                  <div>
                    <Icon
                      size={1}
                      rounded={999}
                      color={colors[Math.floor(Math.random() * 8)]}
                    >
                      <HiUser />
                    </Icon>
                  </div>
                </CustomTooltip>
              ))}
            </>
          ) : (
            <Typography size={0.875} weight="600">
              팀원을 초대해보세요!
            </Typography>
          )}
        </Flexbox>
      </Flexbox>
      {project.project?.data.isOwner && (
        <Flexbox style={{ columnGap: '0.5rem' }}>
          <Typography
            color="disabled"
            size={0.875}
            onClick={inviteMembersModalHandler}
          >
            <a>팀원 초대</a>
          </Typography>
          <Typography
            color="disabled"
            size={0.875}
            onClick={kickMemberModalHandler}
          >
            <a>팀원 추방</a>
          </Typography>
          <Typography
            color="disabled"
            size={0.875}
            onClick={editProjectModalHandler}
          >
            <a>정보 수정</a>
          </Typography>
          <Typography
            color="disabled"
            size={0.875}
            onClick={removeProjectModalHandler}
          >
            <a>프로젝트 삭제</a>
          </Typography>
        </Flexbox>
      )}
    </>
  );
};
