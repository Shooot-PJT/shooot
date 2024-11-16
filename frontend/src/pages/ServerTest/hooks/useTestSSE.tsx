import { useEffect, useRef, useState } from 'react';
import { TestSSEData } from '../types';

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
  const [testData, setTestData] = useState<TestSSEData[]>([
    {
      cpuUtilization: 0.0,
      ramUtilization: 0.0,
    },
    {
      cpuUtilization: 0.0,
      ramUtilization: 0.0,
    },
  ]);
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

    eventSourceRef.current.addEventListener('test_data', (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setTestData((prev) => {
          const updatedData = [
            ...prev,
            {
              cpuUtilization: parsedData.cpuUtilization,
              ramUtilization: parsedData.ramUtilization / 1000000000,
            },
          ];
          return updatedData;
        });
      } catch (e) {
        console.error('Failed to parse project_log event data:', e);
      }
    });

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
    testData,
  };
};
