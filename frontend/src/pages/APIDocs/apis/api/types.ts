import {
  APIDetailInfo,
  APIRequestDocsInfo,
  Manager,
} from '../../components/API/API.data.types';
import { DomainInfo } from '../../components/Domain/Domain.data.types';

// API 등록
export interface AddAPIRequest {
  domainId: DomainInfo['domainId'];
}

export interface AddAPIRequestBody {
  managerId: Manager['id'];
  title: APIRequestDocsInfo['title'];
  description: APIRequestDocsInfo['description'];
  url: APIRequestDocsInfo['url'];
}

export type AddAPIResponse = Omit<
  APIRequestDocsInfo,
  'example_url' | 'example_content'
>;

// API 리스트 조회
export interface GetAPIListRequest {
  domainId: DomainInfo['domainId'];
}

export type GetAPIListResponse = Array<APIRequestDocsInfo>;

// API 상세 조회
export interface GetAPIDetailRequest {
  apiId: APIRequestDocsInfo['id'];
}

export type GetAPIDetailResponse = APIDetailInfo;

// API 수정
export interface EditAPIRequest {
  apiId: APIRequestDocsInfo['id'];
}

export interface EditAPIRequestBody {
  managerId?: APIRequestDocsInfo['managerId'];
  title?: APIRequestDocsInfo['title'];
  description?: APIRequestDocsInfo['description'];
  url?: APIRequestDocsInfo['url'];
  method?: APIRequestDocsInfo['method'];
  exampleUrl?: APIRequestDocsInfo['example_url'];
  exampleContent?: APIRequestDocsInfo['example_content'];
}

// API TOGGLE 수정
export interface ToggleAPIStateRequest {
  apiId: APIRequestDocsInfo['id'];
}

export interface ToggleAPIStateRequestBody {
  isSecure: APIRequestDocsInfo['isSecure'];
  isDeveloped: APIRequestDocsInfo['isDeveloped'];
}

// API 삭제
export interface RemoveAPIRequest {
  apiId: APIRequestDocsInfo['id'];
}
