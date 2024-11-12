import { ProjectContents } from './ProjectContents';
import { UserContents } from './UserContents';
import { useNavBarStore } from '../../../../stores/navbarStore';
import Flexbox from '../../../../components/Flexbox';

export const Contents = () => {
  const { menu } = useNavBarStore();

  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      style={{
        width: '100%',
        rowGap: '3rem',
      }}
    >
      {menu !== 2 ? <ProjectContents /> : <UserContents />}
    </Flexbox>
  );
};
