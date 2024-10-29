import { useLogin } from './hooks/useLogin';
import { Result } from './components/Result';
import { Form } from './components/Form';
import { Logo } from './components/Logo';
import Flexbox from '../../components/Flexbox';

export const Login = () => {
  const login = useLogin();

  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      alignItems="center"
      style={{
        width: '100%',
        height: '100vh',
        rowGap: '2rem',
      }}
    >
      <Logo />
      <Form {...login} />
      <Result {...login} />
    </Flexbox>
  );
};
