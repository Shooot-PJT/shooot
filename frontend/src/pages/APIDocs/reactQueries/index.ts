// import { useQuery, UseQueryOptions } from '@tanstack/react-query';
// import { getTestCaseDetail } from '../apis';
// import {
//   GetTestCaseDetailRequest,
//   GetTestCaseDetailResponse,
// } from '../apis/testcase/types';

// export const useGetTestCaseDetail = (
//   { testcaseId }: GetTestCaseDetailRequest,
//   options?: UseQueryOptions<GetTestCaseDetailResponse, Error>,
// ) => {
//   return useQuery<GetTestCaseDetailResponse, Error>({
//     queryKey: ['testCaseDetail', testcaseId],
//     queryFn: () => getTestCaseDetail({ testcaseId }),
//     ...options,
//   });
// };
