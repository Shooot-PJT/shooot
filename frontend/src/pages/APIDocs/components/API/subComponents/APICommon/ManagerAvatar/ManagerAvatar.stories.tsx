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
    manager: {
      description: '담당자 기본정보 객체 (id, nickname)',
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
    rounded: 99,
    size: 1.2,
  },
};

export const AssignedManager: Story = {
  args: {
    rounded: 99,
    size: 1.5,
  },
};

export const CustomSize: Story = {
  args: {
    rounded: 50,
    size: 2,
  },
};

export const CustomRounded: Story = {
  args: {
    rounded: 10,
    size: 1.2,
  },
};
