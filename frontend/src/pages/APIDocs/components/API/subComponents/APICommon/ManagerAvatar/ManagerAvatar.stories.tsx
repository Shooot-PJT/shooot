import type { Meta, StoryObj } from '@storybook/react';
import ManagerAvatar from './ManagerAvatar';
import darkTheme from '../../../../../../../styles/darkTheme.css';

const meta: Meta<typeof ManagerAvatar> = {
  title: 'UI/Components/API/Common/ManagerAvatar',
  component: ManagerAvatar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className={darkTheme} style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: '담당자 ID, 값이 없으면 담당자 미정으로 표시',
      control: 'number',
    },
    nickname: {
      description: '담당자의 닉네임',
      control: 'text',
    },
    rounded: {
      description: '아바타의 테두리 둥글기 (rem 단위)',
      control: 'number',
      defaultValue: 99,
    },
    size: {
      description: '아바타 크기 (rem 단위)',
      control: 'number',
      defaultValue: 1.2,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ManagerAvatar>;

export const Default: Story = {
  args: {
    id: undefined,
    nickname: '담당자 미정',
    rounded: 99,
    size: 1.2,
  },
};

export const AssignedManager: Story = {
  args: {
    id: 1,
    nickname: '김현진',
    rounded: 99,
    size: 1.5,
  },
};

export const CustomSize: Story = {
  args: {
    id: 2,
    nickname: '박민수',
    rounded: 50,
    size: 2,
  },
};

export const CustomRounded: Story = {
  args: {
    id: 3,
    nickname: '이서현',
    rounded: 10,
    size: 1.2,
  },
};
