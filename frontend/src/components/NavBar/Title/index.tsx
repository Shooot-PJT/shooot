import React from 'react';
import Flexbox from '../../Flexbox';
import Icon from '../../Icon';
import { HiRocketLaunch, HiBars3 } from 'react-icons/hi2';
import Typography from '../../Typography';
import { useNavBarStore } from '../../../stores/navbarStore';
import * as global from '../../../styles/globalStyle.css';

export const Title = () => {
  const navbarStore = useNavBarStore();

  return (
    <>
      <div className={global.desktopL}>
        <Flexbox style={{ columnGap: '1rem', padding: '4rem 0' }}>
          <Icon background="none" size={3}>
            <HiRocketLaunch />
          </Icon>
          <Typography size={1.5} weight="700">
            SHOOOT!
          </Typography>
        </Flexbox>
      </div>
      <div className={global.desktopS}>
        <Flexbox justifyContents="between">
          <Flexbox style={{ columnGap: '1rem' }}>
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
      </div>
    </>
  );
};
