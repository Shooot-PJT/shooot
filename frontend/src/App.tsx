import './App.css';

// import { API } from './pages/APIDocs/components/API/API';
import useModal from './hooks/useModal';
import ModalPortal from './hooks/useModal/ModalPortal';
import darkTheme from './styles/darkTheme.css';
import NavBar from './components/NavBar';
import { useNavBarStore } from './stores/navbarStore';
import { Desktop } from './components/Layout/Desktop';
import { Mobile } from './components/Layout/Mobile';
import { useEffect } from 'react';
import usePopup from './hooks/usePopup';
import PopupPortal from './hooks/usePopup/PopupPortal';
import Typography from './components/Typography';
import Button from './components/Button';
import { APIDocs } from './pages/APIDocs';

function App() {
  const modal = useModal();
  const popup = usePopup();
  const handlePopup = () => {
    popup.push({
      title: '팝업입니다',
      children: (
        <>
          <Typography>내용입니다</Typography>
        </>
      ),
    });
  };

  const handleModal = () => {
    modal.push({
      children: (
        <>
          <Typography>내용입니다</Typography>
          <button onClick={modal.pop}>닫기</button>
          <button onClick={handleModal}>모달추가</button>
        </>
      ),
      onClose: () => {
        console.log('바보');
      },
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
      <PopupPortal />
      <div style={{ position: 'fixed', left: '50%', bottom: '50%' }}>
        <Button
          onClick={handleModal}
          children="모달추가"
          rounded={0.5}
          paddingX={0.5}
          paddingY={0.25}
        />
        <Button
          onClick={handlePopup}
          children="팝업추가"
          rounded={0.5}
          paddingX={0.5}
          paddingY={0.25}
        />
      </div>
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
      </NavBar>
      <APIDocs />
    </div>
  );
}

export default App;
