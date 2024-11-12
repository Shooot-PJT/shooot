import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Flexbox from '../../components/Flexbox';
import { useNavBarStore } from '../../stores/navbarStore';
import { getJarFiles } from './apis/JarFileApi';
import { Console } from './components/Console/Console';
import { ProjectTable } from './components/ProjectTable/ProjectTable';
import { RecentTest } from './components/RecentTest/RecentTest';
import { convertJarFileIdList } from './utils';
import { GetJarFilesResponse } from './types';

export const ServerTest = () => {
  const [renderKey, setRenderKey] = useState<number>(0);
  const [logs, setlogs] = useState<string[]>([]);
  const { project } = useNavBarStore();

  const handleRender = () => {
    setRenderKey(renderKey + 1);
  };

  const { data: jarFiles = [] } = useQuery({
    queryKey: ['jarFiles', project, renderKey],
    queryFn: async () => {
      const response = await getJarFiles({ projectId: project });
      return response?.data ?? [];
    },
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    setlogs([]);

    const eventSource = new EventSource(
      `https://shooot.co.kr/api/sse/project/${project}/connection`,
      {
        withCredentials: true,
      },
    );

    eventSource.onmessage = (event) => {
      console.log('Received data:', event.data);

      try {
        const parsedData = JSON.parse(event.data);
        console.log('Parsed Data:', parsedData);
      } catch (e) {
        console.error('Failed to parse data:', e);
      }
    };

    eventSource.addEventListener('project_log', (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setlogs((prevLogs) => [...prevLogs, parsedData.log]);
      } catch (e) {
        console.error('Failed to parse project_log event data:', e);
      }
    });

    return () => {
      eventSource.close();
    };
  }, [project]);

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
          />
        </div>
        <div
          style={{
            width: '50%',
            paddingTop: '0.5rem',
          }}
        >
          <Console data={logs} />
        </div>
      </div>
      <div>
        <RecentTest />
      </div>
    </Flexbox>
  );
};
