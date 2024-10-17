import './App.css';
import Typography from './components/Typography';
import darkTheme from './styles/darkTheme.css';

function App() {
  return (
    <div className={darkTheme}>
      <Typography color="secondary" weight="700" size={1.5}>
        hello
      </Typography>
    </div>
  );
}

export default App;
