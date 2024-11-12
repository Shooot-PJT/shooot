import React, { ReactNode } from 'react';
import * as style from './NavBar.css';
import theme from '../../../../styles/theme.css';
import { Title } from './Title';
import { Project } from './Project';
import Menu from './Menu/Menu';
import { useNavBarStore } from '../../../../stores/navbarStore';

interface NavBarProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  bg?: 100 | 200 | 300 | string;
}

const NavBar = ({ children, bg = 100 }: NavBarProps) => {
  const navbarStore = useNavBarStore();

  return (
    <div
      className={`${style.container} ${navbarStore.isOpen ? style.scrolldown : ''}`}
      style={{
        backgroundColor:
          bg === 100 || bg === 200 || bg === 300
            ? theme.color.background[bg]
            : bg,
      }}
    >
      {children}
    </div>
  );
};

NavBar.Title = Title;
NavBar.Project = Project;
NavBar.Menu = Menu;

export default NavBar;
