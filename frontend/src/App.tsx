import './App.css';
import Typography from './components/Typography';
// import { API } from './pages/APIDocs/components/API/API';
import darkTheme from './styles/darkTheme.css';

function App() {
  return (
    <div className={darkTheme}>
      {/* <API>
        <API.Header
          title={'특별한 계란 목록 가져오기'}
          managerName={''}
          method={'GET'}
          needAuthorize={false}
          endPoint={''}
        />
      </API> */}
      <Typography color="secondary" weight="700" size={1.5}>
        hello
      </Typography>
    </div>
  );
}

export default App;
