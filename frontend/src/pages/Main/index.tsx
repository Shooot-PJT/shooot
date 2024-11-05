import { Layout } from '../../components/Layout';
import { useNavBarStore } from '../../stores/navbarStore';
import { APIDocs } from '../APIDocs';
import { MyProject } from '../MyProject';

export const Main = () => {
  const navbarStore = useNavBarStore();

  return (
    <Layout>
      {navbarStore.menu === 0 && <APIDocs />}
      {navbarStore.menu === 1 && <>test</>}
      {navbarStore.menu === 2 && <MyProject />}
    </Layout>
  );
};
