import { useEffect, useRef } from 'react';

interface UseProjectSSEProps {
  projectJarFileId: number;
  onLogReceived?: (log: string) => void;
  onStatusReceived?: (status: string) => void;
}

export const useTestSSE = ({
  projectJarFileId,
  onLogReceived,
  onStatusReceived,
}: UseProjectSSEProps) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!eventSourceRef.current) {
      console.log('커넥션 연결');
      const eventSource = new EventSource(
        `https://shooot.co.kr/api/sse/projects/jarFile/${projectJarFileId}/connection`,
        { withCredentials: true },
      );

      eventSourceRef.current = eventSource;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.addEventListener('project_log', (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          if (onLogReceived) onLogReceived(parsedData.log);
        } catch (e) {
          console.error('Failed to parse project_log event data:', e);
        }
      });

      eventSourceRef.current.addEventListener('project_status', (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          if (parsedData.status) {
            if (onStatusReceived) onStatusReceived(parsedData.status);
          }
        } catch (e) {
          console.error(e);
        }
      });
    }

    return () => {
      if (eventSourceRef.current) {
        console.log('커넥션 종료');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [onLogReceived, onStatusReceived, projectJarFileId]);

  return {
    eventSourceRef,
  };
};
