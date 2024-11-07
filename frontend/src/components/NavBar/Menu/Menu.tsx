import { ReactNode } from 'react';
import { HiDocumentCheck, HiServerStack, HiUserCircle } from 'react-icons/hi2';
import Flexbox from '../../Flexbox';
import MenuItems from './MenuItems';
import { useResize } from '../../../hooks/useResize';

const menus: string[] = ['API 문서', '서버 테스트 실행기', '내 프로젝트'];
const icons: ReactNode[] = [
  <HiDocumentCheck />,
  <HiServerStack />,
  <HiUserCircle />,
];

const Menu = () => {
  const { isLarge } = useResize();
  return (
    <div style={{ width: isLarge ? '100%' : '50%' }}>
      <Flexbox
        flexDirections="col"
        justifyContents="center"
        style={{
          width: '100%',
          rowGap: isLarge ? '1rem' : '0.5rem',
          boxSizing: 'border-box',
          padding: isLarge ? '1rem' : '0',
        }}
      >
        {menus.map((menu: string, idx: number) => (
          <MenuItems key={idx} menu={menu} icon={icons[idx]} idx={idx} />
        ))}
      </Flexbox>
    </div>
  );
};

export default Menu;
