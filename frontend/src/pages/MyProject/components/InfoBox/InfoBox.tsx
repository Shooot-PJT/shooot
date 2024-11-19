import { HiPlus, HiUser } from 'react-icons/hi2';
import Flexbox from '../../../../components/Flexbox';
import { BoxType, ProjectInfo } from '../../types';
import Icon from '../../../../components/Icon';
import Typography from '../../../../components/Typography';
import theme from '../../../../styles/theme.css';
import * as style from '../../MyProject.css';
import { useNavBarStore } from '../../../../stores/navbarStore';
import { useNavBar } from '../../../Main/hooks/customs/useNavBar';

interface InfoBoxProps {
  type?: BoxType;
  info?: ProjectInfo;
}

export const InfoBox = ({ type = 'info', info }: InfoBoxProps) => {
  const navbarStore = useNavBarStore();
  const { addProjectModalHandler } = useNavBar();

  const handler = () => {
    navbarStore.setMenu(0);
    navbarStore.setProject(info!.projectId);
  };

  return (
    <Flexbox
      flexDirections="col"
      style={{
        width: '20rem',
        height: '15rem',
        boxSizing: 'border-box',
        padding: '1rem',
        rowGap: '1rem',
        borderRadius: '1rem',
        backgroundColor: theme.color.background['300'],
        cursor: 'pointer',
      }}
    >
      {type === 'add' ? (
        <Flexbox
          flexDirections="col"
          justifyContents="center"
          alignItems="center"
          style={{
            width: '100%',
            height: '100%',
            rowGap: '1rem',
          }}
          onClick={addProjectModalHandler}
        >
          <Icon size={3} color="light" background="none">
            <HiPlus />
          </Icon>
          <Typography>프로젝트 생성하기</Typography>
        </Flexbox>
      ) : (
        <Flexbox
          flexDirections="col"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            rowGap: '1rem',
          }}
          onClick={handler}
        >
          <Flexbox
            alignItems="center"
            style={{ width: '100%', columnGap: '1rem' }}
          >
            <img src={info?.logoImageUrl} className={style.logo} />
            <Flexbox flexDirections="col">
              <Typography weight="600">{info?.name}</Typography>
              <Typography weight="600" size={0.875} color="disabled">
                {info?.englishName}
              </Typography>
            </Flexbox>
          </Flexbox>
          <div className={style.textarea}>
            <Typography size={0.875} weight="600">
              {info?.memo}
            </Typography>
          </div>
          <Flexbox
            alignItems="center"
            style={{
              position: 'absolute',
              bottom: '0',
              columnGap: '0.5rem',
            }}
          >
            <Typography
              size={0.875}
              color={info?.isOwner ? 'secondary' : 'tertiary'}
              weight="600"
            >
              {info?.isOwner ? '팀장' : '팀원'}
            </Typography>
            <Typography size={0.875} color="disabled">
              /
            </Typography>
            <Flexbox alignItems="center" style={{ columnGap: '0.25rem' }}>
              <Icon color="disabled" background="none">
                <HiUser />
              </Icon>
              <Typography size={0.875} color="disabled" weight="600">
                {info?.userCount}명
              </Typography>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      )}
    </Flexbox>
  );
};
