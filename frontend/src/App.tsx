import './App.css';

// import { API } from './pages/APIDocs/components/API/API';
import darkTheme from './styles/darkTheme.css';
import NavBar from './components/NavBar';
import { useNavBarStore } from './stores/navbarStore';
import { Desktop } from './components/Layout/Desktop';
import { Mobile } from './components/Layout/Mobile';
import { useEffect } from 'react';
import { APIDocs } from './pages/APIDocs';

function App() {
  const navbarStore = useNavBarStore();

  useEffect(() => {
    console.log(navbarStore.project);
  }, [navbarStore.project]);

  useEffect(() => {
    console.log(navbarStore.menu);
  }, [navbarStore.menu]);

  return (
    <div className={darkTheme} style={{ width: '100%', height: '100%' }}>
      <div
        className="TEMPORAL-LAYOUT"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.25rem',
        }}
      >
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
    </div>
  );
}

export default App;
