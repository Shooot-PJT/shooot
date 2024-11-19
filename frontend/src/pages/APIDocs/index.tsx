import Flexbox from '../../components/Flexbox';
import { AuthorizeButton } from './components/AuthorizeButton/AuthorizeButton';
import { Domain } from './components/Domain/Domain';
import { AddDomainButton } from './components/Domain/DomainButtons/DomainButtons';
import { useGetDomainList } from './reactQueries/domain';
import { useNavBarStore } from '../../stores/navbarStore';
import { useEffect } from 'react';
import Typography from '../../components/Typography';

export const APIDocs = () => {
  const currentProjectId = useNavBarStore((state) => state.project);

  const {
    data: domainList,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetDomainList({
    projectId: Number(currentProjectId),
  });

  useEffect(() => {
    refetch();
  }, [currentProjectId, refetch]);

  if (isLoading) {
    return (
      <Flexbox
        flexDirections="col"
        style={{ padding: '2rem', alignItems: 'center' }}
      >
        <Typography>Loading...</Typography>
      </Flexbox>
    );
  }

  if (isError) {
    return (
      <Flexbox
        flexDirections="col"
        style={{ padding: '2rem', alignItems: 'center' }}
      >
        <Typography color="originalRed">
          {error.message || '도메인 목록을 불러오는 중 오류가 발생했습니다.'}
        </Typography>
      </Flexbox>
    );
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
        <AuthorizeButton />
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
