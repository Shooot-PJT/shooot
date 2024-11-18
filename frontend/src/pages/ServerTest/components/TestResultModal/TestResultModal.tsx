import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import useModal from '../../../../hooks/useModal';
import { getTestRecordDetail } from '../../apis/TestApi';
import {
  convertTestRecordDetailSelectBox,
  convertTestRecordDetailTable,
} from '../../utils';
import { DataTable } from '../DataTable/DataTable';
import { Header } from './Header';
import { GetTestRecordDetailResponse } from '../../types';

interface TestResultModalProps {
  id: number;
}

export const TestResultModal = ({ id }: TestResultModalProps) => {
  const modal = useModal();
  const headers = ['데이터 이름', '평균 값', '최고값', '최저값'];
  const [selectedNum, setSelectedNum] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const totalTimeRef = useRef<number>(0);

  const { data: testRecordsDetail = [], isPending } = useQuery({
    queryKey: ['testDetailRecords', id],
    queryFn: async () => {
      const response = await getTestRecordDetail({ stressTestLogId: id });
      return response?.data ?? [];
    },
  });

  useEffect(() => {
    if (!isPending) {
      testRecordsDetail.forEach((item: GetTestRecordDetailResponse) => {
        totalTimeRef.current += item.duration;
      });
      setTotalTime(totalTimeRef.current);
    }
  }, [isPending]);

  const handleSelectedNum = (num: number) => {
    setSelectedNum(num);
  };

  return (
    <>
      {!isPending && (
        <Header
          Items={
            isPending ? [] : convertTestRecordDetailSelectBox(testRecordsDetail)
          }
          selectedNum={selectedNum}
          handleSelectedNum={handleSelectedNum}
          selectedApi={testRecordsDetail[selectedNum]}
          totalTime={totalTime}
        />
      )}
      <DataTable
        data={
          isPending
            ? []
            : convertTestRecordDetailTable(testRecordsDetail, selectedNum)
        }
        colWidths={[40, 20, 20, 20]}
        headers={headers}
      />

      <Flexbox justifyContents="end" style={{ marginTop: '1rem' }}>
        <Button
          color="delete"
          paddingX={2}
          paddingY={0.5}
          onClick={() => {
            modal.pop();
          }}
        >
          닫기
        </Button>
      </Flexbox>
    </>
  );
};
