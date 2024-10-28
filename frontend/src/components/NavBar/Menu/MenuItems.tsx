import React, { ReactNode } from 'react';
import Flexbox from '../../Flexbox';
import { useNavBarStore } from '../../../stores/navbarStore';
import Icon from '../../Icon';
import Typography from '../../Typography';
import Button from '../../Button';
import * as global from '../../../styles/globalStyle.css';

interface MenuItemProps extends React.ComponentProps<'div'> {
  menu: string;
  icon: ReactNode;
  idx: number;
}

const MenuItems = ({ menu, icon, idx }: MenuItemProps) => {
  const navbarStore = useNavBarStore();

  return (
    <Button
      color={navbarStore.menu === idx ? 'primary' : 'none'}
      paddingX={0}
      paddingY={0}
      fullWidth
    >
      <Flexbox
        justifyContents="start"
        style={{
          columnGap: '1rem',
          borderRadius: '0.5rem',
          minWidth: '90%',
          padding: '0.75rem 2rem',
          cursor: 'pointer',
        }}
        onClick={() => navbarStore.setMenu(idx)}
      >
        <div className={global.desktopL}>
          <Icon
            color={navbarStore.menu === idx ? 'light' : 'disabled'}
            size={2}
            background="none"
          >
            {icon}
          </Icon>
        </div>
        <div className={global.desktopS}>
          <Icon
            color={navbarStore.menu === idx ? 'light' : 'disabled'}
            size={1.5}
            background="none"
          >
            {icon}
          </Icon>
        </div>
        <Typography
          color={navbarStore.menu === idx ? 'light' : 'disabled'}
          size={1}
          weight="700"
        >
          {menu}
        </Typography>
      </Flexbox>
    </Button>
  );
};

export default MenuItems;
