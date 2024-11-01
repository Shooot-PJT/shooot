import { HiUser } from 'react-icons/hi2';
import { CustomTooltip } from '../CustomToolTip';
import Flexbox from '../Flexbox';
import Icon from '../Icon';
import Typography from '../Typography';
import { ProjectInfo, ProjectMember } from '../../pages/MyProject/types';
import { IconColor } from '../Icon/Icon.types';

interface ProjectInfoProps {
  projectInfo?: ProjectInfo;
  memberInfo?: ProjectMember[];
}

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

export const ProjectContents = ({
  projectInfo,
  memberInfo,
}: ProjectInfoProps) => {
  return (
    <>
      <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
        <Flexbox alignItems="center" style={{ columnGap: '0.25rem' }}>
          <Typography color="secondary" size={1.25} weight="700">
            {projectInfo?.name}
          </Typography>
          <Typography color="light" weight="700" size={0.875}>
            {projectInfo?.englishName}
          </Typography>
        </Flexbox>
        <Flexbox style={{ columnGap: '0.5rem' }}>
          {memberInfo?.length ? (
            <>
              {memberInfo?.map((member) => (
                <CustomTooltip title={member.nickname}>
                  <div>
                    <Icon
                      key={member.email}
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
      <Flexbox style={{ columnGap: '0.5rem' }}>
        <Typography color="disabled" size={0.875}>
          <a>팀원 초대</a>
        </Typography>
        <Typography color="disabled" size={0.875}>
          <a>팀원 추방</a>
        </Typography>
        <Typography color="disabled" size={0.875}>
          <a>정보 수정</a>
        </Typography>
      </Flexbox>
    </>
  );
};
