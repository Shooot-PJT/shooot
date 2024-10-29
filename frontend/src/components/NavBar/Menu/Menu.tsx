import { ReactNode } from 'react';
import { HiDocumentCheck, HiServerStack, HiUserCircle } from 'react-icons/hi2';
import Flexbox from '../../Flexbox';
import MenuItems from './MenuItems';
import * as global from '../../../styles/globalStyle.css';

const menus: string[] = ['API 문서', '서버 테스트 실행기', '마이페이지'];
const icons: ReactNode[] = [
  <HiDocumentCheck />,
  <HiServerStack />,
  <HiUserCircle />,
];

const Menu = () => {
  return (
    <>
      <div className={global.desktopL} style={{ width: '100%' }}>
        <Flexbox
          flexDirections="col"
          justifyContents="center"
          style={{
            rowGap: '1rem',
            padding: '1rem',
          }}
        >
          {menus.map((menu: string, idx: number) => (
            <MenuItems key={idx} menu={menu} icon={icons[idx]} idx={idx} />
          ))}
        </Flexbox>
      </div>
      <div className={global.desktopS} style={{ width: '100%' }}>
        <Flexbox
          flexDirections="col"
          justifyContents="center"
          style={{ rowGap: '0.5rem' }}
        >
          {menus.map((menu: string, idx: number) => (
            <MenuItems key={idx} menu={menu} icon={icons[idx]} idx={idx} />
          ))}
        </Flexbox>
      </div>
    </>
  );
};

export default Menu;
