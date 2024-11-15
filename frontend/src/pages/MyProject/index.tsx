import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { MyProjectFetch } from './MyProjectFetch';

export const MyProject = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <MyProjectFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
