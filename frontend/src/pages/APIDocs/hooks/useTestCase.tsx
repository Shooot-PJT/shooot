import { useAddTestCase, useRemoveTestCase } from '../reactQueries/testcase';

export const useTestCase = () => {
  const addTestCaseMutation = useAddTestCase();
  const removeTestCaseMutation = useRemoveTestCase();

  const removeTestCaseHandler = (apiId: number, testcaseId: number) => {
    removeTestCaseMutation.mutate({ apiId, testcaseId });
  };

  return {
    removeTestCase: removeTestCaseHandler,
    isAdding: addTestCaseMutation.isPending,
    addError: addTestCaseMutation.error,
    isRemoving: removeTestCaseMutation.isPending,
    removeError: removeTestCaseMutation.error,
  };
};
