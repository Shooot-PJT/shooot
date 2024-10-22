import React, { ReactNode } from 'react';
import Flexbox from '../../Flexbox';
import { useNavBarStore } from '../../../stores/navbarStore';
import theme from '../../../styles/theme.css';
import * as style from './Menu.css';
import Icon from '../../Icon';
import Typography from '../../Typography';
import { Desktop } from '../../Layout/Desktop';
import { Mobile } from '../../Layout/Mobile';

interface MenuItemProps extends React.ComponentProps<'div'> {
  menu: string;
  icon: ReactNode;
  idx: number;
}

const MenuItems = ({ menu, icon, idx }: MenuItemProps) => {
  const navbarStore = useNavBarStore();

  return (
    <Flexbox
      bg={navbarStore.menu === idx ? theme.palette.primary.main : 100}
      columnGap={1}
      justifyContent="start"
      rounded={0.5}
      onClick={() => navbarStore.setMenu(idx)}
      className={style.btn}
    >
      <Desktop>
        <Icon
          color={navbarStore.menu === idx ? 'light' : 'disabled'}
          size={2}
          background="none"
        >
          {icon}
        </Icon>
      </Desktop>
      <Mobile>
        <Icon
          color={navbarStore.menu === idx ? 'light' : 'disabled'}
          size={1}
          background="none"
        >
          {icon}
        </Icon>
      </Mobile>
      <Desktop>
        <Typography
          color={navbarStore.menu === idx ? 'light' : 'disabled'}
          size={1}
          weight="700"
        >
          {menu}
        </Typography>
      </Desktop>
      <Mobile>
        <Typography
          color={navbarStore.menu === idx ? 'light' : 'disabled'}
          size={0.875}
          weight="700"
        >
          {menu}
        </Typography>
      </Mobile>
    </Flexbox>
  );
};

export default MenuItems;
