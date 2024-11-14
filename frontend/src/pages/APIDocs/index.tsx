import Flexbox from '../../components/Flexbox';
import { AuthorizeButton } from './components/AuthorizeButton/AuthorizeButton';
import { Domain } from './components/Domain/Domain';
import { AddDomainButton } from './components/Domain/DomainButtons/DomainButtons';
import { useGetDomainList } from './reactQueries/domain';
import { useNavBarStore } from '../../stores/navbarStore';
import { useEffect } from 'react';

export const APIDocs = () => {
  const currentProjectId = useNavBarStore((state) => state.project);

  const {
    data: domainList,
    isLoading,
    refetch,
  } = useGetDomainList({
    projectId: Number(currentProjectId),
  });

  useEffect(() => {
    refetch();
  }, [currentProjectId, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flexbox
      flexDirections="col"
      style={{
        gap: '1rem',
        padding: '2rem',
      }}
    >
      <Flexbox
        flexDirections="row"
        justifyContents="between"
        style={{ gap: '1rem', width: '100%' }}
      >
        <AuthorizeButton isAuthorized={true} />
        <AddDomainButton />
      </Flexbox>
      {domainList?.map((domainInfo) => (
        <Domain key={domainInfo.domainId} domainInfo={domainInfo}>
          <Domain.Header />
          <Domain.Body />
        </Domain>
      ))}
    </Flexbox>
  );
};
