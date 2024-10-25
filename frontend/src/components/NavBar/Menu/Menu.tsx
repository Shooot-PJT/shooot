import React, { ReactNode } from 'react';
import { HiDocumentCheck, HiServerStack, HiUserCircle } from 'react-icons/hi2';
import Flexbox from '../../Flexbox';
import { Mobile } from '../../Layout/Mobile';
import { Desktop } from '../../Layout/Desktop';
import MenuItems from './MenuItems';

const menus: string[] = ['API 문서', '서버 테스트 실행기', '마이페이지'];
const icons: ReactNode[] = [
  <HiDocumentCheck />,
  <HiServerStack />,
  <HiUserCircle />,
];

const Menu = () => {
  return (
    <>
      <Desktop>
        <Flexbox
          flexDirections="col"
          alignItems="start"
          style={{
            rowGap: '1rem',
            padding: '1rem',
          }}
        >
          {menus.map((menu: string, idx: number) => (
            <MenuItems key={idx} menu={menu} icon={icons[idx]} idx={idx} />
          ))}
        </Flexbox>
      </Desktop>
      <Mobile>
        <Flexbox
          flexDirections="col"
          alignItems="start"
          style={{ rowGap: '0.5rem' }}
        >
          {menus.map((menu: string, idx: number) => (
            <MenuItems key={idx} menu={menu} icon={icons[idx]} idx={idx} />
          ))}
        </Flexbox>
      </Mobile>
    </>
  );
};

export default Menu;
