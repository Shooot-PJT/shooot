import { useEffect, useRef } from 'react';
import { useTestDataStore } from '../stores/useTestDataStore';
import { TestSSEData } from '../types';

interface UseProjectSSEProps {
  projectJarFileId: number;
}

export const useTestSSE = ({ projectJarFileId }: UseProjectSSEProps) => {
  const setTestData = useTestDataStore((state) => state.setTestData);
  const { setState } = useTestDataStore();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!eventSourceRef.current) {
      const eventSource = new EventSource(
        `https://shooot.co.kr/api/sse/projects/jarFile/${projectJarFileId}/connection`,
        { withCredentials: true },
      );

      eventSourceRef.current = eventSource;

      eventSource.addEventListener('test_data', (event) => {
        try {
          const parsedData: TestSSEData = JSON.parse(event.data);

          setTestData((prevData: TestSSEData[]) => [...prevData, parsedData]);
        } catch (e) {
          console.error('Failed to parse project_log event data:', e);
        }
      });

      eventSource.addEventListener('test_state', (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setState(parsedData.state);
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
  }, [projectJarFileId, setState, setTestData]);

  return {
    eventSourceRef,
    testData: useTestDataStore((state) => state.testData),
  };
};
