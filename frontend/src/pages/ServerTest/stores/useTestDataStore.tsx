import { create } from 'zustand';
import { TestSSEData, TestStatus } from '../types';

type TestDataStoreState = {
  state: TestStatus;
  setState: (state: TestStatus) => void;
  testData: TestSSEData[];
  setTestData: (
    data:
      | TestSSEData
      | TestSSEData[]
      | ((prevState: TestSSEData[]) => TestSSEData[]),
  ) => void;
};

export const initialTestData = {
  avg: {
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  },
  max: {
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  },
  min: {
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  },
  curr: {
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  },
  method: undefined,
  url: undefined,
};

export const useTestDataStore = create<TestDataStoreState>()((set) => ({
  state: 'none',
  setState: (state) => set(() => ({ state })),
  testData: [initialTestData, initialTestData],
  setTestData: (data) =>
    set((state) => {
      if (typeof data === 'function') {
        return { testData: data(state.testData) };
      }
      return {
        testData: Array.isArray(data)
          ? [...state.testData, ...data]
          : [...state.testData, data],
      };
    }),
}));
