import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TestResultTail from './TestResultTail';
import darkTheme from '../../../../../../../styles/darkTheme.css';

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
    lastTestResult: {
      description: '마지막 테스트 결과를 나타냅니다.',
      control: 'select',
      options: ['success', 'fail', 'yet'],
      defaultValue: 'yet',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TestResultTail>;

export const Default: Story = {
  args: {
    lastTestResult: 'yet',
  },
};

export const Success: Story = {
  args: {
    lastTestResult: 'success',
  },
};

export const Fail: Story = {
  args: {
    lastTestResult: 'fail',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', height: '4rem' }}>
      <TestResultTail lastTestResult="success" />
      <TestResultTail lastTestResult="fail" />
      <TestResultTail lastTestResult="yet" />
    </div>
  ),
};
