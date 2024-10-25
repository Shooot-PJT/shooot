import React from 'react';
import Flexbox from '../../Flexbox';
import Icon from '../../Icon';
import { HiRocketLaunch, HiChevronLeft, HiBars3 } from 'react-icons/hi2';
import Typography from '../../Typography';
import { Desktop } from '../../Layout/Desktop';
import { Mobile } from '../../Layout/Mobile';
import { useNavBarStore } from '../../../stores/navbarStore';

interface TitleProps {
  title?: string;
}

export const Title = ({ title = '타이틀을 입력해주세요' }: TitleProps) => {
  const navbarStore = useNavBarStore();

  return (
    <>
      <Desktop>
        <Flexbox style={{ columnGap: '1rem', padding: '4rem 0' }}>
          <Icon background="none" size={3}>
            <HiRocketLaunch />
          </Icon>
          <Typography size={1.5} weight="700">
            SHOOOT!
          </Typography>
        </Flexbox>
      </Desktop>
      <Mobile>
        <Flexbox justifyContents="between">
          <Flexbox style={{ columnGap: '1rem' }}>
            <Icon background="none" color="light">
              <HiChevronLeft />
            </Icon>
            <Typography size={0.875} weight="500">
              {title}
            </Typography>
          </Flexbox>
          <Icon
            background="none"
            color="light"
            onClick={() => navbarStore.setIsOpen(!navbarStore.isOpen)}
          >
            <HiBars3 />
          </Icon>
        </Flexbox>
      </Mobile>
    </>
  );
};
