import { useEffect, useRef, useState } from 'react';
import { ProjectStatus } from '../types';

interface UseProjectSSEProps {
  project: number;
  onLogReceived?: (log: string) => void;
  onStatusReceived?: (status: string) => void;
}

export const useProjectSSE = ({
  project,
  onLogReceived,
  onStatusReceived,
}: UseProjectSSEProps) => {
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('NONE');
  const [logs, setLogs] = useState<string[]>([]);
  const [deployedFileId, setDeployedFileId] = useState<number>(-1);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    setLogs([]);
    setProjectStatus('NONE');
    if (!eventSourceRef.current) {
      const eventSource = new EventSource(
        `https://shooot.co.kr/api/sse/project/${project}/connection`,
        { withCredentials: true },
      );

      eventSourceRef.current = eventSource;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          console.log('Received data:', parsedData);
        } catch (e) {
          console.error('Failed to parse data:', e);
        }
      };

      eventSourceRef.current.addEventListener('project_log', (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setProjectStatus('DEPLOY');
          setDeployedFileId(parsedData.projectJarFileId);
          setLogs((prevLogs) => [...prevLogs, parsedData.log]);
          if (onLogReceived) onLogReceived(parsedData.log);
        } catch (e) {
          console.error('Failed to parse project_log event data:', e);
        }
      });

      eventSourceRef.current.addEventListener('project_status', (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          if (parsedData.status) {
            setProjectStatus(parsedData.status);
            if (onStatusReceived) onStatusReceived(parsedData.status);
          }
        } catch (e) {
          console.error(e);
        }
      });
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [onLogReceived, onStatusReceived, project]);

  return {
    projectStatus,
    logs,
    deployedFileId,
    setLogs,
    setProjectStatus,
    eventSourceRef,
  };
};
