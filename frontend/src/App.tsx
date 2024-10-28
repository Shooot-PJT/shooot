import './App.css';
import { Route, Routes } from 'react-router-dom';
import darkTheme from './styles/darkTheme.css';
import { Tmp } from './pages/Tmp';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { APIDocs } from './pages/APIDocs';

function App() {
  return (
    <div className={darkTheme}>
      <Routes>
        <Route path="/" element={<Tmp />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/docs"
          element={
            <Layout>
              <APIDocs />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
