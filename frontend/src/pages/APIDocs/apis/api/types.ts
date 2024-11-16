import { APIDetailInfo, Manager } from '../../types/data/API.data';
import { DomainInfo } from '../../types/data/Domain.data';

// API 등록
export interface AddAPIRequest {
  domainId: DomainInfo['domainId'];
}

export interface AddAPIRequestBody {
  managerId: Manager['id'];
  title: APIDetailInfo['requestDocs']['title'];
  description: APIDetailInfo['requestDocs']['description'];
  url: APIDetailInfo['requestDocs']['url'];
}

export type AddAPIResponse = Omit<
  APIDetailInfo['requestDocs'],
  'example_url' | 'example_content'
>;

// API 리스트 조회
export interface GetAPIListRequest {
  domainId: DomainInfo['domainId'];
}
// API 리스트 조회 결과
export type GetAPIListResponse = APIDetailInfo['requestDocs'][];

// API 상세 조회
export interface GetAPIDetailRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}

export type GetAPIDetailResponse = APIDetailInfo;

// API 수정
export interface EditAPIRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}

export interface EditAPIRequestBody {
  managerId?: APIDetailInfo['requestDocs']['managerId'];
  title?: APIDetailInfo['requestDocs']['title'];
  description?: APIDetailInfo['requestDocs']['description'];
  url?: APIDetailInfo['requestDocs']['url'];
  method?: APIDetailInfo['requestDocs']['method'];
  exampleUrl?: APIDetailInfo['requestDocs']['example_url'];
  exampleContent?: APIDetailInfo['requestDocs']['example_content'];
}

// API TOGGLE 수정
export interface ToggleAPIStateRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}

export interface ToggleAPIStateRequestBody {
  isSecure: APIDetailInfo['requestDocs']['isSecure'];
  isRealServer: APIDetailInfo['requestDocs']['isRealServer'];
}

// API 삭제
export interface RemoveAPIRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}
