import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDomainList,
  addDomain,
  editDomain,
  removeDomain,
  subscribeNotification,
} from '../../apis/domain';
import {
  AddDomainRequest,
  EditDomainRequest,
  RemoveDomainRequest,
  SubscribeNotificationRequest,
  GetDomainListRequest,
} from '../../apis/domain/types';
import { DomainInfo } from '../../components/Domain/Domain.data.types';

// 1. getDomainList: 프로젝트 ID로 도메인 목록 조회
export const useGetDomainList = ({ projectId }: GetDomainListRequest) => {
  return useQuery({
    queryKey: ['domainList'],
    queryFn: () => getDomainList({ projectId }),
  });
};

// 2. addDomain: 도메인 추가
export const useAddDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
  return useMutation({
    mutationFn: (info: EditDomainRequest) => editDomain(info),
    onSuccess: (data, info) => {
      queryClient.setQueryData<DomainInfo[]>(['domainList'], (prevData) => {
        if (!prevData) return [];
        return prevData.map((domain) =>
          domain.domainId === info.domainId ? { ...domain, ...data } : domain,
        );
      });
    },
  });
};

// 4. removeDomain: 도메인 삭제
export const useRemoveDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (info: RemoveDomainRequest) => removeDomain(info),
    onSuccess: (_, info) => {
      queryClient.setQueryData<DomainInfo[]>(['domainList'], (prevData) => {
        if (!prevData) return [];
        return prevData.filter((domain) => domain.domainId !== info.domainId);
      });
    },
  });
};

// 5. subscribeNotification: 알림 구독 취소
export const useSubscribeNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (info: SubscribeNotificationRequest) =>
      subscribeNotification(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domainList'] });
    },
  });
};
