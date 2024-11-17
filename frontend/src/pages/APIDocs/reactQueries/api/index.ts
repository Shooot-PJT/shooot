import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addAPI,
  getAPIList,
  getAPIDetail,
  editAPI,
  toggleAPIState,
  removeAPI,
  getParticipantList,
  editAPIExampleContent,
} from '../../apis/api';
import {
  AddAPIRequest,
  AddAPIRequestBody,
  GetAPIListRequest,
  GetAPIDetailRequest,
  EditAPIRequest,
  EditAPIRequestBody,
  ToggleAPIStateRequestBody,
  RemoveAPIRequest,
  GetParticipantListRequest,
  GetParticipantListResponse,
  EditAPIExampleContentRequestBody,
  EditAPIResponse,
} from '../../apis/api/types';
import { APIDetailInfo, RequestDocs } from '../../types/data/API.data';

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
      queryClient.setQueryData<RequestDocs[]>(['apiList'], (prevData) => {
        if (!prevData) return [];
        return prevData.map((api) =>
          api.id === variables.apiId ? { ...api, ...updatedData } : api,
        );
      });
      queryClient.invalidateQueries({
        queryKey: ['apiDetail', variables.apiId],
      });
    },
  });
};
// 4-1. API example_content, example_url 수정
export const useEditAPIExampleContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      apiId: EditAPIRequest['apiId'];
      body: EditAPIExampleContentRequestBody;
    }) => editAPIExampleContent({ apiId: data.apiId }, data.body),
    onSuccess: (updatedData: EditAPIResponse, variables) => {
      queryClient.setQueryData<APIDetailInfo['requestDocs']>(
        ['apiDetail', variables.apiId],
        (prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            example_content: updatedData.example_content,
            example_url: updatedData.example_url,
          };
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
      apiId: number;
      body: ToggleAPIStateRequestBody;
      domainId: number;
    }) => toggleAPIState({ apiId: data.apiId }, data.body),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<RequestDocs[]>(
        ['apiList', variables.domainId],
        (oldData) => {
          if (!oldData) return [];
          return oldData.map((api) => {
            if (api.id === variables.apiId) {
              return {
                ...api,
                ...variables.body,
              };
            }
            return api;
          });
        },
      );

      queryClient.setQueryData<APIDetailInfo>(
        ['apiDetail', variables.apiId],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            requestDocs: {
              ...oldData.requestDocs,
              ...variables.body,
            },
          };
        },
      );
    },
  });
};

// 6. API 삭제
export const useRemoveAPI = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemoveAPIRequest) => removeAPI(data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<RequestDocs[]>(['apiList'], (prevData) => {
        if (!prevData) return [];
        return prevData.filter((api) => api.id !== variables.apiId);
      });
      queryClient.invalidateQueries({
        queryKey: ['apiList'],
      });
    },
  });
};

export const useGetParticipantList = (
  { projectId }: GetParticipantListRequest,
  options = {},
) => {
  return useQuery<GetParticipantListResponse>({
    queryKey: ['participantList', projectId],
    queryFn: () => getParticipantList({ projectId }),
    ...options,
  });
};
