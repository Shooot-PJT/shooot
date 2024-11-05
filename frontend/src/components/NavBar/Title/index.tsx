import Flexbox from '../../Flexbox';
import Icon from '../../Icon';
import { HiRocketLaunch, HiBars3 } from 'react-icons/hi2';
import Typography from '../../Typography';
import { useNavBarStore } from '../../../stores/navbarStore';
import { useResize } from '../../../hooks/useResize';

export const Title = () => {
  const navbarStore = useNavBarStore();
  const { isLarge } = useResize();

  return (
    <>
      {isLarge ? (
        <Flexbox
          justifyContents="center"
          alignItems="center"
          style={{ columnGap: '1rem', padding: '4rem 0' }}
        >
          <Icon background="none" size={3}>
            <HiRocketLaunch />
          </Icon>
          <Typography size={1.5} weight="700">
            SHOOOT!
          </Typography>
        </Flexbox>
      ) : (
        <Flexbox justifyContents="between">
          <Flexbox justifyContents="center" style={{ columnGap: '1rem' }}>
            <Icon background="none" size={1.5}>
              <HiRocketLaunch />
            </Icon>
            <Typography size={1.5} weight="700">
              SHOOOT!
            </Typography>
          </Flexbox>
          <Icon
            size={1.5}
            background="none"
            color="light"
            onClick={() => navbarStore.setIsOpen(!navbarStore.isOpen)}
          >
            <HiBars3 />
          </Icon>
        </Flexbox>
      )}
    </>
  );
};
