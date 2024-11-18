import { HiXMark } from 'react-icons/hi2';
import Flexbox from '../../../../../../../components/Flexbox';
import Icon from '../../../../../../../components/Icon';
import Typography from '../../../../../../../components/Typography';
import useModal from '../../../../../../../hooks/useModal';
import { useApiTestLogInfiniteQuery } from '../../../../../reactQueries/apitests';
import React, { useEffect, useRef } from 'react';
import { TestLogModalItem } from './TestLogModalItem';
import { TestLogModalFailBox } from './TestLogModalFailBox';

interface TestLogModalProps {
  apiId: number;
}

export const TestLogModal = ({ apiId }: TestLogModalProps) => {
  const modal = useModal();
  const { logs, isLoading, hasNextPage, fetchNextPage } =
    useApiTestLogInfiniteQuery(apiId);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <Flexbox
      flexDirections="col"
      style={{ rowGap: '1rem', width: '50rem', height: '50rem' }}
    >
      {/* 타이틀 */}
      <Flexbox
        alignItems="center"
        justifyContents="between"
        style={{ width: '100%' }}
      >
        <Typography weight="700" size={1.5}>
          API 테스트 로그
        </Typography>
        <Icon
          background="none"
          color="light"
          size={1.25}
          onClick={() => modal.pop()}
        >
          <HiXMark />
        </Icon>
      </Flexbox>
      {/* 로그들 */}
      <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '2rem' }}>
        {logs?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((item) => (
              <Flexbox
                key={item.id}
                flexDirections="col"
                style={{ width: '100%', rowGap: '0.5rem' }}
              >
                <TestLogModalItem log={item} />
                <TestLogModalFailBox
                  responseCode={item.responseCode}
                  responseMessage={item.responseMessage}
                />
              </Flexbox>
            ))}
          </React.Fragment>
        ))}
        <div ref={loadMoreRef} />
        {isLoading && <Typography>불러오는 중...</Typography>}
      </Flexbox>
    </Flexbox>
  );
};
