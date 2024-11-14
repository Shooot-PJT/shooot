// frontend/src/pages/APIDocs/components/API/subComponents/APIBody/index.tsx

import { useAPIContext } from '../../API';
import Flexbox from '../../../../../../components/Flexbox';
import colorPalette from '../../../../../../styles/colorPalette';
import * as s from './index.css';
import { RequestDocs } from './RequestDocs/RequestDocs';
import { Skeleton } from '@mui/material';
import ManagerAvatar from '../APICommon/ManagerAvatar/ManagerAvatar';
import Typography from '../../../../../../components/Typography';
import Button from '../../../../../../components/Button';
import { useGetAPIDetail } from '../../../../reactQueries/api';
import { DummyTestCase } from '../../../../dummies/DummyTestCase';
import { useAPI } from '../../../../hooks/useAPI'; // 수정된 부분

export const Body = () => {
  const context = useAPIContext();
  const { isFocused } = context.useIsFocusedHook;
  const apiId = context.headerInfo.id;

  const { editAPIModalHandler } = useAPI(); // 수정된 부분

  const {
    data: apiDetailData,
    isLoading,
    isError,
  } = useGetAPIDetail({ apiId }, { enabled: isFocused });

  if (isLoading) {
    return (
      <div style={{ width: '100%' }}>
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={200}
            style={{ marginBottom: '1rem', borderRadius: '0.5rem' }}
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <>데이터 로드 중 오류가 발생했습니다.</>;
  }

  if (!apiDetailData) {
    return <></>;
  }

  const { requestDocs, testCases } = apiDetailData;
  const method = requestDocs.method || 'method';
  const fontColor = method === 'method' ? 'light' : method;

  return (
    <div className={s.CollapseContainerRecipe({ isOpen: isFocused })}>
      <Flexbox flexDirections="col" style={s.apiBodyContainerStyle}>
        {/* 1. TOP 컨테이너 */}
        <Flexbox flexDirections="row" style={s.apiBodyTopContainerStyle}>
          {/* 1.1 LEFT: API 기본정보 섹션 */}
          <Flexbox justifyContents="between" flexDirections="col">
            {/* 1.1.1 TOP : API 기본정보 박스*/}
            <Flexbox
              flexDirections="col"
              style={{
                gap: '4rem',
                paddingBottom: '1.5rem',
              }}
            >
              <Flexbox
                flexDirections="col"
                style={{
                  textAlign: 'left',
                  width: '12rem',
                }}
              >
                <Typography color={'light'} size={2.5} weight="700">
                  {method ? method.toUpperCase() : 'METHOD'}
                </Typography>
                <Typography
                  color={fontColor}
                  size={0.85}
                  weight="600"
                  style={{
                    marginBottom: '2rem',
                    whiteSpace: 'wrap',
                    wordBreak: 'keep-all',
                  }}
                >
                  {requestDocs.title}
                </Typography>

                <Typography
                  color="disabled"
                  size={0.85}
                  weight="400"
                  style={{
                    whiteSpace: 'wrap',
                    wordBreak: 'keep-all',
                  }}
                >
                  {requestDocs.description}
                </Typography>
              </Flexbox>
              <Flexbox flexDirections="col" style={{ gap: '1rem' }}>
                <div
                  className={s.leftDividerRecipe({
                    method: method,
                  })}
                />
                <Typography
                  weight="600"
                  style={{
                    textAlign: 'left',
                  }}
                >
                  담당자
                </Typography>

                <ManagerAvatar
                  manager={{
                    id: requestDocs.managerId,
                    nickname: requestDocs.managerName,
                  }}
                  size={1.5}
                  withLabel
                />
              </Flexbox>
            </Flexbox>

            {/* 1.1.2 BOTTOM : 편집,삭제 버튼 그룹*/}
            <Flexbox
              flexDirections="row"
              justifyContents="start"
              style={{
                gap: '1rem',
              }}
            >
              <Button
                color="grey"
                rounded={0.3}
                onClick={() => editAPIModalHandler(requestDocs)} // 수정된 부분
              >
                편집
              </Button>
              <Button color="grey" rounded={0.3}>
                삭제
              </Button>
            </Flexbox>
          </Flexbox>
          {/* 1.2 RIGHT: API 요청 정의서 & 테스트케이스 리스트 섹션 */}
          <Flexbox
            style={{
              flexGrow: 1,
            }}
          >
            <Flexbox
              flexDirections="col"
              style={{ gap: '3rem', width: '100%' }}
            >
              {/* 1.2.1 RIGHT-TOP: API 요청 정의서 */}
              <RequestDocs requestDocs={requestDocs || null} />

              {/* HORIZONTAL DIVIDER */}
              <div
                style={{
                  width: '100%',
                  height: '0.25rem',
                  backgroundColor: colorPalette.util['300'],
                  borderRadius: '999rem',
                  margin: '2rem 0rem',
                }}
              />

              {/* 1.2.2 RIGHT-BOTTOM: 테스트케이스 리스트 섹션 */}
              {testCases && testCases.length > 0 ? (
                testCases.map((testCase) => (
                  <DummyTestCase key={testCase.id} testCaseId={testCase.id} />
                ))
              ) : (
                <div>테스트케이스가 없습니다.</div>
              )}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </div>
  );
};
