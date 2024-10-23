import { TEST_RESULTS } from '../components/API/API.types';
import { METHODS } from '../types/methods';

export const DUMMY_API_HEADER_INFO_LIST = [
  {
    title: '특별한 계란 목록 가져오기',
    method: METHODS.get,
    needAuthorize: false,
    manager: { id: 1, nickname: '김현진' },
    endPoint: '/api/eggs/special',
    lastTestResult: TEST_RESULTS.success,
  },
  {
    title: '사용자 정보 업데이트',
    method: METHODS.post,
    needAuthorize: true,
    manager: { id: 2, nickname: '김현진' },
    endPoint: '/api/users/update',
    lastTestResult: TEST_RESULTS.fail,
  },
  {
    title: '상품 목록 조회',
    method: METHODS.get,
    needAuthorize: false,
    manager: { id: 3, nickname: '장철현' },
    endPoint: '/api/products/list',
    lastTestResult: TEST_RESULTS.yet,
  },
  {
    title: '회원 탈퇴 처리',
    method: METHODS.delete,
    needAuthorize: true,
    manager: { id: 3, nickname: '장철현' },
    endPoint: '/api/users/delete',
    lastTestResult: TEST_RESULTS.success,
  },
  {
    title: '주문 상태 변경',
    method: METHODS.put,
    needAuthorize: true,
    manager: { id: 4, nickname: '박민희' },
    endPoint: '/api/orders/status',
    lastTestResult: TEST_RESULTS.yet,
  },
  {
    title: '주문 상태 갱신',
    method: METHODS.patch,
    needAuthorize: true,
    manager: { id: 4, nickname: '박민희' },
    endPoint: '/api/orders/status/update',
    lastTestResult: TEST_RESULTS.yet,
  },
  {
    title: '로그인 세션 검증',
    method: METHODS.get,
    needAuthorize: true,
    manager: { id: 3, nickname: '장철현' },
    endPoint: '/api/session/validate',
    lastTestResult: TEST_RESULTS.fail,
  },
];
