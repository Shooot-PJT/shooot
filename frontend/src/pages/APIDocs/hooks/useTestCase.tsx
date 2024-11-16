// frontend/src/pages/APIDocs/hooks/useTestCase.tsx

import { useAddTestCase, useRemoveTestCase } from '../reactQueries/testcase';
import { AddTestCaseRequestBody } from '../apis/testcase/types';

export const useTestCase = () => {
  const addTestCaseMutation = useAddTestCase();
  const removeTestCaseMutation = useRemoveTestCase();

  const addTestCaseHandler = (
    apiId: number,
    testCaseData: AddTestCaseRequestBody,
  ) => {
    // testCaseData는 AddTestCaseRequestBody 타입을 준수해야 합니다.
    addTestCaseMutation.mutate({ apiId, ...testCaseData });
  };

  const removeTestCaseHandler = (apiId: number, testcaseId: number) => {
    removeTestCaseMutation.mutate({ apiId, testcaseId });
  };

  return {
    addTestCase: addTestCaseHandler,
    removeTestCase: removeTestCaseHandler,
    isAdding: addTestCaseMutation.isPending, // React Query v5에 맞게 수정
    addError: addTestCaseMutation.error,
    isRemoving: removeTestCaseMutation.isPending, // React Query v5에 맞게 수정
    removeError: removeTestCaseMutation.error,
  };
};
