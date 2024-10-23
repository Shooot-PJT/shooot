import type { Meta, StoryObj } from '@storybook/react';
import { CollapseIcon } from './CollapseIcon';
import darkTheme from '../../../../../../../styles/darkTheme.css';

const meta: Meta<typeof CollapseIcon> = {
  title: 'UI/Components/API/Common/CollapseIcon',
  component: CollapseIcon,
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
    isOpen: {
      description: '아이콘이 열림 상태인지 여부를 나타냅니다.',
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof CollapseIcon>;

export const Default: Story = {
  args: {
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
