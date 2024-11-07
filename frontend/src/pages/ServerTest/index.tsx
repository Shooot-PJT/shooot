import { useQuery } from '@tanstack/react-query';
import { useNavBarStore } from '../../stores/navbarStore';
import { Console } from './components/Console/Console';
import { ProjectTable } from './components/ProjectTable/ProjectTable';
import { getJarFiles } from './apis';
import { convertDataTable, convertJarFileIdList } from './utils';
import { useState } from 'react';
import Typography from '../../components/Typography';

const consoleData = [
  '[INFO] 10:00:01 - 서버가 시작되었습니다.',
  '[INFO] 10:01:15 - 데이터베이스 연결 성공',
  '[WARN] 10:02:05 - 메모리 사용량이 80%를 초과했습니다.',
  '[ERROR] 10:02:45 - 사용자 인증 실패: 유효하지 않은 토큰',
  '[DEBUG] 10:03:12 - API 요청 수락: /api/user/info',
  '[INFO] 10:04:01 - 새로운 사용자가 등록되었습니다.',
  '[INFO] 10:05:30 - 데이터베이스 연결 재확립 성공',
  '[DEBUG] 10:06:11 - 데이터 캐싱 시작',
  '[INFO] 10:07:23 - 백업 프로세스 시작',
  '[ERROR] 10:08:45 - 네트워크 연결 끊김',
  '[INFO] 10:09:57 - 네트워크 연결 재확립',
  '[WARN] 10:10:13 - 응답 시간 지연 감지 (500ms)',
  '[INFO] 10:11:05 - 스케줄러 작업 완료',
  '[DEBUG] 10:12:34 - 사용자 정보 업데이트 완료',
  '[INFO] 10:13:12 - 로그 파일 회전 완료',
  '[INFO] 10:14:07 - 자동 백업 성공',
  '[ERROR] 10:15:23 - 파일 저장 실패: 권한 오류',
  '[WARN] 10:16:45 - 디스크 공간 부족 경고',
  '[INFO] 10:17:32 - 시스템 업데이트 완료',
  '[DEBUG] 10:18:09 - 세션 갱신 시도',
  '[INFO] 10:19:40 - 시스템 로그 초기화',
  '[ERROR] 10:20:15 - 알 수 없는 오류 발생',
  '[INFO] 10:21:50 - 서버가 정상적으로 종료되었습니다.',
  '[INFO] 10:22:30 - 백업 완료: 모든 데이터 저장됨',
  '[INFO] 10:23:10 - 서비스 점검 모드 활성화',
  '[INFO] 10:00:01 - 서버가 시작되었습니다.',
  '[INFO] 10:01:15 - 데이터베이스 연결 성공',
  '[WARN] 10:02:05 - 메모리 사용량이 80%를 초과했습니다.',
  '[ERROR] 10:02:45 - 사용자 인증 실패: 유효하지 않은 토큰',
  '[DEBUG] 10:03:12 - API 요청 수락: /api/user/info',
  '[INFO] 10:04:01 - 새로운 사용자가 등록되었습니다.',
  '[INFO] 10:05:30 - 데이터베이스 연결 재확립 성공',
  '[DEBUG] 10:06:11 - 데이터 캐싱 시작',
  '[INFO] 10:07:23 - 백업 프로세스 시작',
  '[ERROR] 10:08:45 - 네트워크 연결 끊김',
  '[INFO] 10:09:57 - 네트워크 연결 재확립',
  '[WARN] 10:10:13 - 응답 시간 지연 감지 (500ms)',
  '[INFO] 10:11:05 - 스케줄러 작업 완료',
  '[DEBUG] 10:12:34 - 사용자 정보 업데이트 완료',
  '[INFO] 10:13:12 - 로그 파일 회전 완료',
  '[INFO] 10:14:07 - 자동 백업 성공',
  '[ERROR] 10:15:23 - 파일 저장 실패: 권한 오류',
  '[WARN] 10:16:45 - 디스크 공간 부족 경고',
  '[INFO] 10:17:32 - 시스템 업데이트 완료',
  '[DEBUG] 10:18:09 - 세션 갱신 시도',
  '[INFO] 10:19:40 - 시스템 로그 초기화',
  '[ERROR] 10:20:15 - 알 수 없는 오류 발생',
  '[INFO] 10:21:50 - 서버가 정상적으로 종료되었습니다.',
  '[INFO] 10:22:30 - 백업 완료: 모든 데이터 저장됨',
  '[INFO] 10:23:10 - 서비스 점검 모드 활성화',
];

export const ServerTest = () => {
  const [renderKey, setRenderKey] = useState<number>(0);
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
  });

  return (
    <div
      style={{
        display: 'grid',
        gridAutoRows: '1fr 1fr',
        width: '100%',
        gap: '2rem',
        marginTop: '1rem',
      }}
    >
      <div style={{ gridRow: '1/2', width: '100%', marginLeft: '1rem' }}>
        <ProjectTable
          tableData={convertDataTable(jarFiles)}
          idList={convertJarFileIdList(jarFiles)}
          handleRender={handleRender}
        />
      </div>
      <div
        style={{
          gridRow: '1/2',
          marginTop: '0.5rem',
          marginRight: '1rem',
        }}
      >
        <Console data={consoleData} />
      </div>
    </div>
  );
};
