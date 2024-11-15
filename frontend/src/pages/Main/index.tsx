import { useNavBarStore } from '../../stores/navbarStore';
import { APIDocs } from '../APIDocs';
import { MyProject } from '../MyProject';
import { ServerTest } from '../ServerTest';
import { Layout } from './components/Layout';

export const Main = () => {
  const navbarStore = useNavBarStore();

  return (
    <Layout>
      {navbarStore.menu === 0 && <APIDocs />}
      {navbarStore.menu === 1 && <ServerTest />}
      {navbarStore.menu === 2 && <MyProject />}
    </Layout>
  );
};
