import { ReactNode } from 'react';
import { Methods } from '../../types/methods';
import { APIBasicInfo, EndPoint } from './API.types';
import Flexbox from '../../../../components/Flexbox';
import colorPalette from '../../../../styles/colorPalette';

interface APIProps {
  children: ReactNode;
}

interface APIHeaderProps {
  // API_BASIC_INFO
  title: APIBasicInfo['title'];
  managerName?: APIBasicInfo['managerName'];
  // API_ADDITIONAL_INFO
  method?: Methods;
  needAuthorize?: boolean;
  endPoint?: EndPoint;
}

export const API = ({ children }: APIProps) => {
  return (
    <div
      className="api-root"
      style={{
        width: '100%',
        height: '4rem',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: colorPalette.deepOrange[900],
      }}
    >
      {children}
    </div>
  );
};

API.Header = function Header({
  title,
  managerName,
  method,
  needAuthorize,
  endPoint,
}: APIHeaderProps) {
  // const header = useAPIStore((state) => state.header);

  return (
    <>
      <Flexbox
        bg={300} // zustand에  body Open여부에 따라 색상 300 -> 100으로 전환되도록 추후 확장
        borderRadius="0.5rem"
        alignItems="center"
        flexDirection="row"
        justifyContent="between"
        columnGap="1.5rem"
      >
        {/* [ 1 ] 메서드 헤더 */}
        <div>{method}</div>
        {/* [ 2 ] 중앙 컨텐츠 : ( needAuthorize, endPoint, title, managerName )*/}
        <div>
          {/* ( 2-left ) */}
          <div>
            {/* needAuthorize */}
            {/* endPoint */}
            {/* realServer토글버튼 - 상태 추가 필요 */}
          </div>
          {/* ( 2-center ) */}
          <div>{title}</div>
          {/* ( 2-right ) */}
          <div>
            {/* 테스트 버튼 (활성/비활성) */}
            {/* 테스트 버튼 ( collapse 상태 아이콘 ) */}
          </div>
        </div>
        {/* [ 3 ] 마지막 테스트 결과 테일 */}
        <div></div>
      </Flexbox>
    </>
  );
};

API.Body = function Body() {
  // const header = useAPIStore((state) => state.header);

  return (
    <div
    // onClick={ } // body open 제어 ( collapse처럼 )
    ></div>
  );
};
