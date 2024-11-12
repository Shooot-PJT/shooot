import { useQuery } from '@tanstack/react-query';
import { useNavBarStore } from '../../stores/navbarStore';
import { Console } from './components/Console/Console';
import { ProjectTable } from './components/ProjectTable/ProjectTable';
import { getJarFiles } from './apis/JarFileApi';
import { convertDataTable, convertJarFileIdList } from './utils';
import { useEffect, useState } from 'react';
import { RecentTest } from './components/RecentTest/RecentTest';
import Flexbox from '../../components/Flexbox';

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
      // event.data에 서버에서 전송된 데이터가 포함되어 있음
      console.log('Received data:', event.data);

      // JSON 데이터일 경우 파싱
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
        setlogs((prevLogs) => [...prevLogs, parsedData.log]); // 이전 상태를 기반으로 상태 업데이트
      } catch (e) {
        console.error('Failed to parse project_log event data:', e);
      }
    });

    return () => {
      eventSource.close(); // 컴포넌트 언마운트 시 연결 종료
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
            tableData={convertDataTable(jarFiles)}
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
