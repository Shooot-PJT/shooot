import type { Meta, StoryObj } from '@storybook/react';
import TestResultTail from './TestResultTail';
import darkTheme from '../../../../../../../styles/darkTheme.css';
import { TEST_RESULTS } from '../../../API.data.types';

const meta: Meta<typeof TestResultTail> = {
  title: 'UI/Components/API/Header/TestResultTail',
  component: TestResultTail,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className={darkTheme} style={{ padding: '1rem', height: '4rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    testStatus: {
      description: '마지막 테스트 결과를 나타냅니다.',
      control: 'select',
      options: [TEST_RESULTS.SUCCESS, TEST_RESULTS.FAIL, TEST_RESULTS.YET],
      defaultValue: TEST_RESULTS.YET,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TestResultTail>;

export const Default: Story = {
  args: {
    testStatus: TEST_RESULTS.YET,
  },
};

export const Success: Story = {
  args: {
    testStatus: TEST_RESULTS.SUCCESS,
  },
};

export const Fail: Story = {
  args: {
    testStatus: TEST_RESULTS.FAIL,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', height: '4rem' }}>
      <TestResultTail testStatus={TEST_RESULTS.SUCCESS} />
      <TestResultTail testStatus={TEST_RESULTS.FAIL} />
      <TestResultTail testStatus={TEST_RESULTS.YET} />
    </div>
  ),
};
