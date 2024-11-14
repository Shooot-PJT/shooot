// frontend/src/pages/APIDocs/reactQueries/api/index.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addAPI,
  getAPIList,
  getAPIDetail,
  editAPI,
  toggleAPIState,
  removeAPI,
} from '../../apis/api';
import {
  AddAPIRequest,
  AddAPIRequestBody,
  GetAPIListRequest,
  GetAPIDetailRequest,
  EditAPIRequest,
  EditAPIRequestBody,
  ToggleAPIStateRequest,
  ToggleAPIStateRequestBody,
  RemoveAPIRequest,
} from '../../apis/api/types';
import { APIRequestDocsInfo } from '../../types/data/API.data';

// 1. API 목록 조회
export const useGetAPIList = (
  { domainId }: GetAPIListRequest,
  options = {},
) => {
  return useQuery({
    queryKey: ['apiList', domainId],
    queryFn: () => getAPIList({ domainId }),
    ...options,
  });
};

// 2. API 추가
export const useAddAPI = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      domainId: AddAPIRequest['domainId'];
      body: AddAPIRequestBody;
    }) => addAPI({ domainId: data.domainId }, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiList'] });
    },
  });
};

// 3. API 상세 조회
export const useGetAPIDetail = (
  { apiId }: GetAPIDetailRequest,
  options = {},
) => {
  return useQuery({
    queryKey: ['apiDetail', apiId],
    queryFn: () => getAPIDetail({ apiId }),
    ...options,
  });
};

// 4. API 수정
export const useEditAPI = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      apiId: EditAPIRequest['apiId'];
      body: EditAPIRequestBody;
    }) => editAPI({ apiId: data.apiId }, data.body),
    onSuccess: (updatedData, variables) => {
      queryClient.setQueryData<APIRequestDocsInfo[]>(
        ['apiList'],
        (prevData) => {
          if (!prevData) return [];
          return prevData.map((api) =>
            api.id === variables.apiId ? { ...api, ...updatedData } : api,
          );
        },
      );
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });
    },
  });
};

// 5. API 상태 토글
export const useToggleAPIState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      apiId: ToggleAPIStateRequest['apiId'];
      body: ToggleAPIStateRequestBody;
    }) => toggleAPIState({ apiId: data.apiId }, data.body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });
    },
  });
};

// 6. API 삭제
export const useRemoveAPI = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemoveAPIRequest) => removeAPI(data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<APIRequestDocsInfo[]>(
        ['apiList'],
        (prevData) => {
          if (!prevData) return [];
          return prevData.filter((api) => api.id !== variables.apiId);
        },
      );
      queryClient.invalidateQueries({
        queryKey: ['apiList'],
      });
    },
  });
};
