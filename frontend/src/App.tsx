import './App.css';
import useModal from './hooks/useModal';
import ModalPortal from './hooks/useModal/ModalPortal';
import darkTheme from './styles/darkTheme.css';
import NavBar from './components/NavBar';
import { useNavBarStore } from './stores/navbarStore';
import { Desktop } from './components/Layout/Desktop';
import { Mobile } from './components/Layout/Mobile';
import { useEffect } from 'react';

function App() {
  const modal = useModal();
  const handleModal = () => {
    modal.push({
      children: (
        <>
          <button onClick={modal.pop}>하이용</button>
          <button onClick={handleModal}>모달추가</button>
        </>
      ),
    });
  };
  const navbarStore = useNavBarStore();

  useEffect(() => {
    console.log(navbarStore.project);
  }, [navbarStore.project]);

  useEffect(() => {
    console.log(navbarStore.menu);
  }, [navbarStore.menu]);

  return (
    <div className={darkTheme} style={{ width: '100%', height: '100%' }}>
      <ModalPortal />

      <NavBar>
        <Desktop>
          <NavBar.Title title="제목" />
          <NavBar.Project project={[0, 1, 2]} />
          <NavBar.Menu />
        </Desktop>
        <Mobile>
          <NavBar.Title title="제목" />
          {navbarStore.isOpen && (
            <>
              <NavBar.Project project={[0, 1, 2]} />
              <NavBar.Menu />
            </>
          )}
        </Mobile>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleModal();
          }}
        >
          모달추가
        </button>
      </NavBar>
    </div>
  );
}

export default App;
