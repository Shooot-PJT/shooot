import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyProjectList } from './apis';
import * as style from './MyProject.css';
import { InfoBox } from './components/InfoBox/InfoBox';

export const MyProjectFetch = () => {
  const projectsListQuery = useSuspenseQuery({
    queryKey: ['project-list'],
    queryFn: async () => await getMyProjectList(),
    staleTime: 3000,
  });

  if (projectsListQuery.error && !projectsListQuery.isFetching) {
    throw projectsListQuery.error;
  }

  return (
    <div className={style.grid}>
      <InfoBox type="add" />
      {projectsListQuery.data.data.map((info) => (
        <InfoBox key={info.projectId} info={info} />
      ))}
    </div>
  );
};
