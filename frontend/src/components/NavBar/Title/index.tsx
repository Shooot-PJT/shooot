import Flexbox from '../../Flexbox';
import Icon from '../../Icon';
import {
  HiRocketLaunch,
  HiBars3,
  HiArrowRightStartOnRectangle,
} from 'react-icons/hi2';
import Typography from '../../Typography';
import { useNavBarStore } from '../../../stores/navbarStore';
import { useResize } from '../../../hooks/useResize';
import { CustomTooltip } from '../../CustomToolTip';

interface TitleProps {
  handleLogout: () => Promise<void>;
}

export const Title = ({ handleLogout }: TitleProps) => {
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
          <Flexbox style={{ columnGap: '1rem' }}>
            <CustomTooltip title="로그아웃">
              <div>
                <Icon
                  size={1.5}
                  background="none"
                  color="light"
                  onClick={async () => await handleLogout()}
                >
                  <HiArrowRightStartOnRectangle />
                </Icon>
              </div>
            </CustomTooltip>
            <CustomTooltip
              title={navbarStore.isOpen ? '메뉴 접기' : '메뉴 펼치기'}
            >
              <div>
                <Icon
                  size={1.5}
                  background="none"
                  color="light"
                  onClick={() => navbarStore.setIsOpen(!navbarStore.isOpen)}
                >
                  <HiBars3 />
                </Icon>
              </div>
            </CustomTooltip>
          </Flexbox>
        </Flexbox>
      )}
    </>
  );
};
