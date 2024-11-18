// frontend/src/pages/APIDocs/reactQueries/domain/index.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDomainList,
  addDomain,
  editDomain,
  removeDomain,
  subscribeNotification,
  unSubscribeNotification,
} from '../../apis/domain';
import {
  AddDomainRequest,
  EditDomainRequest,
  RemoveDomainRequest,
  SubscribeNotificationRequest,
  GetDomainListRequest,
  AddDomainResponse,
  EditDomainResponse,
} from '../../apis/domain/types';
import { DomainInfo } from '../../types/data/Domain.data';

// 1. getDomainList: 프로젝트 ID로 도메인 목록 조회
export const useGetDomainList = ({ projectId }: GetDomainListRequest) => {
  return useQuery<DomainInfo[], Error>({
    queryKey: ['domainList', projectId],
    queryFn: () => getDomainList({ projectId }),
    staleTime: 5 * 60 * 1000,
  });
};

// 2. addDomain: 도메인 추가
export const useAddDomain = () => {
  const queryClient = useQueryClient();
  return useMutation<AddDomainResponse, Error, AddDomainRequest, unknown>({
    mutationFn: (info: AddDomainRequest) => addDomain(info),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['domainList'],
      });
    },
  });
};

// 3. editDomain: 도메인 수정
export const useEditDomain = () => {
  const queryClient = useQueryClient();
  return useMutation<EditDomainResponse, Error, EditDomainRequest, unknown>({
    mutationFn: (info: EditDomainRequest) => editDomain(info),
    onSuccess: (data, info) => {
      queryClient.setQueryData<DomainInfo[]>(
        ['domainList', info.projectId],
        (prevData) => {
          if (!prevData) return [];
          return prevData.map((domain) =>
            domain.domainId === info.domainId ? { ...domain, ...data } : domain,
          );
        },
      );
    },
  });
};

// 4. removeDomain: 도메인 삭제
export const useRemoveDomain = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, RemoveDomainRequest, unknown>({
    mutationFn: ({ domainId }: RemoveDomainRequest) =>
      removeDomain({ domainId }),
    onSuccess: (_, { domainId }) => {
      queryClient.setQueryData<DomainInfo[]>(['domainList'], (prevData) => {
        if (!prevData) return [];
        return prevData.filter((domain) => domain.domainId !== domainId);
      });
    },
  });
};

// 5. subscribeNotification: 알림 구독
export const useSubscribeNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, SubscribeNotificationRequest, unknown>({
    mutationFn: (info: SubscribeNotificationRequest) =>
      subscribeNotification(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domainList'] });
    },
  });
};

// 6. unSubscribeNotification: 알림 구독 취소
export const useUnSubscribeNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, SubscribeNotificationRequest, unknown>({
    mutationFn: (info: SubscribeNotificationRequest) =>
      unSubscribeNotification(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domainList'] });
    },
  });
};
