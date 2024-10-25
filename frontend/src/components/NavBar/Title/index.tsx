import React from 'react';
import Flexbox from '../../Flexbox';
import Icon from '../../Icon';
import { HiRocketLaunch, HiBars3 } from 'react-icons/hi2';
import Typography from '../../Typography';
import { useNavBarStore } from '../../../stores/navbarStore';
import * as style from '../NavBar.css';

export const Title = () => {
  const navbarStore = useNavBarStore();

  return (
    <>
      <div className={style.desktopL}>
        <Flexbox style={{ columnGap: '1rem', padding: '4rem 0' }}>
          <Icon background="none" size={3}>
            <HiRocketLaunch />
          </Icon>
          <Typography size={1.5} weight="700">
            SHOOOT!
          </Typography>
        </Flexbox>
      </div>
      <div className={style.desktopS}>
        <Flexbox justifyContents="between">
          <Flexbox style={{ columnGap: '1rem' }}>
            <Icon background="none" size={2}>
              <HiRocketLaunch />
            </Icon>
            <Typography size={1.5} weight="700">
              SHOOOT!
            </Typography>
          </Flexbox>
          <Icon
            size={2}
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
