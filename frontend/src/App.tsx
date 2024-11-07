import './App.css';
import { Route, Routes } from 'react-router-dom';
import { APIDocs } from './pages/APIDocs';
import { Signup } from './pages/Signup';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Tmp } from './pages/Tmp';
import darkTheme from './styles/darkTheme.css';
import { ServerTest } from './pages/ServerTest';
import { Main } from './pages/Main';

function App() {
  return (
    <div className={darkTheme}>
      <Routes>
        <Route path="/temp" element={<Tmp />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Main />} />
        <Route
          path="/docs"
          element={
            <Layout>
              <APIDocs />
            </Layout>
          }
        />
        <Route
          path="/test"
          element={
            <Layout>
              <ServerTest />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
