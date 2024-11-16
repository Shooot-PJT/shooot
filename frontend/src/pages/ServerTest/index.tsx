import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Flexbox from '../../components/Flexbox';
import { useNavBarStore } from '../../stores/navbarStore';
import { getJarFiles } from './apis/JarFileApi';
import { Console } from './components/Console/Console';
import { ProjectTable } from './components/ProjectTable/ProjectTable';
import { RecentTest } from './components/RecentTest/RecentTest';
import { convertJarFileIdList } from './utils';
import { GetJarFilesResponse } from './types';
import { useProjectSSE } from './hooks/useProjectSSE';

export const ServerTest = () => {
  const [renderKey, setRenderKey] = useState<number>(0);
  const { project } = useNavBarStore();

  const { projectStatus, logs, deployedFileId, setLogs, setProjectStatus } =
    useProjectSSE({
      project,
    });

  const handleRender = () => {
    setRenderKey(renderKey + 1);
  };

  const { data: jarFiles = [] } = useQuery({
    queryKey: ['jarFiles', project, renderKey, projectStatus],
    queryFn: async () => {
      const response = await getJarFiles({ projectId: project });
      return response?.data ?? [];
    },
    staleTime: 60 * 1000,
  });

  const handleInitializeDeploy = () => {
    setLogs((prev) => [...prev, '빌드가 중단되었습니다.']);
    setProjectStatus('DONE');
    handleRender();
  };

  const handleOnBuild = () => {
    setLogs(['빌드 시도 중입니다... (10초 가량 소요됩니다)']);
    setProjectStatus('RUN');
    handleRender();
  };

  return (
    <Flexbox
      flexDirections="col"
      style={{
        gap: '3rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          marginTop: '1rem',
          gap: '1rem',
        }}
      >
        <div style={{ width: '50%' }}>
          <ProjectTable
            jarFiles={jarFiles as GetJarFilesResponse}
            idList={convertJarFileIdList(jarFiles)}
            handleRender={handleRender}
            handleOnBuild={handleOnBuild}
          />
        </div>
        <div
          style={{
            width: '50%',
          }}
        >
          <Console
            data={logs}
            state={projectStatus}
            deployedFileId={deployedFileId}
            handleInitialDeploy={handleInitializeDeploy}
          />
        </div>
      </div>
      <div>
        <RecentTest />
      </div>
    </Flexbox>
  );
};
