import { useDomainContext } from '../Domain';
import { useGetAPIList } from '../../../reactQueries/api';
import Flexbox from '../../../../../components/Flexbox';
import * as s from './DomainBody.css';
import { Skeleton } from '@mui/material';
import { API } from '../../API/API';
import { APIDetailInfo } from '../../../types/data/API.data';

export const DomainBody = (): JSX.Element => {
  const context = useDomainContext();
  const { isFocused } = context.useIsFocusedHook;
  const domainId = context.domainInfo.domainId;

  const {
    data: apiListData,
    isLoading,
    isError,
  } = useGetAPIList(
    { domainId },
    {
      enabled: isFocused,
      staleTime: Infinity,
    },
  );

  return (
    <div className={s.CollapseContainerRecipe({ isOpen: isFocused })}>
      <Flexbox
        alignItems="center"
        flexDirections="col"
        justifyContents="start"
        style={s.BodyContainerStyle}
      >
        {isLoading && (
          <div style={{ width: '100%' }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={50}
                style={{ marginBottom: '1rem', borderRadius: '0.5rem' }}
              />
            ))}
          </div>
        )}
        {isError && <div>데이터 로드 중 오류가 발생했습니다.</div>}
        {apiListData
          ? apiListData.map((requestDocs: APIDetailInfo['requestDocs']) => (
              <API key={requestDocs.id} requestDocs={requestDocs}>
                <API.Header />
                <API.Body />
              </API>
            ))
          : null}
      </Flexbox>
    </div>
  );
};
