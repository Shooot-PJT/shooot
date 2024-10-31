import React, { ReactNode } from 'react';
import Flexbox from '../../Flexbox';
import { useNavBarStore } from '../../../stores/navbarStore';
import Icon from '../../Icon';
import Typography from '../../Typography';
import Button from '../../Button';
import usePopup from '../../../hooks/usePopup';
import { useQuery } from '@tanstack/react-query';
import { getMyProjectList } from '../../../pages/MyProject/apis';
import { useResize } from '../../../hooks/useResize';

interface MenuItemProps extends React.ComponentProps<'div'> {
  menu: string;
  icon: ReactNode;
  idx: number;
}

const MenuItems = ({ menu, icon, idx }: MenuItemProps) => {
  const { isLarge } = useResize();
  const navbarStore = useNavBarStore();

  const popup = usePopup();
  const projectsListQuery = useQuery({
    queryKey: ['project-list'],
    queryFn: async () => await getMyProjectList(),
  });

  const handler = (idx: number) => {
    if (idx === 2 || projectsListQuery.data?.data.length) {
      navbarStore.setMenu(idx);
    } else {
      popup.push({
        title: '프로젝트 없음',
        children: <Typography>속한 프로젝트가 없습니다.</Typography>,
      });
    }
  };

  return (
    <Button
      color={navbarStore.menu === idx ? 'primary' : 'none'}
      paddingX={0}
      paddingY={0}
      fullWidth
    >
      <Flexbox
        alignItems="center"
        style={{
          columnGap: '1rem',
          borderRadius: '0.5rem',
          minWidth: '90%',
          padding: '0.75rem 2rem',
          cursor: 'pointer',
        }}
        onClick={() => handler(idx)}
      >
        <Icon
          color={navbarStore.menu === idx ? 'light' : 'disabled'}
          size={isLarge ? 2 : 1.5}
          background="none"
        >
          {icon}
        </Icon>
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
